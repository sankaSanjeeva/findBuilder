var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var constructorSchema = new mongoose.Schema({
   
    register: Boolean,
    fName: String,
    mName: String,
    lName: String,
    line1: String,
    line2: String,
    line3: String,
    city: String,
    distric: String,
    birthday: Date,
    gender: String,
    nic: String,
    email: String,
    phone: Number,
    cType: String,
    password: String,
});

var applicant = module.exports = mongoose.model('applicant', constructorSchema);

/* SAVE DATA after encrypting password*/
module.exports.saveApplicant = function(constructor, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(constructor.password, salt, function(err, hash) {
            if(err) throw err;
            constructor.password = hash;
            constructor.save(callback);
        });
    });
};

/* CHECK USER IS AVAILABLE */
module.exports.findByNIC = function(nic, callback){
    var query = {nic: nic};
    applicant.findOne(query, callback);
}

/* CHECK PASSWORD IS TRUE */
module.exports.passwordCheck = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, match) => {
        if(err) throw err;
        callback(null, match);
    })
}

/* passport-jwt */
/* module.exports.findConstructorByID = function(id, callback){

    applicant.findOne(id, callback);
} */
