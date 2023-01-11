const router = require('express').Router();
module.exports = router

router.get("/software", function (req, res) {
    p = path.join(__dirnam)
    res.download(p + 'Blink.ino.bin', (err)=>{
        if (err) {
            console.error("Problem on download firmware: ", err)
        }else{
            downloadCounter++;
        }
    });
    console.log('Your file has been downloaded '+downloadCounter+' times!')
});
