const express = require('express');

const port = 3000;
const handlers = require('./controllers');

let environment = process.env.NODE_ENV || 'development';
const config = require('./config/config');
const database = require('./config/database.config');

let app = express();

database(config[environment]);
require('./config/express')(app, config[environment]);
require('./config/routes')(app);
require('./config/passport')();

app.listen(port);