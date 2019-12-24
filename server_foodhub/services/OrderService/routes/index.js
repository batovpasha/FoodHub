const auth = require('../middleware/auth');

const orderController = require('../controllers/order');

module.exports = app => {
  app.post('/order/add', auth, orderController.addOrder);
  app.get('/order/list/customer', auth, orderController.getOrdersByCustomer);
};
