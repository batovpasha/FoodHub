'use strict';

const http = require('http');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const mountRoutes = require('./routes/index');

// Load all environment variables from .env file to process.env
dotenv.config();

// Mount all configs into global.env object
global.env = {
  db: require('./config/db'),
  server: require('./config/server'),
  token: require('./config/token'),
};

// Create new Express app instance
const app = express();

// Configure CORS
app.use(cors());

// Setup middleware
app.use(express.json());

// Setup routes
mountRoutes(app);

const SERVER_URL = `${env.server.PROTOCOL}://${env.server.HOST}:${env.server.PORT}`;

// const server = http.createServer(app);

app.listen(env.server.PORT, env.server.HOST, () => {
  console.log(`Server starts at ${SERVER_URL}`);
});

// Exports app instance for testing
module.exports = app;
