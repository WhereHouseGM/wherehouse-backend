const { authorize } = require("../../middlewares/auth");
const db = require("../../models");
const HTTPError = require("node-http-error");

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
};