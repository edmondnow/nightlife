var router = require('express').Router();
var place_controller = require('../controllers/place_controller.js')



//get main page with default view
router.get('/', place_controller.index_get);

//get main page after search
router.post('/', place_controller.search_post);

//post rsvp data and return pug view with updated rsvp
router.post('/rsvp_no', place_controller.rsvp_no);

router.post('/rsvp_yes', place_controller.rsvp_yes);

//redirect too logged in page
router.post('/register', place_controller.register_post); 
//redirect to logged in page
router.post('/login', place_controller.login_post);

//redirect to logged out page
router.post('/logout', place_controller.logout_post);

//yelpGet('Tilburg').then(data => console.log(data));

module.exports = router;

