const cron = require("node-cron")
const main = require("../index")
const router = require('express').Router();
const led = require('./LEDs')
const hexToRgba = require("hex-to-rgba");
const shutter = require("./Rolladen")
const ikea = require("./Tradfri")
//hash map to map keys to jobs
let jobMap = new Map();

/**
 * The function `hex2rgb` takes a hexadecimal color code as input and returns an object with the
 * corresponding RGB values.
 * @param hex - The `hex` parameter is a string representing a hexadecimal color code.
 * @returns The function `hex2rgb` returns an object with properties `r`, `g`, and `b`, which represent
 * the red, green, and blue values respectively of the given hexadecimal color code.
 */
const hex2rgb = (hex) => {
    console.log(hex);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

/**
 * The function generates a job that changes the color of LED lights based on a cron expression, and
 * optionally persists the job and stops it after one execution.
 * @param cronEx - The cron expression that determines when the job should run.
 * @param whichLED - The `whichLED` parameter is used to specify which LED(s) should be changed. It is an array of LED strings.
 * @param color - The "color" parameter is the color value that will be used for the LED job. An RGB object (e.g., { r: 255, g: 0, b:
 * @param name - The name of the LED job. It is used as a unique identifier for the job.
 * @param persist - The "persist" parameter is a boolean value that determines whether the LED color
 * should persist or not. If set to true, the color will persist, meaning it will remain the same until
 * changed again. If set to false, the color will only be applied temporarily.
 * @param oneTime - A boolean value indicating whether the job should run only once or repeatedly
 * according to the cron expression.
 */
async function generateLEDJob(cronEx, whichLED, color, name, persist, oneTime) {
    if (persist) color = hex2rgb(color)
    if (typeof (whichLED) == "object") {
        const ledjob = cron.schedule(String(cronEx), () => {
            whichLED.forEach(ledString => {
                led.singleLEDChange(ledString, color.r, color.g, color.b, 255);
            });
            if (oneTime) {
                jobMap.get(name).job.stop()
                jobMap.delete(name)
                main.app.locals.cronjobs.deleteOne({ "title": name })
            }
        }, { scheduled: false })
        jobMap.set(name, { job: ledjob, description: { jobName: name, type: "LED", color: color, whichLED: whichLED, expression: cronEx, active: true, oneTimeJob: oneTime } })
        ledjob.start()
    }
    if (persist) await main.app.locals.cronjobs.insertOne({ title: name, description: jobMap.get(name).description });
}

/**
 * The function `generateShutterJob` creates and starts a cron job that moves a shutter in a specified
 * direction, and optionally persists the job in a database.
 * @param cronEx - The cron expression that determines when the job should run.
 * @param whichShutter - The parameter "whichShutter" is used to specify which shutter to move. It
 * could be an identifier or a reference to a specific shutter object.
 * @param direction - The "direction" parameter specifies the direction in which the shutter should
 * move.
 * @param name - The name of the shutter job. It is used as a unique identifier for the job.
 * @param persist - The `persist` parameter is a boolean value that determines whether the shutter job
 * should be persisted or stored in a database. If `persist` is set to `true`, the job will be stored
 * in the database. If `persist` is set to `false`, the job will not be stored in
 * @param oneTime - The `oneTime` parameter is a boolean value that determines whether the shutter job
 * should be executed only once or repeatedly according to the cron expression. If `oneTime` is `true`,
 * the job will be executed once and then stopped. If `oneTime` is `false`, the job will
 */
async function generateShutterJob(cronEx, whichShutter, direction, name, persist, oneTime) {
    const shutterJob = cron.schedule(String(cronEx), () => {
        shutter.moveShutter(whichShutter, direction);
        if (oneTime) {
            jobMap.get(name).job.stop()
            jobMap.delete(name)
            main.app.locals.cronjobs.deleteOne({ "title": name })
        }
    }, { scheduled: false })
    jobMap.set(name, { job: shutterJob, description: { jobName: name, type: "Rolladen", whichShutter, direction, expression: cronEx, active: true, oneTimeJob: oneTime } })
    shutterJob.start()
    if (persist) await main.app.locals.cronjobs.insertOne({ title: name, description: jobMap.get(name).description });
}

/**
 * The function generates a scheduled job to control the brightness and color of one or more light
 * bulbs based on a cron expression, with the option to persist the job and make it a one-time job.
 * @param cronEx - The cron expression that determines when the job should run.
 * @param whichLight - The `whichLight` parameter is used to specify which light bulbs should be
 * affected by the job. It can be either a single light bulb or an array of light bulbs. (BR,BL,BT)
 * @param brightness - The brightness parameter determines the level of brightness for the light. It is
 * a value between 0 and 100, where 0 represents the lowest brightness and 100 represents the highest
 * brightness.
 * @param color - The "color" parameter represents the desired color of the light. It could be a
 * specific color value or a color temperature value, depending on the implementation.
 * @param name - The name of the light job. It is used as a unique identifier for the job.
 * @param persist - The "persist" parameter determines whether the job should be persisted in a
 * database or not. If set to true, the job will be stored in a database for future reference. If set
 * to false, the job will not be stored in the database.
 * @param oneTime - A boolean value indicating whether the job should run only once or repeatedly
 * according to the cron expression.
 */
async function generateLightJob(cronEx, whichLight, brightness, color, name, persist, oneTime) {
    if (typeof (whichLight) == "object") {
        const lightJob = cron.schedule(String(cronEx), () => {
            whichLight.forEach(lightBulb => {
                ikea.fetchLampe(lightBulb, "Helligkeit", brightness);
                ikea.fetchLampe(lightBulb, "Farbtemperatur", color);
            });
            if (oneTime) {
                jobMap.get(name).job.stop()
                jobMap.delete(name)
                main.app.locals.cronjobs.deleteOne({ "title": name })
            }
        }, { scheduled: false })
        jobMap.set(name, { job: lightJob, description: { jobName: name, type: "Licht", brightness: brightness, color: color, whichLight: whichLight, expression: cronEx, active: true, oneTimeJob: oneTime } })
        lightJob.start()
    }
    if (persist) await main.app.locals.cronjobs.insertOne({ title: name, description: jobMap.get(name).description });
}

/**
 * The function reads documents from a database and generates different types of jobs based on the
 * document's description.
 */
async function readFromDB() {
    const documents = await main.app.locals.cronjobs.find({}).toArray();
    documents.forEach((doc) => {
        description = doc.description;
        if (description.type == "Rolladen") {
            generateShutterJob(description.expression, description.whichShutter, description.direction, description.jobName, false, description.oneTimeJob)
        } else if (description.type == "LED") {
            generateLEDJob(description.expression, description.whichLED, description.color, description.jobName, false, description.oneTimeJob)
        } else if (description.type == "Licht") {
            generateLightJob(description.expression, description.whichLight, description.brightness, description.color, description.jobName, false, description.oneTimeJob)
        }
    });
}
exports.readFromDB = readFromDB;

router.post('/generate-job/light', (req, res) => {
    generateLightJob(req.body.expression, req.body.whichLights, req.body.brightness, req.body.color, req.body.jobName, true, req.body.oneTimeJob)
    res.status(200).json({ message: "OK" })
})

router.post('/generate-job/led', (req, res) => {
    generateLEDJob(req.body.expression, req.body.whichLED, req.body.color, req.body.jobName, true, req.body.oneTimeJob)
    res.status(200).json({ message: "OK" })
})

router.post('/generate-job/shutter', (req, res) => {
    generateShutterJob(req.body.expression, req.body.whichShutter, req.body.direction, req.body.jobName, true, req.body.oneTimeJob)
    res.status(200).json({ message: "OK" })
})

router.post('/start-job', (req, res) => {
    const jobName = req.body.jobName
    const jobElem = jobMap.get(jobName)
    const job = jobElem.job
    jobElem.description.active = true

    if (!job) return res.status(400).json({ message: 'invalid job name' })
    else job.start()
    res.status(200).json({ message: `job ${jobName} started successfully` })
})

router.post('/stop-job', (req, res) => {
    const jobName = req.body.jobName
    const jobElem = jobMap.get(jobName)
    const job = jobElem.job
    jobElem.description.active = false

    if (!job) return res.status(400).json({ message: 'invalid job name' })
    else job.stop()
    res.status(200).json({ message: `job ${jobName} stopped successfully` })
})

router.get('/all-jobs', (req, res) => {
    let jobs = [];
    for (let [key, value] of jobMap) {
        jobs.push(value.description)
    }
    res.status(200).send(jobs)
})

router.delete("/job/:jobName", async (req, res) => {
    jobMap.delete(req.params.jobName)
    main.app.locals.cronjobs.deleteOne({ "title": req.params.jobName })
    res.status(200).send("OK")
});

module.exports = {
    router: router,
    readFromDB: readFromDB
}