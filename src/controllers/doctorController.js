const Doctor = require('../models/doctor');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const bulkDoctorsList = require('../constants/bulkDoctorsData');
const { commonAPIResponse } = require('../utils/responseLib');
const { CommaContainStringToArray } = require('../utils/commonUtils');
const sequelize = require('../config/db.config');

module.exports = {
	/**
	 * Fetch doctors from database
	 */
	fetchDoctors: async (req, res) => {
		try {
			let result = await Doctor.findAll();
			if (!result) {
				throw 'FAILED';
			}

			let doctors = result.map((el) => {
				el.appointment_slot_time = CommaContainStringToArray(
					el.appointment_slot_time,
				);
				el.day_start_time = CommaContainStringToArray(
					el.day_start_time,
				);
				el.day_end_time = CommaContainStringToArray(el.day_end_time);

				return el;
			});
			let response = { doctors, length: result.length };
			if (result.length === 0) {
				return res
					.status(200)
					.send(commonAPIResponse('No records found!', 0, response));
			}

			res.status(200).send(
				commonAPIResponse('Records fetched successfully!', 0, response),
			);
		} catch (error) {
			console.log(error);

			if (error === 'FAILED') {
				res.status(400).send(
					commonAPIResponse(
						'Failed while fetching records!',
						1,
						null,
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

	/**
	 * Create bulk doctors resource in database
	 */
	initDoctorsData: async (req, res) => {
		const t = await sequelize.transaction();
		try {
			const doctors = bulkDoctorsList;
			await Appointment.destroy(
				{ truncate: { cascade: true } },
				{
					transaction: t,
				},
			);

			await User.destroy(
				{ truncate: { cascade: true } },
				{
					transaction: t,
				},
			);

			await Doctor.destroy(
				{ truncate: { cascade: true } },
				{
					transaction: t,
				},
			);

			let result = await Doctor.bulkCreate(
				doctors,
				{
					include: [
						{
							association: Doctor.User,
						},
					],
				},
				{ transaction: t },
			);
			if (!result) {
				throw 'FAILED';
			}

			await t.commit();

			let response = { doctors: result };
			res.status(201).send(
				commonAPIResponse(
					'Doctors initialized successfully!',
					0,
					response,
				),
			);
		} catch (error) {
			console.log(error);

			if (t) {
				await t.rollback();
			}

			if (error.errors || error === 'FAILED') {
				res.status(400).send(
					commonAPIResponse(
						'Failed while initializing doctors!',
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
