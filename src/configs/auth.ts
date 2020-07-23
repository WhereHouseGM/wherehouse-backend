export default {
    jwt: {
        accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRESIN || "3h",
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRESIN || "4d",
        tokenType: process.env.TOKEN_TYPE || "Bearer",
        secret: process.env.JWT_SECRET
    }
};