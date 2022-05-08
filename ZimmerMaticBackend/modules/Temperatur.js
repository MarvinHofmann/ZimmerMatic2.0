const main = require("../index.js")
const time = require("./timeLibrary")
const rol = require("./Rolladen")
/**
 * Middleware for fetching Temperature Data from frontend 
 * to Display curren measured Temperature and Humidity
 */
main.app.post("/api/TempData", function (req, res) {
  let _spot = req.body.spot;
  //Get values from DB and send response
  main.app.locals.temperature.find({ spot: _spot }).toArray(function (err, response) {
    let return_json = response[0];
    return_json.lastTemperature = response[1].temperature
    res.status(200).json(return_json);
  })
});

/**
 * Middleware acces point for temp sensor one
 */
main.app.post("/", function (req, res) {
  writeToDB(req.body.temperatur, req.body.feuchtigkeit, "Bett")
  getTempAverage();
  res.sendStatus(200);
});

/**
 * Middleware acces point for temp sensor two
 */
main.app.post("/senderZwei", function (req, res) {
  writeToDB(req.body.temperatur, req.body.feuchtigkeit, "Couch")
  getTempAverage();
  res.sendStatus(200);
});

/**
 * Middleware acces point for temp sensor three
 */
main.app.post("/senderDrei", function (req, res) {
  writeToDB(req.body.temperatur, req.body.feuchtigkeit, "Schreibtisch")
  getTempAverage();
  res.sendStatus(200);
});

/**
 * Writes every incoming sensor value into DB
 * @param {*} temp sensor temperature
 * @param {*} hum sensor humidity
 * @param {*} spot sensor spot
 */
function writeToDB(temp, hum, spot) {
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
function getTempAverage() {
  average = ((temp + temp2 + temp3) / 3).toFixed(2);
  if (average > 24) {
    rol.rolladenDown();
  }
}