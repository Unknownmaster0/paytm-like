const { Router } = require('express');
const router = Router();
const { router: userRouter } = require('./user.routes');
const { router: accountRouter } = require('./account.routes');

router.use('/user', userRouter);
router.use('/account', accountRouter);

module.exports = {
  router,
};
