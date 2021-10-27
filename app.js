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

function tweeted(error, data, response) {
  if (error) {
    console.log(error.twitterReply);
    console.log("something went wrong");
  } else {
    console.log("Tweet sent");
  }
}

function postQuotes() {
  request(
    "https://zenquotes.io/api/random",
    { json: true },
    function (err, res, [body]) {
      if (err) {
        return console.log(err);
      }

      function tweetIt() {
        const tweet = {
          status: body.q + " - " + `${body.a || "Unknown"}`,
        };
        if (body) {
          T.post("statuses/update", tweet, tweeted);
        } else {
          console.log("no quote found");
        }
      }
      return tweetIt();
    }
  );
}

postQuotes();
setInterval(postQuotes, 1000 * 60 * 60);
