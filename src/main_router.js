const mainRouter = require('express').Router();
const appConfig = require('./config/app.config');
const userRouter = require('./routes/user');
const doctorRouter = require('./routes/doctor');
const appointmentRouter = require('./routes/appointment');
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

// Doctor API route
mainRouter.use(`${API_VERSION}/doctor`, doctorRouter);

// Appointment API route
mainRouter.use(`${API_VERSION}/appointment`, appointmentRouter);

module.exports = mainRouter;
