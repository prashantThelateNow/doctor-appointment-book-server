const mainRouter = require('express').Router();
const appConfig = require('./config/app.config');
const userRouter = require('./routes/user');
const postRouter = require('./routes/posts');
const { checkToken } = require('./middlewares/token_validation');

/**
 * All routing initiation
 */

const API_VERSION = appConfig.apiVersion;

// Home API route
mainRouter.get(``, (req, res) =>
	res.status(200).send('Doctors appointment API Home'),
);

// User API route
mainRouter.use(`${API_VERSION}/user`, userRouter);

// Post API route
mainRouter.use(`${API_VERSION}/posts`, postRouter);

module.exports = mainRouter;
