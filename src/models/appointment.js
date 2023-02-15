const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Appointment = sequelize.define('appointments', {
	id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	appointment_date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: new Date(),
	},
	appointment_time: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	doctor_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	patient_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	patient_email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
	patient_phone: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			isNumeric: true,
			len: [1, 10],
		},
	},
	appointment_status: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const syncAppointmentTable = async () => {
	try {
		await sequelize.sync();
		console.log('Appointments table created successfully!');
	} catch (error) {
		console.error('Unable to create Appointments table : ', error);
	}
};

syncAppointmentTable();

module.exports = Appointment;
