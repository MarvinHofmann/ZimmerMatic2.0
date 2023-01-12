const router = require('express').Router();
module.exports = router
const path = require('path');

router.get("/software", function (req, res) {
    console.log("HIHI");
    p = path.join(__dirname)
    console.log(p);
    res.download(p + '/Blink.bin', (err)=>{
        if (err) {
            console.error("Problem on download firmware: ", err)
        }else{
        }
    });
});

let downloadCounter = 1;
router.get('/update', (request, response) => {
    console.log(request.headers);
    console.log(request.body);
    response.download(path.join(__dirname, 'firmware/Blink.bin'), 'Blink.bin', (err)=>{
        if (err) {
            console.error("Problem on download firmware: ", err)
        }else{
            downloadCounter++;
        }
    });
    console.log('Your file has been downloaded '+downloadCounter+' times!')
})