const router = require('express').Router();
module.exports = router
const path = require("path")

router.get("/software", function (req, res) {
    console.log("HIHI");
    p = path.join(__dirname)
    console.log(p);
    res.download(p + 'Blink.ino.bin', (err)=>{
        if (err) {
            console.error("Problem on download firmware: ", err)
        }else{
            downloadCounter++;
        }
    });
    console.log('Your file has been downloaded '+downloadCounter+' times!')
});
