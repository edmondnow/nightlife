var router = require('express').Router();
var yelpGet = require('../controllers/yelp.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//yelpGet('Tilburg').then(data => console.log(data));

module.exports = router;
