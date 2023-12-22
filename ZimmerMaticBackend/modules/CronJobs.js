const cron = require("node-cron")
const main = require("../index")
const router = require('express').Router();
module.exports = router

//hash map to map keys to jobs
let  jobMap = new Map();

router.post('/start-job', (req, res) => {
    const jobName = req.body.jobName
    const job = jobMap.get(jobName)

    if(!job) return res.status(400).json({message: 'invalid job name'})
    else job.start()
    res.status(200).json({message:`job ${jobName} started successfully`})
})

router.post('/stop-job', (req, res) => {
    const jobName = req.body.jobName
    const job = jobMap.get(jobName)

    if(!job) return res.status(400).json({message: 'invalid job name'})
    else job.stop()
    res.status(200).json({message:`job ${jobName} started successfully`})
})