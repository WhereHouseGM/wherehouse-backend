const Joi = require("joi");
const db = require("../../../models");
const authConfig = require("../../../config/auth");
const sha256 = require("js-sha256");
const { generateTokenResponse } = require("../../../utils/auth");

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
			const hashedPassword = sha256(value.password);

			const newUser = await db.users.create({
				password: hashedPassword,
				name: value.name,
				email: value.email,
				type: value.type,
				telephoneNumber: value.telephoneNumber,
				companyName: value.companyName,
				phoneNumber: value.phoneNumber
			});

			// return jwt response
			const tokenResponse = generateTokenResponse(newUser.id, authConfig);
			res.status(201).json(tokenResponse);
		} catch(err) {
			next(err);
		}
	});
};