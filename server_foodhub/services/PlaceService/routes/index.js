const placeController = require('../controllers/place');

module.exports = app => {
  app.post('/place/add', placeController.addPlace);
};
