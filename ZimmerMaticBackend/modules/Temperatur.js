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
main.app.post("/api/TempData", function (req, res) {
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
 * Middleware for fetching Temperature Data from frontend 
 * to Display current measured Temperature of the Heater
 */
main.app.post("/api/TempData/Heater", function (req, res) {
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
    main.loggerinfo.debug("100 Database Writes")
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
      main.loggererror.error("Error writing Temp Data to DB: " + err)
    };
  });
}

/**
 * Calculates average temperature and closes the shutter
 * if its above 24°
 */
/* function getTempAverage() {
  average = ((temp + temp2 + temp3) / 3).toFixed(2);
  if (average > 24) {
    shutter.rolladenDown();
  }
} */