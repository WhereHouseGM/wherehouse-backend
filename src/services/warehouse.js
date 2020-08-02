const { Op } = require("sequelize");
const db = require("../models");
const HTTPError = require("node-http-error");
const DetailedWarehouseDto = require("../dtos/detailed-warehouse");
const SimplifiedWarehouseDto = require("../dtos/simplified-warehouse");

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
			{ model: db.users, required: true, as: "owner" },
			{ model: db.warehouseLocations, required: true, as: "location" },
			{ model: db.warehouseAttachments, as: "attachments" },
			{ model: db.generalWarehouseDetails, where: sizeQuery, as: "generalDetail" },
		],
		where: addressQuery
	});

	return {
		warehouses: warehouses.map(_ => SimplifiedWarehouseDto(_))
	};
};

exports.getWarehouse = async function (warehouseId) {
	const warehouse = await db.warehouses.findByPk(warehouseId, {
		include: [
			{ model: db.users, required: true, as: "owner" },
			{ model: db.warehouseLocations, required: true, as: "location" },
			{ model: db.warehouseAttachments, as: "attachments" },
			{ model: db.generalWarehouseDetails, as: "generalDetail" },
			{
				model: db.agencyWarehouseDetails,
				include: [ { model: db.agencyWarehousePayments, as: "payments" } ],
				as: "agencyDetail"
			}
		]
	});

	if(warehouse === null) throw new HTTPError(404, "Not Found Error");

	return DetailedWarehouseDto(warehouse);
};