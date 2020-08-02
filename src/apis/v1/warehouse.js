const Joi = require("joi");
const { getWarehouses } = require("../../services/warehouse");

const getWarehousesQueryValidator = Joi.object({
	address: Joi.string(),
	minSize: Joi.number().integer(),
	maxSize: Joi.number().integer()
});

module.exports = (router) => {
	router.get("/warehouses", async function (req, res, next) {
		try {
			const query = req.query;
			getWarehousesQueryValidator.validate(query);

			const warehouses = await getWarehouses(query);

			res.status(200).json(warehouses);
		} catch(err) {
			next(err);
		}
	});
};