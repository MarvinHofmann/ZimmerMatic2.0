const main = require("../index")

/**
 * Middleware to Single fetch All LED strips with r,g,b and brightness
 */
main.app.post("/api/LED/ALL", function (req, res) {
    //incoming:
    //{r: string, g: string, b: string, v: string}
    let r = req.body.red;
    let g = req.body.green;
    let b = req.body.blue;
    let v = Number(req.body.value) * 2.5;
    console.log(`r: ${r}, g: ${g}, b: ${b}, v: ${v}`);
    for (let i = 0; i < main.currentClientsws.length; i++) {
        try {
            main.currentClientsws[i].send(`${r},${g},${b},${v}`);
        } catch (error) {
            main.loggererror.error("LED Send /ALL: Client " + i + " nicht Verfügbar");
        }
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
    let spot = req.body.spot
    try {
        main.currentClientsws[spot].send(`${r},${g},${b},${v}`);
    } catch (error) {
        main.loggererror.error("LED Send /Single: Client" + spot +  " nicht Verfügbar");
    }
    res.sendStatus(200);
});

/**
 * Middleware for preset work LED settings fetched by Frontend
 */
main.app.get("/api/LED/Work", function (req, res){
    try {
        main.currentClientsws[1].send(`${255},${255},${255},${255}`);
        main.currentClientsws[4].send(`${255},${255},${255},${255}`);
        main.currentClientsws[5].send(`${255},${255},${255},${255}`);
        main.currentClientsws[3].send(`${67},${97},${180},${255}`);
        main.currentClientsws[2].send(`${255},${95},${0},${255}`);
    } catch (error) {
        main.loggererror.error("LED Send /Single: Client" + spot +  " nicht Verfügbar");
    }
    res.sendStatus(200);
});