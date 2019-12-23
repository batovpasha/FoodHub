const fetch = require('node-fetch');

const { insertPlace, getAllPlaces } = require('../db/db');

async function addPlace(req, res) {
  const { placeName, description, address, userId } = req.body;
  const { file } = req;

  const response = await fetch(`${env.services.USER_SERVICE_URL}/user/me`, {
    method: 'GET',
    headers: {
      Authorization: req.get('Authorization'),
    },
  });

  console.log(`${env.services.USER_SERVICE_URL}/user/me`);

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

async function getPlaceList(req, res) {
  getAllPlaces()
    .then(places => res.status(200).json(places))
    .catch(error => {
      console.error(error); 
      res.status(500).json({ error });
    });
}

module.exports = {
  addPlace,
  getPlaceList,
};
