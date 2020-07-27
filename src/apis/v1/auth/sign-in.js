const Joi = require("joi");
const db = require("../../../models");
const jwt = require("jsonwebtoken");
const authConfig = require("../../../config/auth");
const sha256 = require("js-sha256");

const signInRequestValidator = Joi.object({
	email: Joi.string().email().max(30).required(),
	password: Joi.string().min(64).max(64).required(),
});

module.exports = (router) => {
	router.post("/auth/sign-in", async function(req, res, next) {
		try {
			// validate request body
			const { value, error } = await signInRequestValidator.validate(req.body);

			if(error) throw error;

			// save request data
			const hashedPassword = sha256(value.password);

			const user = await db.users.findOne({
				email: value.email,
				password: hashedPassword
			});

			// return jwt response
			const accessToken = jwt.sign({
				userId: user.id,
				expiresIn: authConfig.jwt.accessTokenExpiresIn
			}, authConfig.jwt.secret);

			const refreshToken = jwt.sign({
				userId: user.id,
				expiresIn: authConfig.jwt.refreshTokenExpiresIn
			}, authConfig.jwt.secret);

			const tokenType = authConfig.jwt.tokenType;

			res.status(201).json({
				accessToken,
				refreshToken,
				tokenType
			});
		} catch(err) {
			next(err);
		}
	});
};