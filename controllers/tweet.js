
const https = require('https');
const request = require('superagent');
const keys = require('../config/config.js');
const Twit = require('twit');
const fs = require('fs');

let T = new Twit({
    consumer_key:         `${keys.consumerKey}`,
    consumer_secret:      `${keys.consumerSecret}`,
    app_only_auth:        `${keys.appOnlyAuth}`
})

exports.getTweets = (handle, cb) => {
    T.get('statuses/user_timeline', { screen_name: `${handle}`, count: 50 }, (err, data, resp) => {
        if (!Array.isArray(data)) return console.log('Error'); 
        const tweetsArray = [];
        let tweets = data.map(obj => obj.text);
        tweets.forEach((tweet, index) => {
            tweetsArray[index] = tweet;
        });
        cb(null, tweetsArray);
    }); 
}



