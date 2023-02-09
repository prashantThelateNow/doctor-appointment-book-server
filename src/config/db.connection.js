const { basicInfo } = require('../utils/loggerLib');
const sequelize = require('./db.config');

/**
 * Check/Establish database connection
 */
const ConnectDatabase = async () => {
	try {
		await sequelize.authenticate();
		basicInfo('Database connection has been established successfully.');
	} catch (error) {
		basicInfo(`Unable to connect to the database: ${error}`);
	}

	process.on('SIGINT', async () => {
		try {
			await sequelize.close();
			basicInfo('Database connection disconnected by application...');
			// console.log("Mongodb disconnected by Application");
			// console.log(process.pid);
			process.kill(process.pid);
			process.exit(0);
		} catch (error) {
			basicInfo(
				`Some error ocurred while database diconnecting by application: ${error}`,
			);
		}
	});
};

module.exports = ConnectDatabase;
