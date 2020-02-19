
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');

var Twit = require("twit");

var config = require('./configr');


var T = new Twit(config);

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var express = require('express');

function demo () {
    request('https://type.fit/api/quotes', { json: true }, function (err, res, body) {
        if (err) { return console.log(err); }
        
        var min = 1; 
        var max = 1643;  
        var r = Math.floor(Math.random() * (max - min)) + min;
        

        function tweetIt() {
            var tweet = {
                status: body[r].text + " - " + body[r].author
            };

            T.post('statuses/update', tweet, tweeted);

            function tweeted(err, data, response) {
                if (err) {
                    console.log('something went wrong');
                } else {
                    console.log('Tweet sent');
                }
            }
        }

        return tweetIt();
    });
}

demo();
setInterval(demo, 1000*60*60);
