const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  const authorization = req.header('Authorization');

  if (authorization) {
    // Retrieve token from Authorization header
    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, env.token.SECRET, err => {
      if (err) {
        res.status(401).json({ error: 'Forbidden. Invalid token!' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Forbidden. Missing token!' });
  }
};
