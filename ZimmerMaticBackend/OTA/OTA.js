const router = require('express').Router();
module.exports = router
const path = require('path');
const fs = require('fs');
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
this_path = path.join(__dirname)

const whitelist = [
    'application/octet-stream'
]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, this_path + '/firmware/uploads/')
    },
    filename: function (req, file, cb) {
        const file_prop = file.originalname.split("#")
        const uniqueSuffix = uuidv4() + '_' + file_prop[1] + "_" + file_prop[0]
        cb(null, uniqueSuffix)
    }
})

const multerUploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'))
        }
        cb(null, true)
    }
})

const upload = multerUploader.single('file');

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


router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("Fehler beim Upload [2]");
            return res.status(400).send("Fehler beim Multer")
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log("Fehler beim Upload [1]");
            return res.status(400).send("Fehler beim Upload")
        }
        console.log("Upload Success");
        return res.status(200).send("File Uploaded Successfuly")
    })
})

router.get('/files', (req, res) => {
    const files = fs.readdirSync(this_path + "/firmware/uploads");
    let parsed_files = []
    files.forEach(element => {
        const propeties = element.split("_");
        let file_properties = {
            "id": propeties[0],
            "filename": propeties[1],
            "version": propeties[2]
        }
        parsed_files.push(file_properties)
    });
    
    res.status(200).send(parsed_files)
})

router.post('/delete', (req, res) => {
    const file_info = req.body.file_info
    const file_name = file_info.id + "_" + file_info.programm + "_" + file_info.version
    const filePath = path.normalize(this_path + "/firmware/uploads/" + file_name); 
    try {
        fs.unlinkSync(filePath);
        res.status(200).send({
            message: "File is deleted.",
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete the file. " + err,
        });
    }
})