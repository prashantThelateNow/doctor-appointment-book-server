const jwt = require('jsonwebtoken');
const { commonAPIResponse } = require('../utils/responseLib');

module.exports = {
	/**
	 * Validate token from client side
	 */
	checkToken: (req, res, next) => {
		if (req.path === '/login') {
			next();
		} else {
			let token = req.get('authorization') || req.query.authorization;
			if (token) {
				// Remove Bearer from string
				// token = token.slice(7, token.length);
				jwt.verify(
					token,
					process.env.JWT_SECRET_KEY,
					(err, decoded) => {
						if (err) {
							return res
								.status(401)
								.send(
									commonAPIResponse(
										'Invalid Token...',
										-1,
										null,
									),
								);
						} else {
							req.decoded = decoded;
							next();
						}
					},
				);
			} else {
				return res
					.status(401)
					.send(
						commonAPIResponse(
							'Access Denied! Unauthorized User',
							-1,
							null,
						),
					);
			}
		}
	},
};
