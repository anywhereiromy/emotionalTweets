const PersonalityInsights = require('watson-developer-cloud/personality-insights/v3');
const { username, password } = require('../config');
const fs = require('fs');
const { getTweets } = require('./tweet');

const pi = new PersonalityInsights({
    username,
    password,
    version_date: '2017-12-12'
});

exports.getPersonalityInsight = (req, res, next) => {
    const { handle } = req.params;
    getTweets(handle, (err, tweetsArray) => {
        const tweetString = tweetsArray.join();
        pi.profile({
            content: tweetString,
            content_type: 'text/plain'
        }, (err, watsonData) => {
            if(err) next(err);
            else res.send(JSON.stringify(watsonData));
        });
    });
}

exports.getCharacter = (number) => {
    
}

// fs.readdir(`../southParkCharacterData`, (err, arrayOfFileNames)=> {
//     arrayOfFileNames.forEach((nameOfFile) => {
//         fs.readFile(`../southParkCharacterData/${nameOfFile}`, (err, data)=> {
//             console.log(`${nameOfFile}`);
//             for (let i=0; i < 6; i++) {
//                 console.log(personality[i].name, personality[i].percentile);
//             }
//         })
//     })
// })
