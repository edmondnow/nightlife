var Place = require('../models/place.js');

console.log('booo')
Place.find({}, function(res){
  console.log(res);
})