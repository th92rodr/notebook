const express = require('express');
const bodyparser = require('body-parser');

const routes = require('./routes/index');

// Initialize an express app
const app = express();

// Add a parser for JSON format requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Add routing
app.use('/', routes);

// Start connection to database 
require('./database').connect();

module.exports = app;
