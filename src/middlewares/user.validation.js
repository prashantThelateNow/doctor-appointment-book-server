const { RegisterUser, userLoginSchema } = require('../models/user');

module.exports = {
	registerUserValidation: (req, res, next) => {
		next();
	},
};
