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
        cb(null, file.fieldname  + '.mp4')
    }
})

const upload = multer({ storage: storage })
// const upload = multer({ dest: 'http://localhost:4001' })

const app = express();

const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);

function main () {

    app.get("/",(req,res)=>{

        res.sendFile('/usr/src/app/index.html');
    
    })

    // saving locally
    app.post('/save', upload.single('avatar'), function (req, res, next) {
        // req.file is the `avatar` file
        console.log(req.file)
        // res.send("fichier uploader vers le micro service apache")
        // res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);

        // req.body will hold the text fields, if there were any
    })

    //saving to apache micro service
     app.post('/upload', upload.single('avatar'), function (req, res, next) {
         console.log(req.file)


         const postData = JSON.stringify({
             'msg': 'Hello World!'
         });

         const options = {
             hostname: VIDEO_STORAGE_HOST,
             port: VIDEO_STORAGE_PORT,
             path: '/',
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Content-Length': Buffer.byteLength(postData)
             }
         };

         const forward = http.request(options, (res) => {
             console.log(`STATUS: ${res.statusCode}`);
             console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
             res.setEncoding('utf8');
             res.on('data', (chunk) => {
                 console.log(`BODY: ${chunk}`);
             });
             res.on('end', () => {
                 console.log('No more data in response.');
             });
         });

         forward.on('error', (e) => {
             console.error(`problem with request: ${e.message}`);
         });

// Write data to request body
         forward.write(postData);
         forward.end();
})


    app.listen(3000, ()=> {

    });
    
}


main()