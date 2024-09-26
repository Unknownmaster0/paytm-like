const { Router } = require('express');
const router = Router();

router.route('/transfer');
router.route('/withdraw');

module.exports = { router };
