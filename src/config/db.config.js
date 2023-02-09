const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('doctors_appointment', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;
