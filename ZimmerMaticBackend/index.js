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

/* //Init MongoDB
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
            //Initialise everything
            leds.workLight();
            Rolladen.rolladenUP();
            //printDB();
        } catch (error) {
            loggererror.fatal("Connection to DB not established")
        }
    }); */

//Bekanntmachen und Laden aller Module
const temp = require("./modules/Temperatur.js");
const time = require("./modules/timeLibrary")
const Rolladen = require("./modules/Rolladen")
const leds = require("./modules/LEDs")
const Ikea = require("./modules/Tradfri")
const IoTbtn = require("./modules/IoTButtonEndpoints")

//App Listen
app.listen(port, () => {
    loggerinfo.info(`App listening at http://ZimmerMatic:${port}`);
});

const mqtt = require('mqtt');  // require mqtt
const client = mqtt.connect({
    host: '192.168.0.138',
    port: 1883,
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
    client.subscribe('ROLLADEN/stateBett')
    client.subscribe('ROLLADEN/stateSchreibtisch')
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
        case "ROLLADEN/stateBett":
            jsonClients.stateBett.state = message.toString();
            break;
        case "ROLLADEN/stateBett":
            jsonClients.stateBett.state = message.toString();
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
    stateBett:{
        state: ""
    },
    stateSchreibtisch: {
        state: ""
    }
}
exports.jsonClients = jsonClients;