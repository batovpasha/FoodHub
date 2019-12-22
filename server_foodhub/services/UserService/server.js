'use strict';

const express = require('express');
const dotenv = require('dotenv');

// Middleware
const cors = require('cors');
const auth = require('./middleware/auth');

// Load all environment variables from .env file to process.env
dotenv.config();

// Mount all configs into global.env object
global.env = {
  db: require('./config/db'),
  server: require('./config/server'),
  services: require('./config/services'),
};

const mountRoutes = require('./routes/index');

// Create new Express app instance
const app = express();

// Configure CORS
app.use(cors());

// Setup middleware
app.use(express.json());
app.use(auth);

// Setup routes
mountRoutes(app);

const SERVER_URL = `${env.server.PROTOCOL}://${env.server.HOST}:${env.server.PORT}`;

app.listen(env.server.PORT, env.server.HOST, () => {
  console.log(`Server starts at ${SERVER_URL}`);
});

// Exports app instance for testing
module.exports = app;
