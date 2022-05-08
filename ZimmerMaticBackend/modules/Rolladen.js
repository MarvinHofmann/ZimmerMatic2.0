const main = require("../index")

/**
 * Middleware for shutter close, open and stop possible
 */
main.app.post("/api/Rolladen", function (req, res) {
    let dir = req.body.direction;
    //Executes the Direction requested by frontend
    try {
        main.currentClientsws[0].send(dir);
        res.sendStatus(200)
    } catch (error) {
        main.loggererror.error(main.currentClientsws[0] + " Not available!");
        res.sendStatus(500)
    }
});

//Export Functions
/**
 * opens the shutter
 */
function rolladenUP() {
    try {
        main.currentClientsws[0].send("99");
    } catch (error) {
        main.loggererror.error(main.currentClientsws[0] + " Not available!");
    }
}
exports.rolladenUP = rolladenUP;

/**
 * stops the shutter
 */
function rolladenStop() {
    try {
        main.currentClientsws[0].send("100");
    } catch (error) {
        main.loggererror.error(main.currentClientsws[0] + " Not available!");
    }
}
exports.rolladenStop = rolladenStop;

/**
 * closes the shutter
 */
function rolladenDown() {
    try {
        main.currentClientsws[0].send("101");
    } catch (error) {
        main.loggererror.error(main.currentClientsws[0] + " Not available!");
    }
}
exports.rolladenDown = rolladenDown;