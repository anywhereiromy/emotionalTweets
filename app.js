const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const ejs = require('ejs');
const express = require('express');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/api', apiRouter);

module.exports = app;
