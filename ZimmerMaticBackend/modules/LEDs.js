const router = require('express').Router();
const main = require("../index")

/**
 * Middleware to Single fetch All LED strips with r,g,b and brightness
 */
router.post("/ALL", function (req, res) {
    //incoming:
    //{r: string, g: string, b: string, v: string, spot: string}
    let r = req.body.red;
    let g = req.body.green;
    let b = req.body.blue;
    let v = Number(req.body.value) * 2.55;
    allLEDChange(r,g,b,v);
    res.sendStatus(200);
});

/**
 * Public Function for changing all LED Strips
 * @param {number} r Red
 * @param {number} g Green
 * @param {number} b Blue
 * @param {number} v Brightness 
 */
function allLEDChange(r,g,b,v) {
    try {
        main.client.publish("LED_COLOR/all", JSON.stringify({ r: r, g: g, b: b, v: v }))
    } catch (error) {
        console.log("LED Send /ALL nicht Verfügbar");
    }
}
exports.allLEDChange = allLEDChange

/**
 * Middleware to Single fetch 1 LED strip with r,g,b and brightness
 */
router.post("/Single", function (req, res) {
    //incoming:
    //{r: string, g: string, b: string, v: string, spot: string}
    let r = req.body.red;
    let g = req.body.green;
    let b = req.body.blue;
    let v = Number(req.body.value) * 2.55;
    let spot = getSpot(req.body.spot);
    singleLEDChange(spot,r,g,b,v);    
    res.sendStatus(200);
});

/**
 * Public Function for changing one LED
 * @param {string} spot Which Strip
 * @param {number} r Red
 * @param {number} g Green
 * @param {number} b Blue
 * @param {number} v Brightness 
 */
function singleLEDChange(spot, r,g,b,v) {
    try {
        main.client.publish(spot, JSON.stringify({ r: r, g: g, b: b, v: v }))
    } catch (error) {
        console.log("LED Send /Single: Client" + spot + " nicht Verfügbar");
    }
}
exports.singleLEDChange = singleLEDChange;


/**
 * Middleware for preset work LED settings fetched by Frontend
 */
main.app.get("/api/LED/Work", function (req, res) {
    try {
        workLight();
    } catch (error) {
        console.log("LED Send /Work nicht Verfügbar");
    }
    res.sendStatus(200);
});

/**
 * Preset for Light the room for working presetet from frontend Button
 */
function workLight() {
    main.client.publish("LED_COLOR/colorCouch", JSON.stringify({ r: 67, g: 97, b: 180, v: 255 }));
    main.client.publish("LED_COLOR/colorKamin", JSON.stringify({ r: 255, g: 255, b: 255, v: 255 }));
    main.client.publish("LED_COLOR/colorUhr", JSON.stringify({ r: 67, g: 12, b: 200, v: 255 }));
    main.client.publish("LED_COLOR/colorMarvin", JSON.stringify({ r: 255, g: 255, b: 255, v: 255 }));
    main.client.publish("LED_COLOR/colorEmely", JSON.stringify({ r: 255, g: 255, b: 255, v: 255 }));
}
exports.workLight = workLight;

/**
 * Middleware to get State of an LED Strip
 */
main.app.post("/api/LED/state", function (req, res) {
    console.log("State Acces");
    subPath = req.body.subPath;

    if (!isNaN(parseInt(subPath))) {
        subPath = getSpot(req.body.subPath)
        //Slice String at "/" and delete the front part
        subPath = subPath.split("/").pop();
    }
    console.log(main.jsonClients[subPath].value);
    res.send(main.jsonClients[subPath].value);
});


/**
 * Gets the MQTT Topic from the Frontend Spot Number
 * @param {int} nr number send by frontend
 * @returns real Topic name
 */
function getSpot(nr) {
    console.log("NR" + nr);
    switch (parseInt(nr)) {
        case 1:
            return "LED_COLOR/colorKamin";
        case 2:
            return "LED_COLOR/colorCouch";
        case 3:
            return "LED_COLOR/colorUhr";
        case 4:
            return "LED_COLOR/colorMarvin";
        case 5:
            return "LED_COLOR/colorEmely";
    }
}
exports.getSpot = getSpot;

module.exports = { 
    router:router,
    allLEDChange: allLEDChange,
    singleLEDChange: singleLEDChange,
    getSpot: getSpot,
    workLight: workLight
  }