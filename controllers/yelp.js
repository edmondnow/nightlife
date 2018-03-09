var express = require('express');
var router = express.Router();
const yelp = require('yelp-fusion');
const apiKey = 'qyoF32XH4f4hWFL0qRXC1ARf4f5013W8flPy6hIRYnL1Z3myvqQqIgzDcCVIpshmpy9sLGjnUxsOjAE4zPjXonA4a8T7nhhPuUnOu2Vm-RYxYZrlmkrQAn3xJgqUWnYx'
const client = yelp.client(apiKey);

var yelpGet = function(location){
	return new Promise(function(resolve, reject){
		client.search({
			location: location
		}).then(data => {
			resolve(data.jsonBody.businesses)
		}).catch(e => {
			reject(e)
		})
	});
}


module.exports = yelpGet;

yelpGet('Tilburg');