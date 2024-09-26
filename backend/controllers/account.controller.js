const { ApiResponse } = require('../utils/apiResponse');
const { Account } = require('../models/account.models');
const mongoose = require('mongoose');

const balance = async function (req, res) {
  // when it come here, it means it is valid user and have every validation passed, then simply return the balance.
  const account = await Account.findOne({ user: req.userId });
  const balance = account.balance;
  res.status(200).json(new ApiResponse(200, 'success', balance));
};

const transfer = async function (req, res) {
  // wrap everything inside the transaction session, such that if the transaction will complete in one go or fail, not hung in between.

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // validate the toUser(receiver).
    const isValidReceiver = await validateReceiver(req.body.to, session);
    if (!isValidReceiver) {
      session.abortTransaction();
      return res
        .status(403)
        .json(new ApiResponse(403, 'User have no account', ''));
    }

    // get fromUser(sender) account
    const senderAccount = await Account.findOne({ user: req.userId }).session(
      session
    );
    const money = senderAccount.balance;
    console.log(money);

    // check amount condition(sender account balance)
    if (money < req.body.amount) {
      session.abortTransaction();
      return res
        .status(404)
        .json(new ApiResponse(404, 'insufficient balance', ''));
    }

    // if all checks passed
    // exchange money from fromUser(sender) to toUser(receiver)
    await Account.updateOne(
      { user: req.body.to },
      {
        $inc: { balance: req.body.amount },
      }
    ).session(session);

    await Account.findOneAndUpdate(
      { user: req.userId },
      {
        $inc: { balance: -req.body.amount },
      }
    ).session(session);

    // commit session
    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json(new ApiResponse(200, 'Transfer successfull', ''));
  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error(`Transaction failed: ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, 'Transaction failed due to internal issue', '')
      );
  } finally {
    session.endSession();
  }
};

async function validateReceiver(userId, session) {
  try {
    const account = await Account.findOne({ user: userId }).session(session);
    // checking if user has proper account or not.
    if (!account) {
      return false;
    }

    // if get the valid account user, then call the next middleware.
    return true;
  } catch (err) {
    console.error(
      `Error while getting data from db in account validation middleware: ${err}`
    );
    return false;
  }
}

module.exports = {
  balance,
  transfer,
};
