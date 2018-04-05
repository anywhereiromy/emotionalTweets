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
  const { handle } = req.params;
  getTweets(handle, (err, tweetsArray) => {
    const tweetString = tweetsArray.join();
    pi.profile(
      {
        content: tweetString,
        content_type: 'text/plain',
      },
      (err, watsonData) => {
        if (err) {
          name = 'Kenny error';

          console.log(name);
          res.send(name);
          next(err);
        } else {
          const charactersObject = {
            Cartman: 0.9,
            Chef: 0.8,
            MrGarrison: 0.7,
            Kyle: 0.6,
            Wendy: 0.4,
            MrHankey: 0.3,
            Kenny: 0,
          };
          const number = watsonData.personality[2].percentile;
          let name = '';
          console.log(number);

          if (number >= 0.9) name = 'Cartman';
          else if (number >= 0.8) name = 'Chef';
          else if (number >= 0.7) name = 'Mr Garrison';
          else if (number >= 0.55) name = 'Kyle';
          else if (number >= 0.35) name = 'Wendy';
          else if (number >= 0.2) name = 'Mr Hankey';
          else if (number >= 0.0) name = 'Kenny';
          console.log(name);

          res.render(`kenny.ejs`, { name: name }); //need to use view engine to render anything. ejs. takes second argument too
        }
      }
    );
  });
};

// const getCharacter = (number) => {
//   const charactersObject = {
//     Cartman: 0.9,
//     Chef: 0.8,
//     MrGarrison: 0.7,
//     Kyle: 0.6,
//     Wendy: 0.4,
//     MrHankey: 0.3,
//   };

//   getPersonalityInsight(req, res, next)
//     .then(data => JSON.parse(data).personality[2].percentile)
//     .then(number => {});
//   //     if (err) return cb(err);
//   //     // console.log(JSON.parse(data).personality[2].percentile);
//   //     const result = JSON.parse(data).personality[2].percentile;
//   //   });
// };
// getCharacter({ params: 'RomyLucy' });

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
