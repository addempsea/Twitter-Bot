var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
var fs = require('fs');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var Twit = require("twit");
var config = require('./configr');
var T = new Twit(config);

var stream = T.stream('statuses/filter', { track: '#ThisIsUs', language: 'en' })
var tweets = []

 
stream.on('tweet', function (tweet) {
    tweets.unshift(tweet)
    console.log(tweet)
})


// var sanFrancisco = [ '6.418', '2.288', '6.598', '4.276' ]
 
// var stream = T.stream('statuses/filter', { locations: sanFrancisco })
 
// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })

// function getBoundsFromLatLng(lat, lng){
//     var lat_change = 10/111.2;
//     var lon_change = Math.abs(Math.cos(lat*(Math.PI/180)));
//     var bounds = { 
//         lat_min : lat - lat_change,
//         lon_min : lng - lon_change,
//         lat_max : lat + lat_change,
//         lon_max : lng + lon_change
//     };
//     return console.log(bounds);
//     ;
// }

// getBoundsFromLatLng(6.508, 3.282)