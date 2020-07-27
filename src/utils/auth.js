const jwt = require("jsonwebtoken");

function getTokenFrom(authorizationHeader) {
	return authorizationHeader.split(" ")[1];
}

function generateTokenResponse(userId, authConfig) {
	const accessToken = jwt.sign({
		userId: userId,
		expiresIn: authConfig.jwt.accessTokenExpiresIn
	}, authConfig.jwt.secret);

	const refreshToken = jwt.sign({
		userId: userId,
		expiresIn: authConfig.jwt.refreshTokenExpiresIn
	}, authConfig.jwt.secret);

	const tokenType = authConfig.jwt.tokenType;

	return {
		accessToken,
		refreshToken,
		tokenType
	};
}

exports.getTokenFrom = getTokenFrom;
exports.generateTokenResponse = generateTokenResponse;