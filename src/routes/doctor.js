const doctorRouter = require('express').Router();
const {
	fetchDoctors,
	initDoctorsData,
} = require('../controllers/doctorController');

/**
 * All doctor routes end points
 */
doctorRouter.get(`/`, fetchDoctors);
doctorRouter.post(`/init`, initDoctorsData);

module.exports = doctorRouter;
