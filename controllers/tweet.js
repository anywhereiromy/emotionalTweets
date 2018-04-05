
const https = require('https');
const request = require('superagent');
const keys = require('../config/config.js');
const Twit = require('twit');
const fs = require('fs');
const express = require('express')();

let T = new Twit({
    consumer_key:         `${keys.consumerKey}`,
    consumer_secret:      `${keys.consumerSecret}`,
    app_only_auth:        `${keys.appOnlyAuth}`
})

exports.getTweets = (handle, cb) => {
    T.get('statuses/user_timeline', { screen_name: `${handle}`, count: 50 }, (err, data, res) => {
        if (!Array.isArray(data)) {
          console.log('OMG YOU KILLED KENNY');
          name = 'OMG YOU KILLED KENNY'; 
          video = 'https://www.youtube.com/embed/MRKuLB8Oq_k'; 
          background = 'https://www.youtube.com/embed/MRKuLB8Oq_k'; 
          res.render(`main.ejs`, { name: name, video: video, background: background, error: err });
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



