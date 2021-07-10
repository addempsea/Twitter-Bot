const Twit = require("twit");
const dotenv = require("dotenv");
const request = require("request");

dotenv.config();
const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

function postQuotes() {
  request("https://type.fit/api/quotes", { json: true }, function (
    err,
    res,
    body
  ) {
    if (err) {
      return console.log(err);
    }

    const min = 1;
    const max = 1643;
    const r = Math.floor(Math.random() * (max - min)) + min;

    function tweetIt() {
      const tweet = {
        status: body[r].text + " - " + body[r].author,
      };
      T.post("statuses/update", tweet, tweeted);

      function tweeted(err, data, response) {
        if (err) {
          console.log(err.twitterReply);
          console.log("something went wrong");
        } else {
          tweetIt();
          console.log("Tweet sent");
        }
      }
    }
    return tweetIt();
  });
}

postQuotes();
setInterval(postQuotes, 1000 * 60 * 60);

