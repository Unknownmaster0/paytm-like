const { Router } = require('express');
const {
  balance,
  transfer,
  getMovements,
  createUpiPin,
} = require('../controllers/account.controller');
const { authMiddlware } = require('../middlewares/auth.middleware');
const {
  accountMiddleware,
} = require('../middlewares/account.validation.middleware');
const router = Router();

router.route('/transfer').post(authMiddlware, accountMiddleware, transfer);
router.route('/balance').get(authMiddlware, accountMiddleware, balance);
router
  .route('/getMovements')
  .get(authMiddlware, accountMiddleware, getMovements);

router.route('/createUpiPin').post(authMiddlware, accountMiddleware, createUpiPin);

module.exports = { router };
