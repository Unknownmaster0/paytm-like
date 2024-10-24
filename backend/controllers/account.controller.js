const { ApiResponse } = require('../utils/apiResponse');
const { Account } = require('../models/account.models');
const mongoose = require('mongoose');
const { formatDateToIST } = require('../utils/formatter');
const { transferSchema, upiSchema } = require('../models/zod.input.validation');

const balance = async function (req, res) {
  // when it come here, it means it is valid user and have every validation passed, then simply return the balance.
  const account = await Account.findOne({ user: req.userId });
  const balance = account.balance;
  res.status(200).json(new ApiResponse(200, 'success', balance));
};

const transfer = async function (req, res) {
  // wrap everything inside the transaction session, such that if the transaction will complete in one go or fail, not hung in between.
  const parsed = transferSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(404)
      .json(new ApiResponse(404, 'Invalid input', parsed.error));
  }

  const session = await mongoose.startSession();
  // check if the amount of transactions is decimal or not.
  // if decimal then say that amount can't be decimal.

  const { to: receiverId, amount, pin } = parsed.data;

  if (String(amount).includes('.')) {
    return res
      .status(400)
      .json(new ApiResponse(400, 'Amount cannot be decimal', ''));
  }
  try {
    // validate the toUser(receiver).
    const isValidReceiver = await validateReceiver(receiverId, session);
    if (!isValidReceiver) {
      return res
        .status(403)
        .json(new ApiResponse(403, 'Receiver have no account', ''));
    }

    // get fromUser(sender) account
    const senderAccount = await Account.findOne({ user: req.userId }).session(
      session
    );
    const money = senderAccount.balance; // account balance

    // check amount condition(sender account balance)
    if (money < req.body.amount) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, 'insufficient balance in sender account', '')
        );
    }

    // check if the pin of sender account.
    if (pin !== senderAccount.pin) {
      return res.status(404).json(new ApiResponse(404, 'Not valid pin', ''));
    }

    // if all pre-checks are correct then good to go, with the transaction.
    session.startTransaction(); // abort transaction will create a backend down, thus move the transactionSession logic down.

    // if all checks passed
    // exchange money from fromUser(sender) to toUser(receiver)

    const senderToReceiver = { amount: -amount, user: receiverId };
    const receiverFromSender = { amount: amount, user: req.userId };

    await Account.updateOne(
      { user: receiverId },
      {
        $inc: { balance: amount },
        $push: { movements: receiverFromSender },
      }
    ).session(session);

    await Account.findOneAndUpdate(
      { user: req.userId },
      {
        $inc: { balance: -amount },
        $push: { movements: senderToReceiver },
      }
    ).session(session);

    // commit session
    await session.commitTransaction();

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

const getMovements = async function (req, res) {
  // user = req.userId. // find in the account table whose user = req.userId and get its movements array details.

  const account = await Account.findOne({ user: req.userId }).populate({
    path: 'movements.user',
    select: `_id firstName lastName`,
  });

  const newData = account.movements.map((obj) => ({
    amount: obj.amount,
    user: {
      id: obj.user._id,
      firstName: obj.user.firstName,
      lastName: obj.user.lastName,
    },
    id: obj._id,
    createdAt: formatDateToIST(obj.createdAt),
  }));

  return res.status(200).json(new ApiResponse(200, 'success', newData));
};

const createUpiPin = async function (req, res) {
  const parsed = upiSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(404)
      .json(new ApiResponse(404, 'Invalid pin', parsed.error));
  }

  try {
    await Account.findOneAndUpdate(
      { user: req.userId },
      {
        pin: parsed.data.pin,
      }
    );
    return res.status(200).json(new ApiResponse(200, 'success', ''));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, 'error while updating pin', ''));
  }
};

module.exports = {
  balance,
  transfer,
  getMovements,
  createUpiPin,
};
