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

    const token = "ptr_D5OhUvsHBfZ+WisYyVyGK0LSDIW+0SfoQAizDIGDxzM="
    const config = {
        headers: { "X-API-Key": `${token}` },
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