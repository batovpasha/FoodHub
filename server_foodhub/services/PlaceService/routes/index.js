const multer = require('multer');
const auth = require('../middleware/auth');

const upload = multer({
  fileFilter(req, file, cb) {
    const regexp = /\.(png|jpg)$/g;
    if (!regexp.test(file.originalname)) {
      const err = new Error('Please send only a PNG or JPEG files!');
      return cb(err);
    }
    cb(undefined, true);
  },
});

const placeController = require('../controllers/place');

module.exports = app => {
  app.post(
    '/place/add',
    upload.single('placeImage'),
    auth,
    placeController.addPlace
  );
  app.delete('/place/delete', auth, placeController.deletePlace);
  app.get('/place/list', auth, placeController.getPlaceList);
  app.get('/place/image', placeController.getPlaceImage);

  app.post(
    '/place/product/add',
    upload.single('productImage'),
    auth,
    placeController.addProduct
  );

  app.get('/place/product/list', auth, placeController.getProductList);
  app.delete('/place/product/delete', auth, placeController.deleteProduct);
  app.get('/place/product/image', placeController.getProductImage);
};
