const Joi = require("joi");
const db = require("../../../models");
const jwt = require("jsonwebtoken");
const authConfig = require("../../../config/auth");

const signUpRequestValidator = Joi.object({
	name: Joi.string().max(10).required(),
	email: Joi.string().email().max(30).required(),
	password: Joi.string().min(64).max(64).required(),
	type: Joi.string().valid("SHIPPER", "OWNER").required(),
	phoneNumber: Joi.string().max(20).required(),
	telephoneNumber: Joi.string().max(20),
	companyName: Joi.string().max(20)
});

module.exports = (router) => {
	router.post("/auth/sign-up", async function(req, res, next) {
		try {
			// validate request body
			const { value, error } = await signUpRequestValidator.validate(req.body);

			if(error) throw error;

			// save request data
			const newUser = await db.users.create({
				password: value.password,
				name: value.name,
				email: value.email,
				type: value.type,
				telephoneNumber: value.telephoneNumber,
				companyName: value.companyName,
				phoneNumber: value.phoneNumber
			});

			// return jwt response
			const accessToken = jwt.sign({
				userId: newUser.id,
				expiresIn: authConfig.jwt.accessTokenExpiresIn
			}, authConfig.jwt.secret);

			const refreshToken = jwt.sign({
				userId: newUser.id,
				expiresIn: authConfig.jwt.refreshTokenExpiresIn
			}, authConfig.jwt.secret);

			const tokenType = authConfig.jwt.tokenType;

			res.status(201).send({
				accessToken,
				refreshToken,
				tokenType
			});
		} catch(err) {
			next(err);
		}
	});
};