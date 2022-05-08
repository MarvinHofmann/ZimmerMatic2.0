const main = require("../index")

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

main.app.post("/api/LED/Single", function (req, res) {
    //incoming:
    //{r: string, g: string, b: string, v: string, spot: string}
    let r = req.body.red;
    let g = req.body.green;
    let b = req.body.blue;
    let v = Number(req.body.value) * 2.5;
    let spot = req.body.spot
    console.log(`r: ${r}, g: ${g}, b: ${b}, v: ${v}, s: ${spot}` );
    try {
        main.currentClientsws[i].send(`${r},${g},${b},${v}`);
    } catch (error) {
        main.loggererror.error("LED Send /Single: Client" + i +  " nicht Verfügbar");
    }
    res.sendStatus(200);
});