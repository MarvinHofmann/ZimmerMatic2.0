const router = require('express').Router();
module.exports = router

router.get("/software", function (req, res) {
    res.download(path.join(__dirnam), 'Blink.ino.bin', (err)=>{
        if (err) {
            console.error("Problem on download firmware: ", err)
        }else{
            downloadCounter++;
        }
    });
    console.log('Your file has been downloaded '+downloadCounter+' times!')
});
