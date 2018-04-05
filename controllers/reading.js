const fs = require('fs');

// fs.readdir(`../southParkCharacterData`, (err, arrayOfFileNames)=> {
//     const result = [];
//     arrayOfFileNames.forEach((nameOfFile) => {
//         fs.readFile(`../southParkCharacterData/${nameOfFile}`, (err, data)=> {
//             if (err) { console.log()}
//             const newData = JSON.parse(data);
//             for (let i = 0; i < 5; i++) {
//                 let a = newData.personality[i].name;
//                 let b = newData.personality[i].percentile;
//                 result.push({ [nameOfFile]: { name: a, percentile: b } });
//             }
//             console.log(result);
//         })
//     })
// })

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