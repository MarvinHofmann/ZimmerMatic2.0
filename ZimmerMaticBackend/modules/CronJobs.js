const cron = require("node-cron")
const main = require("../index")
const router = require('express').Router();
const led = require('./LEDs')
const hexToRgba = require("hex-to-rgba");
const shutter = require("./Rolladen")
//hash map to map keys to jobs
let jobMap = new Map();

const hex2rgb = (hex) => {
    console.log(hex);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

async function generateLEDJob(cronEx, whichLED, color, name, persist) {
    if (persist) color = hex2rgb(color)
    if (typeof (whichLED) == "object") {
        const ledjob = cron.schedule(String(cronEx), () => {
            whichLED.forEach(ledString => {
                led.singleLEDChange(ledString, color.r, color.g, color.b, 255);
            });
        }, { scheduled: false })
        jobMap.set(name, { job: ledjob, description: { jobName: name, type: "LED", color: color, whichLED: whichLED, expression: cronEx, active: true, } })
        ledjob.start()
    }
    if (persist) await main.app.locals.cronjobs.insertOne({ title: name, description: jobMap.get(name).description });
}

async function generateShutterJob(cronEx, whichShutter, direction, name, persist) {
    if (direction == "up") {
        const shutterJob = cron.schedule(String(cronEx), () => {
            shutter.rolladenUP()
        }, { scheduled: false })
        jobMap.set(name, { job: shutterJob, description: { jobName: name, type: "Rolladen", whichShutter, direction, expression: cronEx, active: true, } })
        shutterJob.start()
    } else {
        const shutterJob = cron.schedule(String(cronEx), () => {
            shutter.rolladenDown()
        }, { scheduled: false })
        jobMap.set(name, { job: shutterJob, description: { jobName: name, type: "Rolladen", whichShutter, direction, expression: cronEx, active: true, } })
        shutterJob.start()
    }
    if (persist) await main.app.locals.cronjobs.insertOne({ title: name, description: jobMap.get(name).description });
}
async function readFromDB() {
    const documents = await main.app.locals.cronjobs.find({}).toArray();
    documents.forEach((doc) => {
        console.log(doc);
        if (doc.description.type == "Rolladen") {
            description = doc.description;
            generateShutterJob(description.expression, description.whichShutter, description.direction, description.jobName, false)
        } else if (doc.description.type == "LED") {
            description = doc.description;
            generateLEDJob(description.expression, description.whichLED, description.color, description.jobName, false)
        }
    });
}
exports.readFromDB = readFromDB;


router.post('/generate-job/led', (req, res) => {
    generateLEDJob(req.body.expression, req.body.whichLED, req.body.color, req.body.jobName, true)
    res.status(200).json({ message: "OK" })
})

router.post('/generate-job/shutter', (req, res) => {
    generateShutterJob(req.body.expression, req.body.whichShutter, req.body.direction, req.body.jobName, true)
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