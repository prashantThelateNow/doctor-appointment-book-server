const userRouter = require('express').Router();
const { userLogin } = require('../controllers/userController');

/**
 * All user routes end points
 */
userRouter.post(`/login`, userLogin);

module.exports = userRouter;
