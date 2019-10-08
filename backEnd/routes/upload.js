var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var multer = require('multer');
const path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profilePic')
    },
    filename: function(req, file, cb){
        cb(null, req.body.nic + path.extname(file.originalname));
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    limits: {fileSize: 10000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('file');

// Check ext
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error: Images Only!');
    }
}



router.post('/profilePic', function (req, res,next) {
  upload(req, res, function (err) {
    if (err) {
      return res.json({status:500,message:"upload_error"});
    }else{
        if(req.file == undefined){
            return res.json({status:500,message:"Error: No file selected!"});
        }else{
            return res.json({status:200,message:"success"});
        }
    }
    //next();
  },
  function (req, res){
    console.log(req.body);
  }
)
});


module.exports = router;