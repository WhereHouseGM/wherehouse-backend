const { authorize } = require("../../middlewares/auth");
const Joi = require("joi");
const { getUser, patchUser } = require("../../services/user");

const patchUserRequestValidator = Joi.object({
	name: Joi.string().max(10),
	email: Joi.string().email().max(30),
	password: Joi.string().min(64).max(64),
	type: Joi.string().valid("SHIPPER", "OWNER"),
	phoneNumber: Joi.string().max(20),
	telephoneNumber: Joi.string().max(20),
	companyName: Joi.string().max(20)
});

module.exports = (router) => {
	router.get("/users/:userId", authorize(), async function (req, res, next) {
		try {
			const userIdFromToken = res.locals.userId;
			const userIdParam = parseInt(req.params.userId);

			const user = await getUser(userIdFromToken, userIdParam);
			res.status(200).json(user);
		} catch(err) {
			next(err);
		}
	});

	router.patch("/users/:userId", authorize(), async function (req, res, next) {
		try {
			const userIdFromToken = res.locals.userId;
			const userIdParam = parseInt(req.params.userId);

			// validate request
			const { value, error } = await patchUserRequestValidator.validate(req.body);
			if(error) throw error;

			const user = await patchUser(userIdFromToken, userIdParam, value);
			res.status(200).json(user);
		} catch(err) {
			next(err);
		}
	});
};