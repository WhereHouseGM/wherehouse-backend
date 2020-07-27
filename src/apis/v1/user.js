const { authorize } = require("../../middlewares/auth");
const db = require("../../models");
const HTTPError = require("node-http-error");
const Joi = require("joi");

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

			const user = await db.users.findByPk(userIdParam);

			if(user === null) throw new HTTPError(404, "Not Found Error");
			if(userIdFromToken !== userIdParam) throw new HTTPError(403, "Forbidden Error");

			res.status(200).json({
				id: user.id,
				name: user.name,
				email: user.email,
				type: user.type,
				telephoneNumber: user.telephoneNumber,
				phoneNumber: user.phoneNumber,
				companyName: user.companyName
			});
		} catch(err) {
			next(err);
		}
	});

	router.patch("/users/:userId", authorize(), async function (req, res, next) {
		try {
			const userIdFromToken = res.locals.userId;
			const userIdParam = parseInt(req.params.userId);

			const user = await db.users.findByPk(userIdParam);

			if(user === null) throw new HTTPError(404, "Not Found Error");
			if(userIdFromToken !== userIdParam) throw new HTTPError(403, "Forbidden Error");

			// validate request
			const { value, error } = await patchUserRequestValidator.validate(req.body);

			if(error) throw error;

			// TODO 함수 분리하기
			user.name = value.name || user.name;
			user.email = value.email || user.email;
			user.password = value.password || user.password;
			user.type = value.type || user.type;
			user.phoneNumber = value.phoneNumber || user.phoneNumber;
			user.telephoneNumber = value.telephoneNumber || user.telephoneNumber;
			user.companyName = value.companyName || user.companyName;

			await user.save();

			res.status(200).json({
				id: user.id,
				name: user.name,
				email: user.email,
				type: user.type,
				telephoneNumber: user.telephoneNumber,
				phoneNumber: user.phoneNumber,
				companyName: user.companyName
			});
		} catch(err) {
			next(err);
		}
	})
};