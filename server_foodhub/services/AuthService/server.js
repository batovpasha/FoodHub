'use strict';

const express = require('express');
const dotenv = require('dotenv');

// Load all environment variables from .env file to process.env
dotenv.config();

// Mount all configs into global.env object
global.env = {
  db: require('./config/db.js'),
  server: require('./config/server.js'),
};

// Create new Express app instance
const app = express();

const SERVER_URL = `${env.server.PROTOCOL}://${env.server.HOST}:${env.server.PORT}`;

app.listen(env.server.PORT, env.server.HOST, () => {
  console.log(`Server starts at ${SERVER_URL}`);
});
