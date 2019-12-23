const fetch = require('node-fetch');

const {
  insertPlace,
  getAllPlaces,
  getImage,
  removePlace,
  insertProduct,
  getAllProducts,
} = require('../db/db');

async function addPlace(req, res) {
  const { placeName, description, address, userId } = req.body;
  const { file } = req;

  const response = await fetch(`${env.services.USER_SERVICE_URL}/user/me`, {
    method: 'GET',
    headers: {
      Authorization: req.get('Authorization'),
    },
  });

  if (response.status === 200) {
    const user = await response.json();

    if (user.role === 'producer') {
      insertPlace(placeName, description, userId, file.buffer, address)
        .then(() => res.status(201).end())
        .catch(error => {
          console.error(error);
          res.status(500).json({ error });
        });
    } else {
      res
        .status(403)
        .json({ error: 'User must be a producer to add a place!' });
    }
  } else {
    console.error('Error with user service');
    res.sendStatus(500);
  }
}

function getPlaceList(req, res) {
  getAllPlaces()
    .then(places => res.status(200).json(places))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
}

function getPlaceImage(req, res) {
  const { id } = req.query;

  if (id) {
    getImage(id)
      .then(image => {
        if (image) {
          res.end(image);
        } else {
          res.status(404).end();
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).end();
      });
  } else {
    res.status(404).end();
  }
}

function deletePlace(req, res) {
  const { userId } = req.body;
  const { id: placeId } = req.query;

  removePlace(userId, placeId)
    .then(() => res.status(200).end())
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
}

async function addProduct(req, res) {
  const { placeId, productName, description, price, userId } = req.body;
  const { file } = req;

  const response = await fetch(`${env.services.USER_SERVICE_URL}/user/me`, {
    method: 'GET',
    headers: {
      Authorization: req.get('Authorization'),
    },
  });

  if (response.status === 200) {
    const user = await response.json();

    if (user.role === 'producer') {
      const allPlaces = await getAllPlaces();
      const currentPlace = allPlaces.find(
        place => place.id === parseInt(placeId)
      );

      if (!currentPlace) {
        res.sendStatus(404);
        return;
      }

      const currentUserIsOwnerOfCurrentPlace = currentPlace.owner_id === userId;

      if (currentUserIsOwnerOfCurrentPlace) {
        insertProduct(
          productName,
          description,
          parseFloat(price),
          placeId,
          file.buffer
        )
          .then(() => res.status(201).end())
          .catch(error => {
            console.error(error);
            res.status(500).json({ error });
          });
      } else {
        res
          .status(403)
          .json({ error: 'User is not an owner of current place!' });
      }
    } else {
      res
        .status(403)
        .json({ error: 'User must be a producer to add a product!' });
    }
  } else {
    console.error('Error with user service');
    res.sendStatus(500);
  }
}

function getProductList(req, res) {
  getAllProducts()
    .then(products => res.status(200).json(products))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
}

module.exports = {
  addPlace,
  getPlaceList,
  getPlaceImage,
  deletePlace,
  addProduct,
  getProductList,
};
