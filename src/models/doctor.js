const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user');

const Doctor = sequelize.define('doctors', {
	id: {
		type: DataTypes.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	appointment_slot_time: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	day_start_time: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	day_end_time: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

Doctor.User = Doctor.belongsTo(User, {
	foreignKey: 'user_id',
});

const syncDoctorsTable = async () => {
	try {
		await sequelize.sync();
		console.log('Doctors table created successfully!');
	} catch (error) {
		console.error('Unable to create doctors table : ', error);
	}
};

syncDoctorsTable();

module.exports = Doctor;
