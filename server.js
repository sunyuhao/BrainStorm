var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
var authenticationRouter = require('./server/routers/authentication-router');
var profileRouter = require('./server/routers/profile-router');
var stormRouter = require('./server/routers/storm-router');
var usersRouter = require('./server/routers/users-router');

mongoose.connect('mongodb://localhost:27017/brain_storm');

app.use(bodyParser.json());
app.use(multipartMiddleware);
app.use('/app', express.static(__dirname + "/app" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));



app.get('/', function(req, res){
    res.sendfile('index.html');
});

//Authentication
app.post('/api/user/signup', authenticationRouter.signup);
app.post('/api/user/login', authenticationRouter.login);

//Profile
app.post('/api/profile/editPhoto', multipartMiddleware, profileRouter.updatePhoto);
app.post('/api/profile/updateUsername', profileRouter.updateUsername);

//storm
app.post('/api/storm/post', stormRouter.postStorm);
app.post('/api/storm/get', stormRouter.getStorms);

//User
app.get('/api/users/get', usersRouter.getUsers);
app.post('/api/users/follow', usersRouter.followUser);
app.put('/api/users/unfollow', usersRouter.unfollowUser);

app.listen('4000', function (){
    console.log("Listening for Local Host 4000");
});