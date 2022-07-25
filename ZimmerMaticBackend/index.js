//Init Express Server
const express = require("express");
const app = express();
exports.app = app;
const port = 3443;

//Init Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.json());

//Init dotenv
const dotenv = require("dotenv");
dotenv.config();

//Init IoT Ws
const WebSocket = require("ws");
const wssLED = new WebSocket.Server({ port: 8000 }); // abgespilteter WS Server auf anderem Port
exports.wssLED = wssLED;
let currentClientsws = [];
exports.currentClientsws = currentClientsws;

//Init Axios
const axios = require('axios').default;
exports.axios = axios;

//Init Cors
let cors = require('cors');
app.options('*', cors())
app.use(cors())

//Init Log4js
const log4js = require("log4js");
log4js.configure({
    appenders: {
        error: { type: "file", filename: "log4zi/error.log" },
        info: { type: "file", filename: "log4zi/info.log" }
    },
    categories: {
        file: { appenders: ["error"], level: "error" },
        default: { appenders: ["info"], level: "trace" }
    }
});
const loggerinfo = log4js.getLogger('info');
const loggererror = log4js.getLogger('error');
exports.loggererror = loggererror;
exports.loggerinfo = loggerinfo;

//Init MongoDB
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = process.env.DB_URL;
MongoClient.connect(uri)
    .then(client => {
        try {
            const db = client.db("TempDaB");
            const tempCollection = db.collection('TempCollection');
            app.locals.temperature = tempCollection;
            loggerinfo.info("Connection to DB established")
            leds.workLight();
            //printDB();
        } catch (error) {
            loggererror.fatal("Connection to DB not established")
        }
    });

//Bekanntmachen und Laden aller Module
const temp = require("./modules/Temperatur.js");
const time = require("./modules/timeLibrary")
const Rolladen = require("./modules/Rolladen")
const leds = require("./modules/LEDs")
const Ikea = require("./modules/Tradfri")
const IoTbtn = require("./modules/IoTButtonEndpoints")

//WS Whitelist
//Allowed Clients for our Websocket connection 
const d1 = "::ffff:192.168.0.129";
const ESP32UHR = "::ffff:192.168.0.128";

//App Listen
app.listen(port, () => {
    loggerinfo.info(`App listening at http://ZimmerMatic:${port}`);
});

//Init Websocket Clients
/***************************************** */
//Handle Whitelist WS Clients
wssLED.on("connection", function connection(ws, req) {
    const ip = req.socket.remoteAddress;
    loggerinfo.info("Incoming Request from IP: " + ip)
    if (ip === d1) {
        loggerinfo.info("Client Rolladen (0) Connected with IP: " + ip);
        currentClientsws[0] = ws;
    }else if (ip == ESP32UHR) {
        loggerinfo.info("Client Back  To Future (6) Connected with IP: " + ip);
        currentClientsws[6] = ws;
    }
});

const mqtt = require('mqtt');  // require mqtt
const client = mqtt.connect({
    host: '192.168.0.138',
    port: 8883,
    username: process.env.MQTT_NAME,
    password: process.env.MQTT_PASS
});
exports.client = client;

client.on('connect', function () {
    client.subscribe('LED_COLOR/colorCouch');
    client.subscribe('LED_COLOR/colorKamin');
    client.subscribe('LED_COLOR/colorMarvin');
    client.subscribe('LED_COLOR/colorEmely');
    client.subscribe('LED_COLOR/colorUhr');
    client.subscribe('LED_COLOR/all');
})

/**
 * Loading the json values with arriving messages at the mqtt broker
 */
 client.on('message', function (topic, message) {
    console.log("Incoming Message " + message.toString())
    switch (topic) {
        case "LED_COLOR/colorCouch":
            jsonClients.colorCouch.value = message.toString();
            break;
        case "LED_COLOR/colorKamin":
            jsonClients.colorKamin.value = message.toString();
            break;
        case "LED_COLOR/colorEmely":
            jsonClients.colorEmely.value = message.toString();
            break;
        case "LED_COLOR/colorMarvin":
            jsonClients.colorMarvin.value = message.toString();
            break;
        case "LED_COLOR/colorUhr":
            jsonClients.colorUhr.value = message.toString();
            break;
        case "LED_COLOR/all":
            jsonClients.colorCouch.value = message.toString();
            jsonClients.colorKamin.value = message.toString();
            jsonClients.colorMarvin.value = message.toString();
            jsonClients.colorEmely.value = message.toString();
            jsonClients.colorUhr.value = message.toString();
            break;
        default:
            break;
    }
})

let jsonClients = {
    colorCouch: {
        value: "",
    },
    colorMarvin: {
        value: "",
    },
    colorEmely: {
        value: "",
    },
    colorUhr: {
        value: "",
    },
    colorKamin: {
        value: "",
    },
}
exports.jsonClients = jsonClients;

function printDB(){
    app.locals.temperature.find({spot: "Schreibtisch", date: time.getDBFormatDate()}).sort({_id: -1}).toArray(function (err, response) {
        console.log(response[0]);
        console.log(response[1]);
    })
}