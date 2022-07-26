const main = require("../index")

/**
 * Middleware for shutter close, open and stop possible
 */
main.app.post("/api/Rolladen", function (req, res) {
    let dir = req.body.direction;
    main.loggerinfo.info("Incoming shutter Request to: " + dir)
    //Executes the Direction requested by frontend
    try {
        main.client.publish("ROLLADEN/stateBett", dir);
        res.sendStatus(200)
    } catch (error) {
        main.loggererror.error("Shutter Not available!");
        res.sendStatus(500)
    }
});


main.app.post("/api/Rolladen/state", function (req, res){
    let spot = req.body.spot;
    res.send(main.jsonClients[spot].state);
})

//Export Functions
/**
 * opens the shutter
 */
function rolladenUP() {
    try {
        main.client.publish("ROLLADEN/stateBett", "UP");
    } catch (error) {
        main.loggererror.error("Shutter Not available!");
    }
}
exports.rolladenUP = rolladenUP;

/**
 * stops the shutter
 */
function rolladenStop() {
    try {
        main.client.publish("ROLLADEN/stateBett", "STOP");
    } catch (error) {
        main.loggererror.error("Shutter Not available!");
    }
}
exports.rolladenStop = rolladenStop;

/**
 * closes the shutter
 */
function rolladenDown() {
    try {
        main.client.publish("ROLLADEN/stateBett", "DOWN");
    } catch (error) {
        main.loggererror.error("Shutter Not available!");
    }
}
exports.rolladenDown = rolladenDown;