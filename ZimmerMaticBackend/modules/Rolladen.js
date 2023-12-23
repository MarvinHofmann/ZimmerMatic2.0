const router = require('express').Router();
const main = require("../index")
const verify = require("../routes/verify_token")

/**
 * Middleware for shutter close, open and stop possible
 */
router.post("/", function (req, res) {
    const dir = req.body.direction;
    const spot = req.body.spot
    const shutter = "Rolladen/state" + spot
    //Executes the Direction requested by frontend
    try {
        main.client.publish(shutter, dir);
        res.sendStatus(200)
    } catch (error) {
        console.log("Shutter Not available!");
        res.sendStatus(500)
    }
});

router.post("/state", function (req, res) {
    let spot = req.body.spot;
    let trasnlated_value = ""
    value = (main.jsonClients[spot].state);
    if (value == "DOWN") {
        trasnlated_value = "ZU"
    } else if (value == "UP") {
        trasnlated_value = "OFFEN"
    } else {
        trasnlated_value = "MITTIG"
    }
    res.send(trasnlated_value)
})

//Export Functions
/**
 * Moves the given shutter to the given direction
 * @param {*} shutter shutter Channel ("ROLLADEN/stateBett" or "ROLLADEN/stateSchreibitsch")
 * @param {*} direction (UP, STOP, DOWN)
 */
function moveShutter(shutter, direction) {
    try {
        main.client.publish(shutter, direction);
    } catch (error) {
        console.log("Shutter Not available!");
    }
}
exports.moveShutter = moveShutter;

module.exports = {
    router: router,
    moveShutter: moveShutter
}