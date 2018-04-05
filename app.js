const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');

app.use(bodyParser.json());
app.use('/api', apiRouter);



app.post('/personality', getPersonalityInsight);

module.exports = app;