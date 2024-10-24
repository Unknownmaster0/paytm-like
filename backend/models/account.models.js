const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    balance: {
      type: Number,
      required: true,
    },
    pin: {
      type: String,
      default: '',
    },
    movements: {
      type: [movementSchema],
    },
  },
  { timestamps: true }
);

const Account = mongoose.model('Account', accountSchema);

module.exports = {
  Account,
};
