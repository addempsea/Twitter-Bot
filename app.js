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
      const author = body[r].author ? body[r].author : 'unknown';
      const tweet = {
        status: body[r].text + " - " + author,
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

// const stream = T.stream("statuses/filter", {
//   track: [
//     "#rustlang",
//     "javascript",
//     "nodejs",
//     "#javascript",
//     "#js",
//     "#vuejs",
//     "#vue",
//   ],
//   language: "en",
// });

// function retweet(tweet) {
//   try {
//     T.post("statuses/retweet/:id", { id: tweet.id_str }, function (e, data, response) {
//       if (e) {
//         console.log(e.twitterReply);
//         console.log("something went wrong");
//       } else {
//         console.log("retweeted");
//       }
//     });
//   } catch (e) {
//     console.log(e);
//   }
// }

// stream.on("tweet", function (tweet) {
//   retweet(tweet);
// });

