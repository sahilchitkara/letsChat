/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var location = require('./routes/location');
var http = require('http');
var path = require('path')
  , mongoose = require('mongoose')
  , oauth = require('./routes/oauth.js')
app = express();

// all environments
app.set('port',process.env.PORT || 8080);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname,'public')));


// development only
if('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// db connection
if(app.get('env')=='production'){
  mongoose.connect('mongo novus.modulusmongo.net:27017/ho2qyxyM -u sahil -p sahil',function(err) {
    if(err) throw err;
    console.log('db connected: ' + ' modulusmongo chatRoomDB');
  });
}else{
  mongoose.connect('mongodb://localhost/chatRoom',function(err) {
    if(err) throw err;
    console.log('db connected: ' + 'chatRoomDB');
  });
}



//routes url
app.get('/',routes.index);
app.get('/users',user.list);
app.get('/get/locations',location.listLocations);
app.post('/login',location.createLocation,user.login);




//server listen
var server = http.createServer(app).listen(app.get('port'),function() {
  console.log('Express server listening on port ' + app.get('port'));
});

//socket listen
var io = require('socket.io').listen(server);
global.io = io;
require("./socket/socketIo")();

