const main = require("../index");

/**
 * Sends new value to heater
 * @param {*} Heizung which heater
 * @param {*} wert temperature for heater
 */
function fetchHeizung(Heizung, wert) {
    let adresse = "http://192.168.0.138:8080/rest/items/" + Heizung;
    main.axios.post(adresse, wert, {
        headers: { "content-type": "text/plain" }
    }).then(function (response) {
        // handle success
    })
    .catch(function (error) {
            // handle error
        main.loggererror.error("Erroro fetching heater")
    });
}

/**
 * Turns all heater off
 */
function heizungOff() {
    fetchHeizung("HZFen_ST", 0);
    fetchHeizung("HZF_ST", 0);
}
exports.heizungOff = heizungOff;

/**
 * Turns all heater on
 * @param {*} degree temperature
 */
function heizungON(degree) {
    fetchHeizung("HZFen_ST", degree);
    fetchHeizung("HZF_ST", degree);
}
exports.heizungON = heizungON;