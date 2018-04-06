
const https = require('https');
const request = require('superagent');
const Twit = require('twit');
const fs = require('fs');
const express = require('express')();

if (process.env.consumer_key === undefined) {
    const keys = require('../config/config.js');
    process.env.consumer_key = `${keys.consumerKey}`;
    process.env.consumer_secret = `${keys.consumerSecret}`;
    process.env.app_only_auth = `${keys.appOnlyAuth}`;
}

let T = new Twit({
    consumer_key:         process.env.consumer_key,
    consumer_secret:     process.env.consumer_secret,
    app_only_auth:        process.env.app_only_auth
})

exports.getTweets = (handle, cb) => {
    T.get('statuses/user_timeline', { screen_name: `${handle}`, count: 50 }, (err, data, res) => {
        if (!Array.isArray(data)) {
          name = 'OMG YOU KILLED KENNY'; 
          video = 'https://www.youtube.com/embed/MRKuLB8Oq_k'; 
          background = 'https://www.youtube.com/embed/MRKuLB8Oq_k'; 
          cb('not');
        } else {
            const tweetsArray = [];
            let tweets = data.map(obj => obj.text);
            tweets.forEach((tweet, index) => {
                tweetsArray[index] = tweet;
            });
            cb(null, tweetsArray);
        };
    }); 
}



