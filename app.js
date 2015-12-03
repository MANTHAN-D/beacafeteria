var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('client-sessions');

var routes = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var order = require('./routes/order');
var dailyDeals = require('./routes/dailyDeals');
var menuContent = require('./routes/menuContent');
var counter = require('./routes/counter');

var admin = require('./routes/admin')
// var counter_configuration_node = require('./routes/counter_configuration_node');

//Server_Api key : AIzaSyDSX_kN3bRgdZH3HTcPdcRKEe3ZEUWu_SI
//sender_id : 671150531291

var app = express(); 

// view engine setup
//app.set('port', process.env.PORT || 3000);
app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({   
    
  cookieName: 'session',    
  secret: 'cmpe273_test_string',    
  duration: 30 * 60 * 1000,    
  activeDuration: 5 * 60 * 1000,  })
);

app.use('/', routes);
app.use('/login', login);
app.use('/register', register);
app.use('/order', order);
app.use('/dailydeals', dailyDeals);
app.use('/menucontent', menuContent);
app.use('/counter', counter);
app.use('/admin',admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // next(err);
  res.render('error', { title: 'Error Page' });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
app.listen(app.get('port'), function(){
  console.log('Login server listening on port ' + app.get('port'));
});
