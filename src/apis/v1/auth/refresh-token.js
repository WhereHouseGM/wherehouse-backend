const jwt = require("jsonwebtoken");
const authConfig = require("../../../config/auth");
const { getTokenFrom, generateTokenResponse } = require("../../../utils/auth");

module.exports = function (router) {
	router.post("/auth/refresh-token", async function(req, res, next) {
		try {
			// validate jwt
			const authorizationHeader = req.header("Authorization");
			const token = getTokenFrom(authorizationHeader);
			const decoded = jwt.verify(token, authConfig.jwt.secret);

			// return jwt response
			const tokenResponse = generateTokenResponse(decoded.userId, authConfig);
			res.status(200).json(tokenResponse);
		} catch(err) {
			next(err);
		}
	});
};