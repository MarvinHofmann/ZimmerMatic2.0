const router = require('express').Router();
module.exports = router
const main = require("../index")
const Ikea = require("./Tradfri")
const homematic = require("./Homematic")
const shutter = require("./Rolladen")
const led = require('./LEDs')

/**
 * Middleware for IoT Button signals that dinner is ready
 */
router.get("/essenFertig", function (req, res) {
    for (let i = 0; i < 3; i++) {
        led.allLEDChange(0, 0, 0, 0);
        led.allLEDChange(255, 0, 0, 255);
        led.allLEDChange(0, 0, 0, 0);
        led.allLEDChange(255, 0, 0, 255);
    }
    led.allLEDChange(255, 255, 255, 255);
    res.sendStatus(200);
});

/**
 * Middleware for IoT Button for comming home
 */
router.get("/hello", function (req, res) {
    //close the shutter
    shutter.moveShutter("ROLLADEN/stateBett", "DOWN");
    shutter.moveShutter("ROLLADEN/stateSchreibtisch", "DOWN");
    //Turn all LEDs off
    for (let i = 0; i < 5; i++) {
        try {
            led.allLEDChange(0, 0, 0, 0);
        } catch (error) {
            console.log("Error turning off LEDs for /tschuess :" + error);
            res.sendStatus(500);
            return;
        }
    }
    //Turnign off heater and lights
    Ikea.fetchLampe("BL", "Helligkeit", "0");
    Ikea.fetchLampe("BR", "Helligkeit", "0");
    Ikea.fetchLampe("BT", "Helligkeit", "0");
    homematic.heizungOff();
    res.sendStatus(200);
});

/**
 * Middleware IoT Button leaving the room
 */
router.get("/tschuess", function (req, res) {
    try { //Turn ambient leds on
        led.singleLEDChange("LED_COLOR/colorKamin", 255, 73, 0, 255);
        led.singleLEDChange("LED_COLOR/colorCouch", 255, 73, 0, 255);
        led.singleLEDChange("LED_COLOR/colorUhr", 0, 165, 255, 255);
        led.singleLEDChange("LED_COLOR/colorMarvin", 255, 73, 0, 255);
    } catch (error) {
        console.log("Client LEDs [1,2,3] not available")
        res.sendStatus(500);
        return;
    }
    let a = new Date();
    //If its in the evening turn a small light on when comming home
    if (a.getHours() >= 18 || a.getHours() <= 6) {
        Ikea.fetchLampe("BL", "Helligkeit", 30);
        Ikea.fetchLampe("BR", "Helligkeit", 30);
    } else {
        //open the shutter
        shutter.moveShutter("ROLLADEN/stateBett", "UP");
        shutter.moveShutter("ROLLADEN/stateSchreibtisch", "UP");
    }
    //If its winter start the heater
    if ((a.getHours() < 21 || a.getHours() > 8) && (a.getMonth() + 1 < 4 || a.getMonth() + 1 > 10)) {
        homematic.heizungON(20);
    }
    res.sendStatus(200);
});

/**
 * Middleware IoT Button turning on/off the 3D Printer
 */
router.get("/druckerButton", function (req, res) {
    //Get current state
    let adresse = "http://192.168.0.138:8080/rest/items/StD_Betrieb/state";
    main.axios.get(adresse).then(response => response.data)
        .then((response) => {
            antwort = response;
            if (antwort == "OFF") {
                Ikea.fetchSteckdose("ON");
            } else {
                Ikea.fetchSteckdose("OFF");
            }
        })
        .catch(function (err) {
            console.log("Error fetching current state of Printer: " + err)
            res.sendStaus(500);
            return;
        });
    res.sendStatus(200);
});

/**
 * Middleware for IoT Button turning all Off 
 */
router.get('/fensterZu', function (request, response) {
    shutter.moveShutter("ROLLADEN/stateBett", "DOWN");
    syncDelay(1500);
    for (let i = 1; i < 5; i++) {
        try {
            led.allLEDChange(0, 0, 0, 0);
        } catch (error) {
            console.log("Error at /fensterZu while turning LED " + i + " Off")
            response.sendStatus(500)
        }
    }
    syncDelay(3000);
    Ikea.fetchLampe("BL", "Helligkeit", "0");
    Ikea.fetchLampe("BR", "Helligkeit", "0");
    Ikea.fetchLampe("BT", "Helligkeit", "0");
    homematic.heizungOff();
    response.sendStatus(200);
});

/**
 * synchronous Delay
 * @param {*} milliseconds Delay time in Millis.
 */
function syncDelay(milliseconds) {
    let start = new Date().getTime();
    let end = 0;
    while ((end - start) < milliseconds) {
        end = new Date().getTime();
    }
}