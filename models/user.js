var mongoose = require('mongoose');

//bcrypt hashing package to has passwords before storing them
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, required: true, min: 6, max: 24},
  email: {type: String, required: true, min:4, max: 100 },
  password: {type: String, required: true, min: 6, max: 100},
  confirmPassword: {type: String, required: true, min: 6, max: 100},
})

//must add prehook to hash passwords here


var User = mongoose.model('User', UserSchema);

module.exports = User;