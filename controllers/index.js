const PersonalityInsights = require('watson-developer-cloud/personality-insights/v3');
const { username, password } = require('../config');
const fs = require('fs');
const { getTweets } = require('./tweet');

const pi = new PersonalityInsights({
  username,
  password,
  version_date: '2017-12-12',
});

exports.getPersonalityInsight = (req, res, next) => {
    // document.getElementById("GET-name").value;
    const { handle } = req.params; 
    console.log(handle);
  getTweets(handle, (err, tweetsArray) => {
    const tweetString = tweetsArray.join();
    pi.profile(
      {
        content: tweetString,
        content_type: 'text/plain',
      },
      (err, watsonData) => {
        if (err) {
            console.log('OMG YOU KILLED KENNY');
            name = 'OMG YOU KILLED KENNY'; 
            video = 'https://www.youtube.com/embed/MRKuLB8Oq_k'; 
            background = '../images/kenny.png'; 
            res.render(`character.ejs`, { name: name, video: video, background: background, error: err });
            next(err);
        } else { 
          const number = watsonData.personality[2].percentile;
          let name = '';
          if (number >= 0.9) { name = 'Cartman', video = 'https://www.youtube.com/embed/bqlplW3iYB0?autoplay=1' }
          else if (number >= 0.8) { name = 'Chef', video = 'https://www.youtube.com/embed/dpqShViVL_Y?autoplay=1' }
          else if (number >= 0.7) { name = 'Mr Garrison', video = 'https://www.youtube.com/embed/9a_3wQHcm_Y?autoplay=1' }
          else if (number >= 0.55) { name = 'Kyle', video = 'https://www.youtube.com/embed/zkcNLtn2gtk?autoplay=1' } // https://www.youtube.com/watch?v=w3EfCyi2vmY
          else if (number >= 0.35) { name = 'Wendy', video = 'https://www.youtube.com/embed/ahg3lwjrRtA?autoplay=1' }
          else if (number >= 0.2) { name = 'Mr Hankey', video = 'https://www.youtube.com/embed/21EA2F3Y8Lk?autoplay=1' }
          else if (number >= 0.0) { name = 'Kenny', video = 'https://www.youtube.com/embed/qYUl9Mzq3BE?autoplay=1' }; // , video: 'https://www.youtube.com/watch?v=qYUl9Mzq3BE' 
          res.render(`character.ejs`, { name: name, video: video, handle: handle }); //need to use view engine to render anything. ejs. takes second argument too
        }
      }
    );
  });
};

exports.getHomePage = (req, res, next) => {
    res.render(`main.ejs`);
}

// module.exports = { getPersonalityInsight, getHomePage };

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
