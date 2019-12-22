'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const {
  createNewUser,
  setupNewPasswordForUser,
  getUserByEmail,
  getUserById,
  updateUserPassword,
} = require('../db/db');

async function signUp(req, res) {
  const { firstName, lastName, email, password } = req.body;

  const emailRegexp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  // Email validation
  if (!emailRegexp.test(email)) {
    res.status(400).json({ error: 'Invalid email!' });
    return;
  }

  const hashingRoundsNumber = 8; // number of hashing rounds in bcrypt algorithm
  const passwordHash = await bcrypt.hash(password, hashingRoundsNumber);

  createNewUser(firstName, lastName, email)
    .catch(err => {
      console.error(err);

      res.status(500);

      if (err.code === 'ER_DUP_ENTRY') {
        res.json({
          error: 'User with current email already exists!',
        });
      } else {
        res.json({
          error: err.toString(),
        });
      }
    })
    .then(user => setupNewPasswordForUser(user.insertId, passwordHash))
    .then(() => {
      // Set "Created" status code
      res.status(201);
      res.end();
    })
    .catch(err => {
      console.error(err);

      res.status(500);
      res.json({
        error: err.toString(),
      });
    });
}

async function signIn(req, res) {
  const { email, password } = req.body;

  getUserByEmail(email)
    .then(async user => {
      if (user) {
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
          // Generate token
          const token = jwt.sign(
            { id: user.id }, // token payload
            env.token.SECRET,
            { expiresIn: '1d' }
          );

          res.status(200).json({ token });
        } else {
          res.status(401).json({ error: 'Invalid password!' });
        }
      } else {
        res.status(404).json({ error: 'Invalid login!' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    });
}

function tokenInfo(req, res) {
  // Try to retrieve Authorization header value
  const authorization = req.get('Authorization');

  if (authorization) {
    // Retrieve token from Authorization header
    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, env.token.SECRET, (err, decode) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token!' });
      } else {
        // Send token payload in json response
        res.status(200).json(decode);
      }
    });
  } else {
    res.status(401).json({ error: 'Missing token!' });
  }
}

async function changePassword(req, res) {
  const authorization = req.get('Authorization');

  // Server url
  const url = `${env.server.PROTOCOL}://${env.server.HOST}:${env.server.PORT}`;

  // Make request to validate the token
  const response = await fetch(`${url}/auth/tokenInfo`, {
    method: 'GET',
    headers: {
      Authorization: authorization,
    },
  });

  if (response.status === 200) {
    // Retrieve user id from token payload
    const { id: userID } = await response.json();

    const { oldPassword, newPassword } = req.body;

    getUserById(userID)
      .then(async user => {
        if (user) {
          // Compare old user password with its hash in db
          const isMatch = await bcrypt.compare(oldPassword, user.password_hash);

          if (isMatch) {
            const hashingRoundsNumber = 8; // number of hashing rounds in bcrypt algorithm
            const newPasswordHash = await bcrypt.hash(
              newPassword,
              hashingRoundsNumber
            );

            updateUserPassword(userID, newPasswordHash)
              .then(() => {
                res
                  .status(200)
                  .json({ message: 'Password updated successfully' });
              })
              .catch(error => {
                console.error(error);
                res.status(500).json({ error });
              });
          } else {
            res.status(401).json({ error: 'Invalid password!' });
          }
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error });
      });
  } else {
    res.sendStatus(response.status);
  }
}

module.exports = {
  signUp,
  signIn,
  tokenInfo,
  changePassword,
};
