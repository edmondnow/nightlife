#! /usr/bin/env node

console.log('This script populates some users and places');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var User = require('./models/user')
var Place = require('./models/place')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var places = []


function userCreate(username, email, password, confirmPassword, cb) {
  
  var user = new User({
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  });
  
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New User: ' + user);
    users.push(user);
    cb(null, user);
  } );

  
}

function placeCreate(picture, name, description, user, cb) {
  var place = new Place({
  picture: picture,
  name: name,
  description: description,
  users: user
  });
       
  place.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Place: ' + place);
    places.push(place)
    cb(null, place)
  }   );
}



function createUsers(cb) {
    async.parallel([
        function(callback) {
          userCreate('edmondnow', 'edmondnow@me.com', 'password', 'password', callback);
        },
        function(callback) {
           userCreate('edmondnow1', 'edmondnow1@me.com', 'password1', 'password1', callback);
        },
        ],
        cb)

}


function createPlaces(cb) {
    async.parallel([
        function(callback) {
          placeCreate('www.pciture.com', 'Another', 'better cafe', [users[0]], callback);
        },
        function(callback) {
          placeCreate('www.gif.com', 'Berlijn', 'good cafe', [users[1]], callback);
        }
        ],
        cb)
}



async.series([
    createUsers,
    createPlaces
],

// Optional callback
function(err, results) {
  
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



