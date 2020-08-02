const Joi = require("joi");
const { signIn } = require("../../../services/auth");

module.exports = (router) => {
	router.post("/auth/sign-in", async function(req, res, next) {
		try {
			// validate request body
			const signInRequestValidator = Joi.object({
				email: Joi.string().email().max(30).required(),
				password: Joi.string().min(64).max(64).required(),
			});

			const { value, error } = await signInRequestValidator.validate(req.body);
			if(error) throw error;

			const tokenResponse = await signIn(value);
			res.status(200).json(tokenResponse);
		} catch(err) {
			next(err);
		}
	});
};