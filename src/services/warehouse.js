const { Op } = require("sequelize");
const db = require("../models");
const HTTPError = require("node-http-error");

exports.getWarehouses = async function (query) {
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

	const warehouses = await db.warehouses.findAll({
		include: [
			{ model: db.users, required: true },
			{ model: db.warehouseLocations, required: true },
			{ model: db.warehouseAttachments },
			{ model: db.generalWarehouseDetails, where: sizeQuery },
		],
		where: addressQuery
	});

	return {
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
	};
};

exports.getWarehouse = async function (warehouseId) {
	const warehouse = await db.warehouses.findByPk(warehouseId, {
		include: [
			{ model: db.users, required: true },
			{ model: db.warehouseLocations, required: true },
			{ model: db.warehouseAttachments },
			{ model: db.generalWarehouseDetails },
			{
				model: db.agencyWarehouseDetails,
				include: [ db.agencyWarehousePayments ]
			}
		]
	});

	if(warehouse === null) throw new HTTPError(404, "Not Found Error");

	return warehouse;
};