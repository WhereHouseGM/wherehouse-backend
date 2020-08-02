const jwt = require("jsonwebtoken");
const SimplifiedUserDto = require("../dtos/simplified-user");

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

	const userInfo = SimplifiedUserDto(user);

	return {
		accessToken,
		refreshToken,
		tokenType,
		user: userInfo
	};
};