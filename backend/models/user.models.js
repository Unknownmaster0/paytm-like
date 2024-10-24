const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
        },
        message: (props) =>
          `${props.value} must have atleast 8 length, contain special symbol and at least one upper-case and numbers too.`,
      },
    },
  },
  { timestamps: true }
);

// pre hook, that hook up before saving the data in db, and hashed the password.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const saltNumber = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltNumber);
  return next();
});

// custom method to the userSchema.
userSchema.methods.validateUser = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
