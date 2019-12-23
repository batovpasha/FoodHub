'use strict';

const { getUserById, updateUserRole } = require('../db/db');
const { isUserRoleValid } = require('../validation');

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

function changeUserRole(req, res) {
  const { userId, role } = req.body;
  const userRole = role && role.trim();

  if (!isUserRoleValid(userRole)) {
    return res.status(400).json({ error: 'Invalid user role!' });
  }

  updateUserRole(userId, userRole)
    .then(success => {
      if (success) {
        res.status(200).send();
      } else {
        res.status(404).json({ error: 'User for update not found!' });
      }
    })
    .catch(error => {
      console.error(error);

      res.status(500).json({ error });
    });
}

module.exports = {
  getUserProfile,
  changeUserRole,
};
