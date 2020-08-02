const db = require("../../models");
const Joi = require("joi");
const { Op } = require("sequelize");

const getWarehousesQueryValidator = Joi.object({
	address: Joi.string(),
	minSize: Joi.number().integer(),
	maxSize: Joi.number().integer()
});

async function findWarehouses(query) {
	let addressQuery, sizeQuery;

	addressQuery = sizeQuery = undefined;

	if(query.address != undefined) {
		addressQuery = { address: { [Op.like]: `%${query.address}%` } };
	}
	if(query.minSize !== undefined) {
		if(sizeQuery === undefined) sizeQuery = { size: {} };
		sizeQuery.size[Op.gte] = query.minSize;
	}
	if(query.maxSize !== undefined) {
		if(sizeQuery === undefined) sizeQuery = { size: {} };
		sizeQuery.size[Op.lte] = query.maxSize;
	}

	return await db.warehouses.findAll({
		include: [
			{ model: db.users, required: true },
			{ model: db.warehouseLocations, required: true },
			{ model: db.warehouseAttachments },
			{ model: db.generalWarehouseDetails, where: sizeQuery },
		],
		where: addressQuery
	});
}

module.exports = (router) => {
	router.get("/warehouses", async function (req, res, next) {
		try {
			const query = req.query;
			getWarehousesQueryValidator.validate(query);

			const warehouses = await findWarehouses(query);

			res.status(200).json({
				warehouses: warehouses.map(_ => {
					return {
						id: _.id,
						name: _.name,
						thumbnailUrl: _.warehouseAttachments[0],
						size: _.generalWarehouseDetail ? _.generalWarehouseDetail.size : null,
						canUse: _.canUse,
						location: _.warehouseLocation
					};
				})
			});
		} catch(err) {
			next(err);
		}
	});
};