const router = require('express').Router();
module.exports = router
const main = require("../index.js")
const si = require('systeminformation');
/**
 * Returns Information about the pi 
 * cpu usage, total memory and free memory
 */
router.get("/os_info", async function (req, res) {

    let cpu = await si.cpu().then((data) => {
        return data
    })
        .catch(error => console.error(error));

    let cpu_temp = await si.cpuTemperature().then((data) => {
        return data
    })
        .catch(error => console.error(error));

    let memory_info = await si.mem().then((data) => {
        return data
    })
        .catch(error => console.error(error));

    let load = await si.currentLoad().then((data) => {
        return data
    })
        .catch(error => console.error(error));

    let fsys = await si.fsSize().then((data) => {
        return data
    })

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOjEsInNjb3BlIjoiZGVmYXVsdCIsImZvcmNlQ2hhbmdlUGFzc3dvcmQiOmZhbHNlLCJleHAiOjE3MDQxMDQ0MzcsImlhdCI6MTY3MzAwMDQzN30.wOHOSbcY6W7VrzEnGkOxePviNOWFRNu12OVqiq6E5Pg"
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    let container = await main.axios
        .get("http://192.168.0.138:9000/api/endpoints/2/docker/containers/json", config)
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
        });

    res.status(200).json({
        cpu_si: cpu,
        memory: memory_info,
        cpu_temp: cpu_temp,
        load: load,
        disk: fsys,
        container: container
    })
});