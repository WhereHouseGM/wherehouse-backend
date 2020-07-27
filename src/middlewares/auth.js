const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { getTokenFrom } = require("../utils/auth");

function authorize(options) {
	return function(req, res, next) {
		try {
			const authorizationHeader = req.header("Authorization");
			const token = getTokenFrom(authorizationHeader);
			const decoded = jwt.verify(token, authConfig.jwt.secret);

			res.locals.userId = decoded.userId;
			next();
		} catch (err) {
			next(err);
		}
	};
}

exports.authorize = authorize;