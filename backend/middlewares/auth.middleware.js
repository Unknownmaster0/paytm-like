const { ApiResponse } = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');

const authMiddlware = function (req, res, next) {
  // get the authorization token from the req.headers
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startswith('Bearer ')) {
    return res
      .status(404)
      .json(new ApiResponse(404, 'not valid authToken in authMiddleware', ''));
  }

  const token = authToken.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    if (payload) {
      req.userId = payload.id;
      next();
    } else {
      res.status(404).json(new ApiResponse(404, 'not valid token', ''));
    }
  } catch (err) {
    console.log(`error while decoding the payload in authMiddleware`);
    console.error(err);
    res.status(404).json(new ApiResponse(404, 'not valid token', ''));
  }
};

module.exports = {
  authMiddlware,
};
