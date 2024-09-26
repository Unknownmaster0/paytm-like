const { Router } = require('express');
const router = Router();
const {
  signInRoute,
  signUpRoute,
  update,
  bulk,
} = require('../controllers/user.controller');
const {
  userNameValidation,
  passwordValidation,
  firstNameValidation,
  lastNameValidation,
} = require('../middlewares/inputValidation.middleware');
const { authMiddlware } = require('../middlewares/auth.middleware');

// app.post('/user/signup', async function (req, res) {
//   const { firstName, lastName, password } = req.body();
//   try {
//     const user = await User.create({ firstName, lastName, password });
//     res
//       .status(200)
//       .json(new ApiResponse(200, 'successfully sending user data', user));
//   } catch (err) {
//     console.error(`error while saving data to database in signup.`);
//     res.status(500).json(new ApiResponse(500, 'internal server issue', ''));
//   }
// });

// app.post('/user/signin', function (req, res) {
//   const { password } = req.body();
// });

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

module.exports = { router };
