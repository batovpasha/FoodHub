const fetch = require('node-fetch');

module.exports = async (req, res, next) => {
  // Retrieve Authorization header value from request
  const authorization = req.get('Authorization');

  const response = await fetch(
    `${env.services.AUTH_SERVICE_URL}/auth/tokenInfo`,
    {
      method: 'GET',
      headers: {
        Authorization: authorization,
      },
    }
  );

  if (response.status === 200) {
    // Retrieve user id from response
    const { id } = await response.json();
    // Set user id to request body
    req.body.userId = id;
    next();
  } else {
    res.sendStatus(response.status);
  }
};
