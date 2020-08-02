const Joi = require("joi");
const { getWarehouses, getWarehouse } = require("../../services/warehouse");
const { authorize } = require("../../middlewares/auth");

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

	router.get("/warehouses/:warehouseId", authorize(), async function (req, res, next) {
		try {
			const warehouseId = req.params.warehouseId;

			const warehouse = await getWarehouse(warehouseId);

			res.status(200).json(warehouse);
		} catch(err) {
			next(err);
		}
	});
};