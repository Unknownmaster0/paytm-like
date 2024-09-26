const {
  userNameSchema,
  passwordSchema,
  firstNameSchema,
  lastNameSchema,
} = require('../models/zod.input.validation');

const validateUserName = function (username) {
  return userNameSchema.safeParse(username);
};

const validatePassword = function (password) {
  return passwordSchema.safeParse(password);
};

const validateFirstName = function (firstName) {
  return firstNameSchema.safeParse(firstName);
};

const validateLastName = function (lastName) {
  return lastNameSchema.safeParse(lastName);
};

module.exports = {
  validateUserName,
  validatePassword,
  validateFirstName,
  validateLastName,
};
