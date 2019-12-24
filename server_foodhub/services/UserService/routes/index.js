const userController = require('../controllers/user');

const auth = require('../middleware/auth');

module.exports = app => {
  app.get('/user/me', auth, userController.getUserProfile);
  app.put('/user/changeRole', auth, userController.changeUserRole);
};
