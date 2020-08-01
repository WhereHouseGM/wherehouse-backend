const db = require("../../models");
const Joi = require("joi");

const getWarehousesQueryValidator = Joi.object({
	address: Joi.string(),
	minSize: Joi.integer(),
	maxSize: Joi.integer()
});

module.exports = (router) => {
	router.get("/warehouses", async function (req, res, next) {
		try {
			const query = req.query;
			getWarehousesQueryValidator.validate(query);

			db.warehouses.findAll()
		} catch(err) {
			next(err);
		}
	})
}