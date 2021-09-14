const express = require("express");
const http = require("http");

const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/usr/src/app')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname  + '.jpg')
    }
})

const upload = multer({ storage: storage })
const app = express();

function main () {

    app.get("/",(req,res)=>{

        res.sendFile('/usr/src/app/index.html');
    
    })

    app.post('/upload', upload.single('avatar'), function (req, res, next) {
        // req.file is the `avatar` file
        console.log(req.file)
        res.send("fichier uploader vers le micro service apache")

        // req.body will hold the text fields, if there were any
    })

    app.listen(3000, ()=> {

    });
    
}


main()