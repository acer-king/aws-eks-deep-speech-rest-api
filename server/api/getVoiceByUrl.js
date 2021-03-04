const express = require('express');
const router = express.Router();
const multer = require('multer');
let getFiles = multer();
let { deepSpeech, deepSpeechByUrl } = require('../middlewares/deepspeech');

// //========================used for local storage
// var path = require('path')
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, __dirname + '/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// var getFiles = multer({ storage: storage })
// //============================



//get voice data
router.post("/", deepSpeechByUrl, (req, res) => {
  res.send({
    metadata: req.meta,
    results: req.locals
  })
});


module.exports = router;
