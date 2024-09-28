const { Account } = require('../models/account.models');
const { ApiResponse } = require('../utils/apiResponse');

const accountMiddleware = async function (req, res, next) {
  try {
    const account = await Account.findOne({ user: req.userId });
    // checking if user has proper account or not.
    if (!account) {
      return res
      .status(403)
      .json(new ApiResponse(403, 'Sender have no account', ''));
    } else {
      // if get the valid account user, then call the next middleware.
      next();
    }
  } catch (err) {
    console.error(
      `Error while getting data from db in account validation middleware: ${err}`
    );
    res.status(500).json(new ApiResponse(500, 'Error with db', ''));
  }
};

module.exports = { accountMiddleware };
