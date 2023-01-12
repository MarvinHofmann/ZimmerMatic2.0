const router = require('express').Router();
module.exports = router
const path = require('path');

let downloadCounter = 1;
router.get('/update', (request, response) => {
    console.log(request.headers);
    console.log(request.body);
    response.download(path.join(__dirname, 'firmware/Server.bin'), 'Server.bin', (err) => {
        if (err) {
            console.error("Problem on download firmware: ", err)
        } else {
            downloadCounter++;
        }
    });
    console.log('Your file has been downloaded ' + downloadCounter + ' times!')
})

router.get('/update/server', (request, response) => {
    console.log(request.headers);
    console.log(request.body);
    response.download(path.join(__dirname, 'firmware/Server.bin'), 'Server.bin', (err) => {
        if (err) {
            console.error("Problem on download firmware: ", err)
        } else {
            downloadCounter++;
        }
    });
    console.log('Your file has been downloaded ' + downloadCounter + ' times!')
})

router.get('/ping', (request, res) => {
    console.log(request.headers);
    console.log(request.body);
    res.send({ 'mac_id': 12, 'available_firmware_version': 0 })
})