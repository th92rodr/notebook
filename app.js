const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./routes/index');

// initialize an express app
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/', routes);

require('./database').connect();

module.exports = app;
