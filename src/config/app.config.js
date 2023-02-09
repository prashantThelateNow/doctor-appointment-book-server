/**
 * App configurations
 */
const whitelistedDomains = ['http://localhost:4200', 'http://localhost:8080'];

const appConfig = {
	port: process.env.PORT || 3000,
	corsOptions: {
		origin: whitelistedDomains,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		allowedHeaders: [
			'Origin',
			'Accept',
			'Content-Type',
			'Authorization',
			'X-Requested-With',
		],
		optionsSuccessStatus: 200,
	},
	env: process.env.NODE_ENV,
	mongodb_uri: process.env.MONGODB_URI,
	apiVersion: '/api/v1',
};

module.exports = appConfig;
