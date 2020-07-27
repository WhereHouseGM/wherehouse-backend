const authConfig = require("../../../config/auth");
const db = require("../../../models");
const { generateTokenResponse } = require("../../../utils/auth");
const { authorize } = require("../../../middlewares/auth");

module.exports = function (router) {
	router.post("/auth/refresh-token", authorize(), async function(req, res, next) {
		try {
			// return jwt response
			const userId = res.locals.userId;
			const user = db.users.findByPk(userId);

			const tokenResponse = generateTokenResponse(user, authConfig);
			res.status(200).json(tokenResponse);
		} catch(err) {
			next(err);
		}
	});
};