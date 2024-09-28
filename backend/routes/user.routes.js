const { Router } = require('express');
const router = Router();
const {
  signInRoute,
  signUpRoute,
  update,
  bulk,
  validate,
} = require('../controllers/user.controller');
const {
  userNameValidation,
  passwordValidation,
  firstNameValidation,
  lastNameValidation,
} = require('../middlewares/inputValidation.middleware');
const { authMiddlware } = require('../middlewares/auth.middleware');

router
  .route('/signin')
  .post(userNameValidation, passwordValidation, signInRoute);

router
  .route('/signup')
  .post(
    userNameValidation,
    passwordValidation,
    firstNameValidation,
    lastNameValidation,
    signUpRoute
  );

router.route('/update').put(authMiddlware, update);

router.route('/bulk').get(authMiddlware, bulk);

router.route('/validate').get(authMiddlware, validate);

module.exports = { router };
