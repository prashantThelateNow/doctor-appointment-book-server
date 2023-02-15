const { RegisterUser } = require('../models/user');
const sequelize = require('../config/db.config');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const { commonAPIResponse } = require('../utils/responseLib');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	/**
	 * Get user registration
	 */
	userRegistration: async (req, res) => {
		try {
			const {
				username: user_name,
				email: user_email,
				password,
			} = req.body;
			const isUserExist = await RegisterUser.exists({
				username: user_name,
			});
			if (isUserExist) {
				throw 'USER_EXIST';
			}
			const isUserEmailExist = await RegisterUser.exists({
				email: user_email,
			});
			if (isUserEmailExist) {
				throw 'USER_EMAIL_EXIST';
			}
			let salt = bcrypt.genSaltSync(10);
			let hash = bcrypt.hashSync(password, salt);
			req.body.password = hash;
			const registeruUserData = new RegisterUser(req.body);
			const registerUserResponse = await registeruUserData.save();
			if (!registerUserResponse) {
				throw 'USER_REGISTRATION_FAILED';
			}
			res.status(200).send(
				commonAPIResponse('User Registered Successfully!', 0, null),
			);
		} catch (error) {
			console.log(error);
			if (error === 'USER_EXIST') {
				res.status(400).send(
					commonAPIResponse('User Already Exists!', 1, null),
				);
			} else if (error === 'USER_EMAIL_EXIST') {
				res.status(400).send(
					commonAPIResponse('Email Already Exists!', 5, null),
				);
			} else if (error === 'USER_REGISTRATION_FAILED') {
				res.status(400).send(
					commonAPIResponse('User Registration Failed!', 4, null),
				);
			} else {
				res.status(500).send(
					commonAPIResponse(
						'Something went wrong! Please try again after sometime',
						3,
						null,
					),
				);
			}
		}
	},

	/**
	 * User login
	 */
	userLogin: async (req, res) => {
		const t = await sequelize.transaction();
		try {
			const { username, password } = req.body;
			const isUserExist = await User.findOne(
				{
					where: {
						email: username,
					},
				},
				{
					transaction: t,
				},
			);
			if (!isUserExist || password !== isUserExist.password) {
				throw 'INVALID_CRED';
			}

			const doctor = await Doctor.findOne(
				{
					where: {
						user_id: isUserExist.id,
					},
				},
				{
					transaction: t,
				},
			);
			if (!doctor) {
				throw 'FAILED';
			}

			await t.commit();

			let userData = {
				userId: isUserExist.id,
				name: isUserExist.name,
				email: isUserExist.email,
			};
			const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
				expiresIn: '8h',
			});
			let data = { ...userData, token, doctor_data: doctor };

			res.status(200).send(
				commonAPIResponse('User login successfully', 0, data),
			);
		} catch (error) {
			console.log(error);

			if (t) {
				t.rollback();
			}

			if (error === 'INVALID_CRED') {
				res.status(400).send(
					commonAPIResponse('Invalid Username or Password', 1, null),
				);
			} else if (error === 'FAILED') {
				res.status(400).send(
					commonAPIResponse(
						'Failed while fetching doctor detail',
						1,
						null,
					),
				);
			} else {
				res.status(500).send(
					commonAPIResponse(
						'Something went wrong! Please try again after sometime',
						3,
						null,
					),
				);
			}
		}
	},
};
