var yelp = require('./yelpGet');
var User = require('../models/user.js');
var Place = require('../models/place.js');
var async = require('async');



//stores data from yelp API based on latest search
var latestSearch;


function saveCheck(i, response, location){
  return new Promise( function(resolve, reject){
    Place.find({name: response[i].name}).exec(function(err, res){
      if(err) return next(err);
      //console.log('iteration: ' + i + ' name: ' + response[i].name + ' res: ' + JSON.stringify(res));
      if(res==null||JSON.stringify(res)=='[]'){
        var place = new Place({name: response[i].name, picture: response[i].image_url, 
          description: response[i].description, closed: response[i].is_closed, url: response[i].url, 
          rating: response[i].rating, phone: response[i].display_phone, location: location});
        place.save(function(err){
          if(err) console.log(err);
          if(i<response.length-1){
            i++
            saveCheck(i, response, location)
          }  else {
          resolve('success')
          }
        })
      } else if(i<response.length-1){
        //console.log('not');
        i++
        saveCheck(i, response, location)
      } else {
        resolve('success') }
    })
  })
}

exports.index_get = function(req, res){
 res.render('index', {title: 'Places'});
}

exports.search_post = function(req, res){
    yelp(req.body.location).then(function(response){
        saveCheck(0, response, req.body.location);
      }).then(function(){
        Place.find({location: req.body.location}).exec(function(err, results){
          if(err) next(err)
          console.log('ey');
          res.render('index', {title: 'Places', data: results});
      })
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