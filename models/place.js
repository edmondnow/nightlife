var mongoose = require('mongoose');

var Schema = mongoose.Schema

var PlaceSchema = new Schema({
  picture: String,
  name: {type: String, required: true},
  description: String,
  users: [{type: Schema.ObjectId, ref: 'User'}],
});

var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;