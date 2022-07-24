const main = require("../index")

/**
 * Middleware to Single fetch All LED strips with r,g,b and brightness
 */
main.app.post("/api/LED/ALL", function (req, res) {
    //incoming:
    //{r: string, g: string, b: string, v: string, spot: string}
    let r = req.body.red;
    let g = req.body.green;
    let b = req.body.blue;
    let v = Number(req.body.value) * 2.5;
    
    try {
        main.client.publish("LED_COLOR/all", JSON.stringify({ r: r, g: g, b: b, v: v }))
    } catch (error) {
        main.loggererror.error("LED Send /ALL nicht Verfügbar");
    }
    res.sendStatus(200);
});

/**
 * Middleware to Single fetch 1 LED strip with r,g,b and brightness
 */
main.app.post("/api/LED/Single", function (req, res) {
    //incoming:
    //{r: string, g: string, b: string, v: string, spot: string}
    let r = req.body.red;
    let g = req.body.green;
    let b = req.body.blue;
    let v = Number(req.body.value) * 2.5;
    let spot = getSpot(req.body.spot);
    console.log(req.body.spot);
    console.log(spot);
    console.log("Incoming Single " + r,g,b,v,spot);
    try {
        main.client.publish(spot, JSON.stringify({ r: r, g: g, b: b, v: v }))
    } catch (error) {
        main.loggererror.error("LED Send /Single: Client" + spot + " nicht Verfügbar");
    }
    res.sendStatus(200);
});

/**
 * Middleware for preset work LED settings fetched by Frontend
 */
main.app.get("/api/LED/Work", function (req, res) {
    try {
        main.client.publish("LED_COLOR/colorCouch", JSON.stringify({ r: 67, g: 97, b: 180, v: 255 }));
        main.client.publish("LED_COLOR/colorKamin", JSON.stringify({ r: 255, g: 255, b: 255, v: 255 }));
        main.client.publish("LED_COLOR/colorUhr", JSON.stringify({ r: 67, g: 12, b: 200, v: 255 }));
        main.client.publish("LED_COLOR/colorMarvin", JSON.stringify({ r: 255, g: 255, b: 255, v: 255 }));
        main.client.publish("LED_COLOR/colorEmely", JSON.stringify({ r: 255, g: 255, b: 255, v: 255 }));
    } catch (error) {
        main.loggererror.error("LED Send /Work nicht Verfügbar");
    }
    res.sendStatus(200);
});

/**
 * Middleware to get State of an LED Strip
 */
main.app.post("/api/LED/state", function (req, res) {
    console.log("State Acces");
    subPath = req.body.subPath;
    if (!isNaN(parseInt(subPath))) {
        subPath = getSpot(req.body.subPath)
    }
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

