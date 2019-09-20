const express = require('express');
const routes = require('./routes/index');

// initialize an express app
const app = express();

app.use('/', routes);

module.exports = app;