const userController = require('../controllers/user');

module.exports = app => {
  app.get('/user/me', userController.getUserProfile);
};
