const { generate } = require('../utils/responseLib');

/**
 * Global error handler
 */
const globalErrorHandler = (err, req, res, next) => {
	// basicInfo("application error handler called");
	if (err) {
		let apiResponse = generate(
			true,
			'Some error occured at global level',
			500,
			null,
		);
		return res.status(500).send(apiResponse);
	}
	next();
};

/**
 * Global route not found handler
 */
const globalNotFoundHandler = (req, res) => {
	// basicInfo("Global not found handler called");
	let apiResponse = generate(
		true,
		`${req.originalUrl} path doesn't exists in application`,
		404,
		null,
	);
	return res.status(404).send(apiResponse);
};

module.exports = { globalErrorHandler, globalNotFoundHandler };
