var mongoose = require('mongoose');

var Schema = mongoose.Schema

var PlaceSchema = new Schema({
  picture: String,
  name: {type: String, required: true},
  description: String,
  users: [{type: Schema.ObjectId, ref: 'User'}],
  url: String,
  rating: Number,
  phone: String,
  location: String
});

PlaceSchema
.virtual('count')
.get(function () {
  return this.users.length;
});



module.exports = mongoose.model('Place', PlaceSchema);