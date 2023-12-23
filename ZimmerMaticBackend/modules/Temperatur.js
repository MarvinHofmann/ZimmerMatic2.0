const router = require('express').Router();
module.exports = router
const main = require("../index.js")
const time = require("./timeLibrary")
const shutter = require("./Rolladen")

let spots = [
  {
    spot: "Couch",
    lastTemperature: -1,
    temperature: -1,
    humidity: -1,
    time: ""
  },
  {
    spot: "Schreibtisch",
    lastTemperature: -1,
    temperature: -1,
    humidity: -1,
    time: ""
  },
  {
    spot: "Bett",
    lastTemperature: -1,
    temperature: -1,
    humidity: -1,
    time: ""
  }
]

/**
 * Middleware for fetching Temperature Data from frontend 
 * to Display current measured Temperature and Humidity
 */
router.post("/TempData", function (req, res) {
  let _spot = req.body.spot;
  for (let i = 0; i < spots.length; i++) {
    if (_spot == spots[i].spot) {
      res.status(200).json(spots[i]);
      return;
    }
  }
  res.sendStatus(500)
});

/**
 * Middleware for fetching the average temperature and humidity of the 3 
 * self mande sensors
 * returns a json with average temp and humidity
 */
router.get("/averageTemp", function (req, res) {
  let avg_t = 0
  let avg_h = 0
  for (let i = 0; i < spots.length; i++) {
    if (spots[i].temperature > 0 && spots[i].humidity > 0) {
      avg_t = avg_t + spots[i].temperature
      avg_h = avg_h + spots[i].humidity
    }
  }
  avg_h = (avg_h / 3).toFixed(2)
  avg_t = (avg_t / 3).toFixed(2)
  res.status(200).json({
    avg_temperature: avg_t,
    avg_humidity: avg_h
  })
})

/**
 * Middleware for fetching Temperature Data from frontend 
 * to Display current measured Temperature of the Heater
 */
router.post("/TempData/Heater", function (req, res) {
  let _spot = req.body.spot;
  _spot === "Fenster" ? _spot = "HZFen" : _spot = "HZF"
  main.axios.get("http://192.168.0.138:8080/rest/items/" + _spot + "_AT/state")
    .then((response) => res.status(200).json({ "temperature": response.data, time: time.getDBFormatTime() }));
});

/**
 * Middleware acces point for temp sensor one
 */
main.app.post("/", function (req, res) {
  spots[2] = {
    spot: "Bett",
    lastTemperature: spots[2].temperature,
    temperature: req.body.temperatur,
    humidity: req.body.feuchtigkeit,
    time: time.getDBFormatTime()
  }
  //getTempAverage();
  res.sendStatus(200);
});

/**
 * Middleware acces point for temp sensor two
 */
main.app.post("/senderZwei", function (req, res) {
  spots[0] = {
    spot: "Couch",
    lastTemperature: spots[0].temperature,
    temperature: req.body.temperatur,
    humidity: req.body.feuchtigkeit,
    time: time.getDBFormatTime()
  }
  //getTempAverage();
  res.sendStatus(200);
});

/**
 * Middleware acces point for temp sensor three
 */
main.app.post("/senderDrei", function (req, res) {
  spots[1] = {
    spot: "Schreibtisch",
    lastTemperature: spots[1].temperature,
    temperature: req.body.temperatur,
    humidity: req.body.feuchtigkeit,
    time: time.getDBFormatTime()
  }
  //getTempAverage();
  res.sendStatus(200);
});

let counterDBwrites = 0;
/**
 * Writes every incoming sensor value into DB
 * @param {*} temp sensor temperature
 * @param {*} hum sensor humidity
 * @param {*} spot sensor spot
 */
function writeToDB(temp, hum, spot) {
  counterDBwrites++;
  if (counterDBwrites == 100) {
    counterDBwrites = 0;
  }
  let json = {
    spot: spot,
    temperature: temp,
    humidity: hum,
    time: time.getDBFormatTime(),
    date: time.getDBFormatDate(),
    timestamp: new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })
  }
  main.app.locals.temperature.insertOne(json, function (err, res) {
    if (err) {
      console.log("Error writing Temp Data to DB: " + err)
    };
  });
}
