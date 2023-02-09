const pino = require('pino');
const moment = require('moment');
const momentz = require('moment-timezone');
const timeZone = 'Asia/Kolkata';
const now = () => moment().format();
const normallocalvalue = () => momentz(now()).tz(timeZone).format();

/**
 * Error method
 */
const error = (errorMessage, errorOrigin, errorLevel) => {
	let currentTime = normallocalvalue();
	let errorResponse = {
		timestamp: currentTime,
		errorMessage: errorMessage,
		errorOrigin: errorOrigin,
		errorLevel: errorLevel,
	};

	pino().error(errorResponse);
	return errorResponse;
}; // end captureError

/**
 * Info method
 */
const info = (message, origin, importance) => {
	let currentTime = normallocalvalue();

	let infoMessage = {
		timestamp: currentTime,
		message: message,
		origin: origin,
		level: importance,
	};

	pino().info(infoMessage);
	return infoMessage;
}; // end infoCapture

/**
 * Basic info method
 */
const basicInfo = (info) => {
	let timestamp = normallocalvalue();

	let infoMessage = {
		timestamp,
		info,
	};

	pino().info(infoMessage);
	return infoMessage;
};

module.exports = { error, info, basicInfo };
