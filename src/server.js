require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const appConfig = require('./config/app.config');
const {
	globalErrorHandler,
	globalNotFoundHandler,
} = require('./middlewares/appErrorHandler');
const { error: _error, info, basicInfo } = require('./utils/loggerLib');
const ConnectDatabase = require('./config/db.connection');
const mainRouter = require('./main_router');

/**
 * Database connection establishment
 */
ConnectDatabase();

/**
 * Parse JSON body & URL encoded
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Cors Handler/Enabled
 */
app.use(cors(appConfig.corsOptions));

// start listening to http server
server.listen(appConfig.port);

/**
 * Event listener for HTTP server "error" event.
 */

let onError = (error) => {
	if (error.syscall !== 'listen') {
		_error(error.code + ' not equal listen', 'serverOnErrorHandler', 10);
		throw error;
	}

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			_error(
				error.code + ':elavated privileges required',
				'serverOnErrorHandler',
				10,
			);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			_error(
				error.code + ':port is already in use.',
				'serverOnErrorHandler',
				10,
			);
			process.exit(1);
			break;
		default:
			_error(
				error.code + ':some unknown error occured',
				'serverOnErrorHandler',
				10,
			);
			throw error;
	}
};

// error event listening handler
server.on('error', onError);

/**
 * Event listener for HTTPS server "listening" event.
 */

let onListening = () => {
	let address = server.address();
	let bind =
		typeof address === 'string'
			? 'pipe ' + address
			: 'port ' + address.port;
	basicInfo('Listening on ' + bind);
	info(
		'server listening on port' + address.port,
		'serverOnListeningHandler',
		10,
	);
};

// success event listening handler
server.on('listening', onListening);

/**
 * Main route initiation
 */
app.use('/', mainRouter);

/**
 * Global error handler initiation
 */
app.use(globalErrorHandler);
app.use(globalNotFoundHandler);

// module.exports = app;
