const { authorize } = require("../../../middlewares/auth");
const { refreshToken } = require("../../../services/auth");

module.exports = function (router) {
	router.post("/auth/refresh-token", authorize(), async function(req, res, next) {
		try {
			// return jwt response
			const userId = res.locals.userId;

			const tokenResponse = await refreshToken(userId);

			res.status(200).json(tokenResponse);
		} catch(err) {
			next(err);
		}
	});
};