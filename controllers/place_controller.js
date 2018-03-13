var yelp = require('./yelpGet');
var User = require('../models/user.js');
var Place = require('../models/place.js');
var async = require('async');


exports.index_get = function(req, res){
	if(req.session.userId){
		User.findOne({_id: req.session.userId}).exec(function(err, results){
			if(err) return console.log(err)
			res.render('index', {title: 'Places', session: true, username: results.username, error: false});

		})
	}

 res.render('index', {title: 'Places', error: false});
}



exports.search_post = function(req, res){
	//return data from the yelp api with query string
	yelp(req.body.location).then(function(response){
		//save query string as latest search cookie
		req.session.latest = req.body.location;
		//find if data is already presend in the database
		Place.find({location: req.body.location}).exec(function(err, locationres){
			if(err) console.log(err)
			//if data is not present add response to database
			if(locationres==null||JSON.stringify(locationres)=='[]'){
				Place.collection.insert(response, function(err, dbres){
					if(err) return console.log(err);
					//if there is no data to be displayed search for UserId
					if(locationres==null||JSON.stringify(dbres)=='[]'){
						if(req.session.userId){
							User.findById({_id: req.session.userId}).exec(function(err, userData){
								res.render('index', {title: 'Places', data: [{name: 'No results for this location'}], username: userData.username,
								error: false});
							})
						} else {
							res.render('index', {title: 'Places', data: dbRes, error: false})
						}
					}

				})
			//if data is present in the database display the data
			} else {
				if(req.session.userId){
					//if the user has a session display user information
					User.findById({_id: req.session.userId}).exec(function(err, userData){
							res.render('index', {title: 'Places', data: locationres, username: userData.username,
							error: false});
						})
				//if the user has no session display user information
				} else {
					res.render('index', {title: 'Places', data: locationres, error: false});
				}		
			}
		})
	})
}

exports.rsvp_yes = function(req, res){
	Place.findOneAndUpdate({_id: req.body._id}, { $push: { users: "5aa2b4733fa807079042614d" }}).exec(function(err, results){
		if (err) console.log(err);
		Place.find({location: req.body.location}).exec(function(err, results){
			res.render('index', {title: 'Places', data: results, error: false});
		})
	})
}

exports.rsvp_no = function(req, res){
	Place.findOneAndUpdate({_id: req.body._id}, { $pull: { users: "5aa2b4733fa807079042614d" }}).exec(function(err, results){
		if (err) console.log(err);
		Place.find({location: req.body.location}).exec(function(err, results){
			res.render('index', {title: 'Places', data: results, error: false});
		})
	})
}

exports.register_post = function(req, res){
	if(req.body.password !== req.body.passwordConf){
		var err = new Error('Passwords do not match.');
		err.status = 400;
		res.render('index', {title: 'Places', session: false, error: {type: 'register', error: err}});
		return next(err);
	}

	if (req.body.email &&
		req.body.username &&
		req.body.password &&
		req.body.passwordConf) {

		var userData = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			passwordConf: req.body.passwordConf,
		}
		//use schema.create to insert data into the db
		User.create(userData, function (err, user) {
			if (err) {
				return console.log(err);
			} else {
				req.session.userId = user._id;
				User.findById({_id: req.session.userId}).exec(function(err, userData){
					if(err) console.log(err)
					if(req.session.latest){
						Place.find({location: req.session.latest}).exec(function(err, placeData){
							res.render('index', {title: 'Places', session: true, data: placeData, username: userData.username, error: false});
						})
					} else {
							res.render('index', {title: 'Places', session: true, username: userData.username, error: false});
					}
				})
			}
		});
	}
}

exports.login_post = function(req, res){
 
	if (req.body.email &&
		req.body.password) {
		//use schema.create to insert data into the db
		User.authenticate(req.body.email, req.body.password, function(err, user){
			if(err || !user){
				var err = new Error('Wrong email or password');
				err.status = 401;
				res.render('index', {title: 'Places', session: false, error: {type: 'login', error: err}});
			} else {
				req.session.userId = user._id;
				User.findById({_id: req.session.userId}).exec(function(err, userData){
					if(err) console.log(err)
					if(req.session.latest){
						Place.find({location: req.session.latest}).exec(function(err, placeData){
							res.render('index', {title: 'Places', session: true, data: placeData, username: userData.username, error: false});
						})
					} else {
							res.render('index', {title: 'Places', session: true, username: userData.username, error: false});
					}
				})
			}
		})
	}
}

exports.logout_post = function(req, res){
 // GET /logout
	if (req.session) {
		// delete session object
		req.session.destroy(function(err) {
			if(err) {
				return next(err);
			} else {
				return res.render('index', {title: 'Places'});
			}
		});
	}

}