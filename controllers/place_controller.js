var yelp = require('./yelpGet');
var User = require('../models/user.js');
var Place = require('../models/place.js');
var async = require('async');


exports.index_get = function(req, res){
 res.render('index', {title: 'Places'});
}



exports.search_post = function(req, res){
  yelp(req.body.location).then(function(response){
    Place.collection.insert(response, function(){
      Place.find({location: req.body.location}).exec(function(err, results){
        if(err) console.log(err)
        console.log('ey');
        latestSearch = req.body.location;
        res.render('index', {title: 'Places', data: results});
       })
     })
  })
}


exports.rsvp_yes = function(req, res){
  Place.findOneAndUpdate({_id: req.body._id}, { $push: { users: "5aa2b4733fa807079042614d" }}).exec(function(err, results){
    if (err) console.log(err);
    Place.find({location: req.body.location}).exec(function(err, results){
      res.render('index', {title: 'Places', data: results});
    })
  })
}

exports.rsvp_no = function(req, res){
  Place.findOneAndUpdate({_id: req.body._id}, { $pull: { users: "5aa2b4733fa807079042614d" }}).exec(function(err, results){
    if (err) console.log(err);
    Place.find({location: req.body.location}).exec(function(err, results){
      res.render('index', {title: 'Places', data: results});
    })
  })
}

exports.register_post = function(req, res){
 res.send('NOT IMPLEMENTED')
}

exports.login_post = function(req, res){
 res.send('NOT IMPLEMENTED')
}

exports.logout_post = function(req, res){
 res.send('NOT IMPLEMENTED')
}