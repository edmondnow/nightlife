var yelp = require('./yelpGet');
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Place = require('../models/place.js');

//stores data from yelp API based on latest search
var latestSearch;


exports.index_get = function(req, res){
 res.render('index', {title: 'Places'});
}

exports.search_post = function(req, res){
  yelp(req.body.location).then(function(response){
    res.render('index', {title: 'Places', data: response});
  })
  
}


exports.rsvp_post = function(req, res){
 res.send('NOT IMPLEMENTED')
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