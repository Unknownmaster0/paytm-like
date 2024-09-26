const { ApiResponse } = require('../utils/apiResponse');
const { User } = require('../models/user.models');
const jwt = require('jsonwebtoken');
const { updateBodySchema } = require('../models/zod.input.validation');
const { Account } = require('../models/account.models');
const { getRandomBalance } = require('../utils/getRandomBalance');

const signInRoute = async function (req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, 'no such user exist', ''));
    }

    const validUser = await user.validateUser(password);
    if (!validUser) {
      return res
        .status(400)
        .json(new ApiResponse(400, 'incorrect-password', ''));
    }

    // if valid user then send the jwt token to him.
    const token = jwt.sign(
      { username, id: user._id },
      process.env.SECRET_TOKEN
    );

    return res
      .status(200)
      .json(new ApiResponse(200, 'successfully sigin', token));
  } catch (err) {
    console.error(`error while saving data to database in signup.`);
    return res
      .status(500)
      .json(new ApiResponse(500, 'internal server issue', ''));
  }
};

const signUpRoute = async function (req, res) {
  const { firstName, lastName, password, username } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json(new ApiResponse(400, 'Username already exists', ''));
    }

    const user = await User.create({ firstName, lastName, password, username });
    const balance = getRandomBalance();
    const account = await Account.create({ user: user._id, balance });

    const token = jwt.sign(
      { username, id: user._id },
      process.env.SECRET_TOKEN
    );

    return res.status(200).json(
      new ApiResponse(200, 'successfully sending user data', {
        username: user.username,
        balance: account.balance,
        token,
      })
    );
  } catch (err) {
    console.error(`error while saving data to database in signup.`);
    console.error(err);
    return res
      .status(500)
      .json(new ApiResponse(500, 'internal server issue', ''));
  }
};

const update = async function (req, res) {
  const { success } = updateBodySchema.safeParse(req.body);
  if (!success) {
    return res.status(404).json(new ApiResponse(404, 'invalid input', ''));
  }

  // now we need to update the user.
  const newUser = await User.updateOne({ _id: req.userId }, req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, 'User updated successfully', newUser));
};

// this is something, nice of finding the user with name either in their firstName or in lastName.
const bulk = async function (req, res) {
  const filter = req.params.filter || '';

  try {
    const users = await User.find({
      $or: [
        {
          firstName: { $regex: filter },
        },
        {
          lastName: { $regex: filter },
        },
      ],
    });

    const data = users.map((user) => ({
      username: user.username,
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));

    return res.status(200).json(new ApiResponse(200, 'success', data));
  } catch (err) {
    console.log(`error while getting data from db in bulk`);
    console.error(err);
    return res
      .status(500)
      .json(new ApiResponse(500, 'error while connection with db', ''));
  }
};

module.exports = {
  signInRoute,
  signUpRoute,
  update,
  bulk,
};
