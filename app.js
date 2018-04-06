const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const ejs = require('ejs');
const express = require('express');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
    next({ status: 404 });
});

app.use((err, req, res, next) => {
    if (err.status === 404) res.render(`character.ejs`, { name: name, video: video });
    else next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 500) res.render(`character.ejs`, { name: name, video: video });
    else next(err);
});

module.exports = app;
