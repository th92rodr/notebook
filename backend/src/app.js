const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');

require('./database/').connect();
require('./redis');

const cors = require('./middlewares/cors');
const checkAuthentication = require('./middlewares/authentication');
const { logger } = require('./middlewares/logger');

const routes = require('./routes/');

const app = express();

app.use(helmet());

// Add a parser for JSON format requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// MIDDLEWARES
app.use(cors);
app.use(checkAuthentication);
app.use(logger);

app.use('/', routes);

module.exports = app;
