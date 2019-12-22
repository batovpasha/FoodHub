const express = require('express');

const auth = require('../middlewares/auth');
const { getUserById } = require('../db/db');

const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(auth);

userRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;
  getUserById(userId)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
});

module.exports = userRouter;
