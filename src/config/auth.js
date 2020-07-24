module.exports = {
	jwt: {
		accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "3h",
		refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "4d",
		tokenType: process.env.TOKEN_TYPE || "Bearer",
		secret: process.env.JWT_SECRET
	}
};