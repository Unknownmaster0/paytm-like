const { Router } = require('express');
const { balance, transfer } = require('../controllers/account.controller');
const { authMiddlware } = require('../middlewares/auth.middleware');
const {
  accountMiddleware,
} = require('../middlewares/account.validation.middleware');
const router = Router();

router.route('/transfer').post(authMiddlware, accountMiddleware, transfer);
router.route('/balance').get(authMiddlware, accountMiddleware, balance);

module.exports = { router };
