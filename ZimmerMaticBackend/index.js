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
//const ledD1 = "::ffff:192.168.0.73";
//const ledD1Sofa = "::ffff:192.168.0.64";
//const ledD1UHR = "::ffff:192.168.0.76";
const ESP32UHR = "::ffff:192.168.0.128";
//const ledD1Schreibtisch = "::ffff:192.168.0.78";
//const ledD1EmelySchr = "::ffff:192.168.0.80";

const MQTTSubs = ["colorCouch", "colorKamin", "colorMarvin", "colorEmely", "colorUhr"];

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
    }/* else if (ip === ledD1) {
        loggerinfo.info("Client Dart (1) Connected with IP: " + ip);
        currentClientsws[1] = ws;
    } else if (ip === ledD1Sofa) {
        loggerinfo.info("Client Couch (2) Connected with IP: " + ip);
        currentClientsws[2] = ws;
    } else if (ip === ledD1UHR) {
        loggerinfo.info("Client WordClock (3) Connected with IP: " + ip);
        currentClientsws[3] = ws;
    } else if (ip === ledD1Schreibtisch) {
        loggerinfo.info("Client Table (4) Connected with IP: " + ip);
        currentClientsws[4] = ws;
    } else if (ip === ledD1EmelySchr) {
        loggerinfo.info("Client TableEmely (5) Connected with IP: " + ip);
        currentClientsws[5] = ws;
    }*/ else if (ip == ESP32UHR) {
        loggerinfo.info("Client Back  To Future (6) Connected with IP: " + ip);
        currentClientsws[6] = ws;
    }
});

const mqtt = require('mqtt');  // require mqtt
client = mqtt.connect({
    host: '192.168.0.138',
    port: 8883,
    username: 'marvin',
    password: '1010'
});

client.on('connect', function () {
    client.subscribe('LED_COLOR/colorCouch');
    client.subscribe('LED_COLOR/colorKamin');
    client.subscribe('LED_COLOR/colorMarvin');
    client.subscribe('LED_COLOR/colorEmely');
    client.subscribe('LED_COLOR/colorUhr');
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