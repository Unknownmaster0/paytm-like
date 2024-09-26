const mongoose = require('mongoose');

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
  },
  { timestamps: true }
);

const Account = mongoose.model('Account', accountSchema);

module.exports = {
  Account,
};
