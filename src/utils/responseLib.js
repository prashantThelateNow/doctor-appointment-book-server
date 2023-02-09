/**
 * Custom response method
 */
const generate = (err, message, statusCode, data) => {
	let response = {
		error: err,
		message: message,
		statusCode: statusCode,
		data: data,
	};
	return response;
};

const commonAPIResponse = (message, statusCode, data) => {
	let response = {
		message: message,
		statusCode: statusCode,
		data: data,
	};
	return response;
};

module.exports = { generate, commonAPIResponse };
