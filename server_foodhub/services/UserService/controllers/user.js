'use strict';

const { getUserById } = require('../db/db');

function getUserProfile(req, res) {
  const { userId } = req.body;

  getUserById(userId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => { 
      console.error(error);

      res.status(500).json({ error });
    });
}

module.exports = {
  getUserProfile,
};
