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

//Import Routes
const authRoute = require('./routes/auth');
const ledRoute = require('./modules/LEDs');
const infoRoute = require('./modules/OS_Infos');
const iot_buttonRoute = require('./modules/IoTButtonEndpoints');
const rolladenRoute = require('./modules/Rolladen');
const tempRoute = require('./modules/Temperatur')
const otaRoute = require('./OTA/OTA')
const cronjobRoute = require('./modules/CronJobs')

//Routes Middleware
app.use('/api/user', authRoute)
app.use('/api/LED', ledRoute.router)
app.use('/api', infoRoute)
app.use('/', iot_buttonRoute)
app.use('/api/Rolladen', rolladenRoute.router)
app.use('/api', tempRoute)
app.use('/api/firmware', otaRoute)
app.use('/api/cronjobs', cronjobRoute.router)

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = process.env.DB_URL;
MongoClient.connect(uri)
    .then(client => {
        try {
            const db = client.db("UserDB");
            const dbCron = client.db("CronDB");
            const userCollection = db.collection('userdata');
            const cronCollection = dbCron.collection('cronjobs');
            app.locals.userdata = userCollection;
            app.locals.cronjobs = cronCollection;
            cronjobRoute.readFromDB()
            console.log("Connected to DB");
        } catch (error) {
            console.log("Fehler beim Verbinden mit der DB ", error);
        }
    });

//App Listen
app.listen(port, () => {
    //leds.workLight();
    //Rolladen.rolladenUP();
    console.log(`App listening at http://ZimmerMatic:${port}`);
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
        case "ROLLADEN/stateSchreibtisch":
            jsonClients.stateSchreibtisch.state = message.toString();
            break;
        default:
            break;
    }
})

let jsonClients = {
    colorCouch: {
        position: "Couch",
        value: "",
        description: "LEDs am an der Couch"
    },
    colorMarvin: {
        value: "",
        position: "Schreibtisch Marvin",
        description: "LEDs am Schreibtisch von Marvin"
    },
    colorEmely: {
        value: "",
        position: "Schreibtisch Emely",
        description: "LEDs am Schreibtisch von Emely"
    },
    colorUhr: {
        value: "",
        position: "Uhr",
        description: "LEDs in der Uhr"
    },
    colorKamin: {
        value: "",
        position: "Kamin",
        description: "LEDs hinter der Uhr am Kamin"
    },
    stateBett: {
        state: "",
        position: "Rolladen Bett",
        description: "Großer Rolladen am Bett"
    },
    stateSchreibtisch: {
        state: "",
        position: "Rolladen Schreibitsch",
        description: "Kleiner Rolladen an den Schreibtischen"
    }
}
exports.jsonClients = jsonClients;

