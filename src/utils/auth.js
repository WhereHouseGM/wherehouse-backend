const jwt = require("jsonwebtoken");

function getTokenFrom(authorizationHeader) {
	return authorizationHeader.split(" ")[1];
}

function generateTokenResponse(user, authConfig) {
	const accessToken = jwt.sign({
		userId: user.id,
		expiresIn: authConfig.jwt.accessTokenExpiresIn
	}, authConfig.jwt.secret);

	const refreshToken = jwt.sign({
		userId: user.id,
		expiresIn: authConfig.jwt.refreshTokenExpiresIn
	}, authConfig.jwt.secret);

	const tokenType = authConfig.jwt.tokenType;

	const userInfo = {
		id: user.id,
		name: user.name,
		email: user.email,
		type: user.type,
		telephoneNumber: user.telephoneNumber,
		phoneNumber: user.phoneNumber,
		companyName: user.companyName
	};

	return {
		accessToken,
		refreshToken,
		tokenType,
		user: userInfo
	};
}

exports.getTokenFrom = getTokenFrom;
exports.generateTokenResponse = generateTokenResponse;