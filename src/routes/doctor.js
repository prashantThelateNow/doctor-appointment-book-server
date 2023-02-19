const doctorRouter = require('express').Router();
const {
	fetchDoctors,
	initDoctorsData,
	fetchDoctorByUserId,
} = require('../controllers/doctorController');

/**
 * All doctor routes end points
 */
doctorRouter.get(`/`, fetchDoctors);
doctorRouter.get(`/:userId`, fetchDoctorByUserId);
doctorRouter.post(`/init`, initDoctorsData);

module.exports = doctorRouter;
