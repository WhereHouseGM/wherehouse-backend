const jwt = require("jsonwebtoken");

exports.getTokenFrom = function (authorizationHeader) {
	return authorizationHeader.split(" ")[1];
};

exports.generateTokenResponse = function (user, authConfig) {
	const accessToken = jwt.sign({
		userId: user.id,
	}, authConfig.jwt.secret,
	{
		expiresIn: authConfig.jwt.accessTokenExpiresIn
	});

	const refreshToken = jwt.sign({
		userId: user.id,
	}, authConfig.jwt.secret, 
	{
		expiresIn: authConfig.jwt.refreshTokenExpiresIn
	});

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
};