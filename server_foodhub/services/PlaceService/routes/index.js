const multer = require('multer');
const auth = require('../middleware/auth');

const upload = multer({
  fileFilter(req, file, cb) {
    const regexp = /\.(pdf|jpg)$/g;
    if (!regexp.test(file.originalname)) {
      const err = new Error('Please send only a PDF or JPEG files!');
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

  app.get('/place/list', auth, placeController.getPlaceList);
  app.get('/place/image', placeController.getPlaceImage);
};
