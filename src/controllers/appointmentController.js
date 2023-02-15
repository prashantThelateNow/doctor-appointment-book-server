const Appointment = require('../models/appointment');
const { commonAPIResponse } = require('../utils/responseLib');
const sequelize = require('../config/db.config');
const { Op } = require('sequelize');
const moment = require('moment');

module.exports = {
	fetchDoctorAppointment: async (req, res) => {
		const t = await sequelize.transaction();
		try {
			const { doctorId } = req.params;
			const { appointment_date } = req.query;
			let params = [{ doctor_id: doctorId }];
			if (appointment_date) {
				params.push({ appointment_date });
			}

			let result = await Appointment.findAll(
				{
					where: {
						[Op.and]: params,
					},
				},
				{
					transaction: t,
				},
			);
			if (!result) {
				throw 'FAILED';
			}

			await t.commit();

			let response = { appointments: result, length: result.length };
			if (result.length === 0) {
				return res
					.status(200)
					.send(commonAPIResponse('No records found!', 0, response));
			}

			res.status(200).send(
				commonAPIResponse(
					'Doctors appointments fetched successfully!',
					0,
					response,
				),
			);
		} catch (error) {
			console.log(error);

			if (t) {
				t.rollback();
			}

			if (error.errors || error === 'FAILED') {
				res.status(400).send(
					commonAPIResponse(
						'Failed while fetching doctors appointments!',
						1,
						error,
					),
				);
			} else {
				res.status(500).send(
					commonAPIResponse(
						'Something went wrong! Looks like problem in server',
						3,
						null,
					),
				);
			}
		}
	},

	bookDoctorAppointment: async (req, res) => {
		const t = await sequelize.transaction();
		try {
			let appointmentData = req.body;
			let result = await Appointment.create(appointmentData, {
				transaction: t,
			});
			if (!result) {
				throw 'FAILED';
			}

			await t.commit();

			let response = { appointment_detail: result };
			res.status(201).send(
				commonAPIResponse(
					'Appointment booked successfully!',
					0,
					response,
				),
			);
		} catch (error) {
			console.log(error);

			if (t) {
				t.rollback();
			}

			if (error.errors || error === 'FAILED') {
				res.status(400).send(
					commonAPIResponse(
						'Failed while creating appointments!',
						1,
						error,
					),
				);
			} else {
				res.status(500).send(
					commonAPIResponse(
						'Something went wrong! Looks like problem in server',
						3,
						null,
					),
				);
			}
		}
	},

	updateAppointment: async (req, res) => {
		const t = await sequelize.transaction();
		try {
			const { id: appointment_id } = req.params;
			let { appointment_status } = req.body;
			let result = await Appointment.update(
				{ appointment_status },
				{
					where: {
						id: appointment_id,
					},
				},
				{
					transaction: t,
				},
			);
			if (!result) {
				throw 'FAILED';
			}

			await t.commit();

			let response = { appointment_detail: result };
			res.status(200).send(
				commonAPIResponse(
					'Appointment status updated successfully!',
					0,
					response,
				),
			);
		} catch (error) {
			console.log(error);

			if (t) {
				t.rollback();
			}

			if (error.errors || error === 'FAILED') {
				res.status(400).send(
					commonAPIResponse(
						'Failed while updating appointment status!',
						1,
						error,
					),
				);
			} else {
				res.status(500).send(
					commonAPIResponse(
						'Something went wrong! Looks like problem in server',
						3,
						null,
					),
				);
			}
		}
	},

	fetchMonthlyAppointmentSummary: async (req, res) => {
		const t = await sequelize.transaction();
		try {
			let { start_date: monthStartDate, end_date: monthEndDate } =
				req.query;

			let result = await Appointment.findAll(
				{
					attributes: [
						[
							sequelize.fn('date', sequelize.col('createdAt')),
							'date',
						],
						[
							sequelize.fn('COUNT', sequelize.col('id')),
							'no_of_appointments',
						],
						[
							sequelize.fn(
								'SUM',
								sequelize.literal(
									'appointment_status = "Closed"',
								),
							),
							'no_of_closed_appointments',
						],
						[
							sequelize.fn(
								'SUM',
								sequelize.literal(
									'appointment_status = "Cancelled"',
								),
							),
							'no_of_cancelled_appointments',
						],
					],
					where: {
						createdAt: {
							[Op.between]: [
								moment(monthStartDate).toISOString(),
								moment(monthEndDate).toISOString(),
							],
						},
					},
					group: [sequelize.fn('date', sequelize.col('createdAt'))],
					raw: true,
				},
				{ transaction: t },
			);
			if (!result) {
				throw 'FAILED';
			}

			await t.commit();

			let response = { summary: result, length: result.length };
			if (result.length === 0) {
				return res
					.status(200)
					.send(commonAPIResponse('No records found!', 0, response));
			}

			res.status(200).send(
				commonAPIResponse(
					'Monthly summary fetched successfully!',
					0,
					response,
				),
			);
		} catch (error) {
			console.log(error);

			if (t) {
				t.rollback();
			}

			if (error.errors || error === 'FAILED') {
				res.status(400).send(
					commonAPIResponse(
						'Failed while fetching monthly summary!',
						1,
						error,
					),
				);
			} else {
				res.status(500).send(
					commonAPIResponse(
						'Something went wrong! Looks like problem in server',
						3,
						null,
					),
				);
			}
		}
	},

	fetchMonthlyAppointmentDetail: async (req, res) => {
		const t = await sequelize.transaction();
		try {
			let { start_date: monthStartDate, end_date: monthEndDate } =
				req.query;

			let result = await Appointment.findAll(
				{
					attributes: [
						[
							sequelize.fn(
								'date',
								sequelize.col('appointment_date'),
							),
							'date',
						],
						[
							sequelize.fn(
								'GROUP_CONCAT',
								sequelize.fn(
									'JSON_OBJECT',
									'name',
									sequelize.col('patient_name'),
									'status',
									sequelize.col('appointment_status'),
								),
							),
							'appointments',
						],
					],
					where: {
						createdAt: {
							[Op.between]: [
								moment(monthStartDate).toISOString(),
								moment(monthEndDate).toISOString(),
							],
						},
					},
					group: [
						sequelize.fn('date', sequelize.col('appointment_date')),
						'date',
					],
					order: [
						sequelize.fn('date', sequelize.col('appointment_date')),
						'date',
					],
					raw: true,
				},
				{ transaction: t },
			);
			if (!result) {
				throw 'FAILED';
			}

			await t.commit();

			let transformedList = result.map((row) => ({
				date: row.date,
				appointments: JSON.parse(`[${row.appointments}]`),
			}));

			let response = {
				appointment_detail: transformedList,
				length: transformedList.length,
			};
			if (transformedList.length === 0) {
				return res
					.status(200)
					.send(commonAPIResponse('No records found!', 0, response));
			}

			res.status(200).send(
				commonAPIResponse(
					'Appointment detailed summary fetched successfully!',
					0,
					response,
				),
			);
		} catch (error) {
			console.log(error);

			if (t) {
				t.rollback();
			}

			if (error.errors || error === 'FAILED') {
				res.status(400).send(
					commonAPIResponse(
						'Failed while fetching records!',
						1,
						error,
					),
				);
			} else {
				res.status(500).send(
					commonAPIResponse(
						'Something went wrong! Looks like problem in server',
						3,
						null,
					),
				);
			}
		}
	},
};
