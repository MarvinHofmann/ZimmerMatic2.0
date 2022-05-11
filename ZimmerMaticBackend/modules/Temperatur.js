const main = require("../index.js")
const time = require("./timeLibrary")
const shutter = require("./Rolladen")

/**
 * Middleware for fetching Temperature Data from frontend 
 * to Display current measured Temperature and Humidity
 */
main.app.post("/api/TempData", function (req, res) {
  let _spot = req.body.spot;
  //Get values from DB and send response
  main.app.locals.temperature.find({spot: _spot, date: time.getDBFormatDate()}).sort({_id: -1}).toArray(function (err, response) {
    let return_json = response[0];
    return_json.lastTemperature = response[1].temperature
    res.status(200).json(return_json);
  })
});

/**
 * Middleware for fetching Temperature Data from frontend 
 * to Display current measured Temperature of the Heater
 */
 main.app.post("/api/TempData/Heater", function (req, res) {
  let _spot = req.body.spot;
  _spot === "Fenster" ? _spot = "HZFen" : _spot = "HZF"
  main.axios.get("http://192.168.0.138:8080/rest/items/" + _spot + "_AT/state")
  .then((response) => res.status(200).json({"temperature": response.data, time: time.getDBFormatTime()}));
});

/**
 * Middleware acces point for temp sensor one
 */
main.app.post("/", function (req, res) {
  //main.loggerinfo.debug("Incoming Request from temp sensor one")
  writeToDB(req.body.temperatur, req.body.feuchtigkeit, "Bett")
  //getTempAverage();
  res.sendStatus(200);
});

/**
 * Middleware acces point for temp sensor two
 */
main.app.post("/senderZwei", function (req, res) {
  //main.loggerinfo.debug("Incoming Request from temp sensor two")
  writeToDB(req.body.temperatur, req.body.feuchtigkeit, "Couch")
  //getTempAverage();
  res.sendStatus(200);
});

/**
 * Middleware acces point for temp sensor three
 */
main.app.post("/senderDrei", function (req, res) {
  //main.loggerinfo.debug("Incoming Request from temp sensor three")
  writeToDB(req.body.temperatur, req.body.feuchtigkeit, "Schreibtisch")
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
  if(counterDBwrites == 100) {
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