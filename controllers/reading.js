const fs = require('fs');

fs.readdir(`../southParkCharacterData`, (err, arrayOfFileNames)=> {
    const result = [];
    arrayOfFileNames.forEach((nameOfFile) => {
        fs.readFile(`../southParkCharacterData/${nameOfFile}`, (err, data)=> {
            if (err) { console.log()}
            const newData = JSON.parse(data);
                let a = newData.personality[2].name;
                let b = newData.personality[2].percentile;
                result.push({ [nameOfFile]: { name: a, percentile: b } });
            console.log(result);
        })
    })
})


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