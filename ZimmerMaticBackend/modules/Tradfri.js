const main = require("../index");

/**
 * Turns on/off the Ikea Tradfri socket
 * @param {*} mode "ON/OFF"
 */
function fetchSteckdose(mode) {
    let adresse = "http://192.168.0.138:8080/rest/items/StD_Betrieb";
    main.axios.post(adresse, mode, {
        headers: { "content-type": "text/plain" }
    }).then(function (response) {
        //Succes
    }).catch(function (error) {
        console.log("Failed to Fetch socket with Error: " + error)
    });
}
exports.fetchSteckdose = fetchSteckdose;

/**
 * Turns on/off Ikea Tradfri Lightbulbs
 * @param {*} lampe which lamp
 * @param {*} mode warm/cold
 * @param {*} value brightness or color temperature
 */
function fetchLampe(lampe, mode, value) {
    let adresse = "http://192.168.0.138:8080/rest/items/" + lampe + "_" + mode;
    main.axios.post(adresse, String(value), {
        headers: { "content-type": "text/plain" }
    }).then(function (response) {
        //Succes
    }).catch(function (error) {
        console.log("Failed to Fetch lampe: " + lampe, mode, value, adresse + " with Error: " + error)
    });
}
exports.fetchLampe = fetchLampe;
