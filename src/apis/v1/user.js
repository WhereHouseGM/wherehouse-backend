const { authorize } = require("../../middlewares/auth");
const db = require("../../models");

module.exports = (router) => {
	router.get("/users/:userId", authorize(), async function (req, res, next) {
		try {
			const userIdFromToken = res.locals.userId;
			const userIdParam = req.params.userId;

			console.log(userIdFromToken, userIdParam);
			if(userIdFromToken != userIdParam) throw new Error("Forbidden");

			const user = await db.users.findByPk(userIdParam);

			if(user === null) throw new Error("user not exists");

			console.log(user);

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