const appointmentRouter = require('express').Router();
const {
	bookDoctorAppointment,
	updateAppointment,
	fetchDoctorAppointment,
	fetchMonthlyAppointmentSummary,
	fetchMonthlyAppointmentDetail,
} = require('../controllers/appointmentController');
const { checkToken } = require('../middlewares/token_validation');

/**
 * All appointment routes end points
 */
appointmentRouter.get(`/:doctorId/`, checkToken, fetchDoctorAppointment);
appointmentRouter.post(`/book`, bookDoctorAppointment);
appointmentRouter.patch(`/:id`, checkToken, updateAppointment);

//Appointment reports
appointmentRouter.get(`/report/summary`, fetchMonthlyAppointmentSummary);
appointmentRouter.get(`/report/detailed`, fetchMonthlyAppointmentDetail);

module.exports = appointmentRouter;
