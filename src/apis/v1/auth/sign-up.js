const Joi = require("joi");
const { signUp } = require("../../../services/auth");

module.exports = (router) => {
	router.post("/auth/sign-up", async function(req, res, next) {
		try {
			const signUpRequestValidator = Joi.object({
				name: Joi.string().max(10).required(),
				email: Joi.string().email().max(30).required(),
				password: Joi.string().min(64).max(64).required(),
				type: Joi.string().valid("SHIPPER", "OWNER").required(),
				phoneNumber: Joi.string().max(20).required(),
				telephoneNumber: Joi.string().max(20),
				companyName: Joi.string().max(20)
			});

			// validate request body
			const { value, error } = await signUpRequestValidator.validate(req.body);
			if(error) throw error;

			const tokenResponse = await signUp(value);
			res.status(201).json(tokenResponse);
		} catch(err) {
			next(err);
		}
	});
};