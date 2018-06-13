var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
//var cookieParser = require('cookie-parser'); //not necessary with express-session module
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var app = express();

//connect to db

mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASS}@ds129156.mlab.com:29156/todoed`);

mongoose.connection.once('open', function(){
	console.log("Connection made. Now for fireworks... ");
}).on("error", function(error){
	console.log("Connection error: " + error);
})

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

//routes
var place = require('./routes/place');;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser()); not in use due to express-session
app.use(express.static(path.join(__dirname, 'public')));




//routes
app.use('/', place);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
