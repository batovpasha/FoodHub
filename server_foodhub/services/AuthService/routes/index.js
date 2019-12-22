'use strict';

const authController = require('../controllers/auth');
const userController = require('../controllers/user');

module.exports = app => {
  app.post('/auth/signUp', authController.signUp);
  app.post('/auth/signIn', authController.signIn);
  app.get('/auth/tokenInfo', authController.tokenInfo);
  app.post('/auth/changePassword', authController.changePassword);

  app.use('/user', userController);
};
