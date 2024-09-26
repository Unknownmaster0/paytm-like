const { ApiResponse } = require('../utils/apiResponse');
const {
  validateUserName,
  validatePassword,
  validateFirstName,
  validateLastName,
} = require('../utils/inputValidation');

// input validation of username, password.
const userNameValidation = function (req, res, next) {
  const { username } = req.body;
  const isUsername = validateUserName(username);
  if (!isUsername.success) {
    return res.status(404).json(new ApiResponse(404, isUsername.error, ''));
  }
  next();
};

const passwordValidation = function (req, res, next) {
  const { password } = req.body;
  const isPassword = validatePassword(password);
  if (!isPassword.success) {
    return res.status(404).json(new ApiResponse(404, isPassword.error, ''));
  }
  next();
};

// input validation of firstName, lastName.
const firstNameValidation = function (req, res, next) {
  const { firstName } = req.body;
  const isFirstname = validateFirstName(firstName);
  if (!isFirstname.success) {
    return res.status(404).json(new ApiResponse(404, isFirstname.error, ''));
  }
  next();
};

const lastNameValidation = function (req, res, next) {
  const { lastName } = req.body;
  const isLastname = validateLastName(lastName);
  if (!isLastname.success) {
    return res.status(404).json(new ApiResponse(404, isLastname.error, ''));
  }
  next();
};

module.exports = {
  userNameValidation,
  passwordValidation,
  firstNameValidation,
  lastNameValidation,
};
