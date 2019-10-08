var express = require('express');
var router = express.Router();
var applicant = require('../models/applicant');
const multer = require('multer');
var jwt = require('jsonwebtoken');
var passport = require('passport');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
});

var upload = multer({ storage: storage }).single('file');

router.post('/upload', function(req, res, next){
  upload(req, res, function(err){
    if (err){
      return res.json({status: 500, message: 'upload_error'});
    }
    next();
  })
})


/* SAVE DATA*/
router.post('/register', function(req, res) {
  let constructor = new applicant(req.body);
  
  applicant.saveApplicant(constructor, function(err, user){
    if(err){
      res.json({state: false, msg: "data not inserted"});
    }
    if(user){
      res.json({state: true, msg: "data inserted"});
    }
  })
});

router.post("/authenticate", function(req, res){
  const nic = req.body.username; 
  const password = req.body.password;

  applicant.findByNIC(nic, (err, constructor) => {
    if(err) throw err;
    if(!constructor){
      return res.json({state: false, msg: 'No user found'});
    }
    applicant.passwordCheck(password, constructor.password, function(err, match){
      if(err) throw err;
      if(match){
        const token = jwt.sign(constructor.toJSON(), 'myApplicationSecret', {
          expiresIn: 604800
        });
        return res.json(
          {
            state: true,
            msg: 'user logged',
            id: constructor._id,
            role: constructor.role,
            token: token,
            nic: constructor.nic
          });
      }else{
        return res.json({state: false, msg: 'Wrong password'})
      }
    });
  });
});

/* profile */
// mora code

router.get('/profile', (req, res) => {
  var token=req.header("Authorization");
  if(token){
    jwt.verify(token,'myApplicationSecret',function (err, decoded){
      if(err)
        return res.json({message:"Unauthorized"});
      else
        return res.json({state: true, user: decoded});
    });
  }
  else{
    return res.json({message:"No_token"});
  }
});
// old code
/* router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
}); */


/* GET ALL DATA*/
router.get('/view', function(req, res, next) {
  applicant.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
}); 

/* GET SINGLE DATA BY ID */
router.get('/view/:id', function(req, res, next) {
  applicant.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* UPDATE DATA */

router.post('/update/:id', (req, res) => {
  applicant.findById(req.params.id, (err, user) => {
    if(!user) return next(err);
    else 
      user.fName = req.body.fName;
      user.mName = req.body.mName;
      user.lName = req.body.lName;
      user.line1 = req.body.line1;
      user.line2 = req.body.line2;
      user.line3 = req.body.line3;
      user.city = req.body.city;
      user.distric = req.body.distric;
      user.birthday = req.body.birthday;
      user.gender = req.body.gender;
      user.nic = req.body.nic;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.cType = req.body.cType;

      user.save().then(user => {
        res.json('update done');
      }).catch(err => {
        res.status(400).send('update failed');
      });
  })
})

router.post('/update2/:id', (req, res) => {
  applicant.findById(req.params.id, (err, user) => {
    if(!user) return next(err);
    else 
      user.register = req.body.register;
      user.fName = req.body.fName;
      user.mName = req.body.mName;
      user.lName = req.body.lName;
      user.line1 = req.body.line1;
      user.line2 = req.body.line2;
      user.line3 = req.body.line3;
      user.city = req.body.city;
      user.distric = req.body.distric;
      user.birthday = req.body.birthday;
      user.gender = req.body.gender;
      user.nic = req.body.nic;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.cType = req.body.cType;

      user.save().then(user => {
        res.json('update done');
      }).catch(err => {
        res.status(400).send('update failed');
      });
  })
})
/* router.put('/update/:id', function(req, res, next) {
  applicant.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); */

/* DELETE DATA */
router.delete('/delete/:id', function(req, res, next) {
  applicant.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//-----------------------------------      My Codes     -----------------------------------\\
/* GET ALL DATA BY OF EACH cTypes */
router.get('/cTypes', function(req, res, next) {
  let type = req.query.cType;
  applicant.find({cType: type }, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log(type + ' categorised');
  });
});

/* GET ALL DATA BY OF EACH DISTRIC */
router.get('/districs', function(req, res, next) {
  let dis = req.query.distric;
  applicant.find({distric: dis }, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log(dis + ' categorised');
  });
});

/* GET ALL DATA BY OF EACH GENDER */
router.get('/genders', function(req, res, next) {
  let gen = req.query.gender;
  applicant.find({gender: gen }, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log(gen + ' categorised');
  });
});

/* GET ALL DATA BY SEARCHING fName */
router.get('/searchByName', function(req, res, next) {
  let name = req.query.fName;
  applicant.find({fName: name }, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log(name + ' searched');
  });
});


/* GET ALL DATA BY SEARCHING city */
router.get('/searchByCity', function(req, res, next) {
  let town = req.query.city;
  applicant.find({city: town }, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log(town + ' searched');
  });
});

router.get('/state', function(req, res, next) {
  let state = req.query.state;
  applicant.find({register: state }, function (err, post) {
    if (err) return next(err);
    res.json(post);
    console.log(state + ' searched');
  });
});

// multer

var store = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/profilePic');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + '.' + file.originalname);
  }
});

var upload = multer({storage: store}).single('file');

router.post('/upload', function(req, res, next){
  upload(req, res, function(err){
    if(err){
      return res.status(501).json({error: err});
    }
    return res.json({originalname: req.file.originalname, uploadname: req.file.filename});
  });
});

//MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

module.exports = router;
