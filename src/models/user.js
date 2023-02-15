const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('users', {
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
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const syncUsersTable = async () => {
	try {
		await sequelize.sync();
		console.log('Users table created successfully!');

		// await User.create({
		// 	name: 'Demo',
		// 	email: 'demo@gmail.com',
		// 	password: 'demo123',
		// });
		// console.log('User demo inserted successfully!');
	} catch (error) {
		console.error('Unable to create users table : ', error);
	}
};

syncUsersTable();

module.exports = User;
