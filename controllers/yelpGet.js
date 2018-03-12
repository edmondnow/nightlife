
const yelp = require('yelp-fusion');
const apiKey = 'qyoF32XH4f4hWFL0qRXC1ARf4f5013W8flPy6hIRYnL1Z3myvqQqIgzDcCVIpshmpy9sLGjnUxsOjAE4zPjXonA4a8T7nhhPuUnOu2Vm-RYxYZrlmkrQAn3xJgqUWnYx'
const client = yelp.client(apiKey);
var results = [];

var yelpGet = function (location){
	return new Promise(function(resolve, reject){
		client.search({
			location: location
		}).then(data => {
      data = data.jsonBody.businesses
      for(var i = 0; i < data.length; i++){
        var place = {
          name: data[i].name,
          description: data[i].description,
          picture: data[i].image_url,
          rating: data[i].rating,
          phone: data[i].display_phone,
          url: data[i].url,
          location: location,
          users: []
        }
        results.push(place);
      }
			resolve(results);
		}).catch(e => {
			reject(e)
		})
	});
}

module.exports = yelpGet;