const { Op } = require("sequelize");
const db = require("../models");
const HTTPError = require("node-http-error");

exports.getWarehouses = async function (query) {
	let addressQuery, sizeQuery;
	let queryOption;

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

	queryOption = {
		include: [
			{model: db.users, required: true, as: "owner"},
			{model: db.warehouseLocations, required: true, as: "location"},
			{model: db.warehouseAttachments, as: "attachments"},
			{model: db.warehouseTypes, as: "types"},
			{
				model: db.generalWarehouseDetails,
				where: sizeQuery,
				as: "generalDetail",
			},
			{
				model: db.agencyWarehouseDetails,
				include: [
					{ model: db.agencyWarehousePayments, as: "payments" },
					{ model: db.agencyMainItemTypes, as: "mainItemTypes" }
				],
				as: "agencyDetail"
			}
		],
		where: addressQuery
	};

	if(query.offset !== undefined) queryOption.offset = query.offset;
	if(query.limit !== undefined) queryOption.limit = query.limit;

	const warehouses = await db.warehouses.findAll(queryOption);

	return warehouses;
};

exports.getWarehouse = async function (warehouseId) {
	const warehouse = await db.warehouses.findByPk(warehouseId, {
		include: [
			{ model: db.users, required: true, as: "owner" },
			{ model: db.warehouseLocations, required: true, as: "location" },
			{ model: db.warehouseAttachments, as: "attachments" },
			{ model: db.warehouseTypes, as: "types" },
			{ model: db.generalWarehouseDetails, as: "generalDetail" },
			{
				model: db.agencyWarehouseDetails,
				include: [
					{ model: db.agencyWarehousePayments, as: "payments" },
					{ model: db.agencyMainItemTypes, as: "mainItemTypes" },
					{ model: db.deliveryTypes, as: "deliveryTypes" }
				],
				as: "agencyDetail"
			}
		]
	});

	if(warehouse === null) throw new HTTPError(404, "Not Found Error");

	return warehouse;
};

exports.postWarehouse = async function (userId, postWarehouseRequest) {
	const warehouseId = await db.sequelize.transaction(async function(t) {
		postWarehouseRequest.types = postWarehouseRequest.types.map(type => { return { name: type }; });
		postWarehouseRequest.deliveryCompanies.map(deliveryType => { return { name: deliveryType }; });
		
		const { attachmentIds, location, additionalInfo, ...warehouseFields } = postWarehouseRequest;
		// create warehouse
		const _warehouse = await db.warehouses.create({
			ownerId: userId,
			...warehouseFields
		}, { transaction: t, include: [ { model: db.warehouseTypes, as: "types" }] });

		//create location
		await db.warehouseLocations.create({
			...location,
			warehouseId: _warehouse.id
		}, { transaction: t });

		// create detail
		const serviceType = postWarehouseRequest.serviceType;

		if (serviceType === "GENERAL") {
			await db.generalWarehouseDetails.create({
				...additionalInfo,
				warehouseId: _warehouse.id
			}, { transaction: t });
		} else {
			additionalInfo.mainItemTypes = additionalInfo.mainItemTypes.map(type => { return { name: type }; });

			await db.agencyWarehouseDetails.create({
				...additionalInfo,
				warehouseId: _warehouse.id
			}, { transaction: t, include: [
				{ model: db.agencyWarehousePayments, as: "payments" },
				{ model: db.agencyMainItemTypes, as: "mainItemTypes" },
				{ model: db.deliveryTypes, as: "deliveryTypes" }
			] });
		}

		// update attachments
		await Promise.all(attachmentIds.map(async _ => {
			await db.warehouseAttachments.update(
				{ warehouseId: _warehouse.id },
				{ where: { id: _ }, transaction: t }
			);
		}));

		return _warehouse.id;
	});

	return await exports.getWarehouse(warehouseId);
};

exports.patchWarehouse = async function (userId, warehouseId, patchWarehouseRequest) {
	const warehouse = await exports.getWarehouse(warehouseId);

	if(warehouse.owner.id !== userId) throw new HTTPError(403, "Only owner can patch");

	const { attachmentIds, additionalInfo, location, ...warehouseFields } = patchWarehouseRequest;
	let updatedAttachmentIds = attachmentIds || [];

	await db.sequelize.transaction(async t => {
		await warehouse.update(warehouseFields, { transaction: t });
		await warehouse.location.update(location, { transaction: t });

		if(warehouse.serviceType === "GENERAL") await warehouse.generalDetail.update(additionalInfo, { transaction: t });
		else if(warehouse.serviceType === "AGENCY") await warehouse.agencyDetail.update(additionalInfo, { transaction: t });

		const originalAttachmentIds = warehouse.attachments.map(attachment => attachment.id);
		const deleteAttachmentIds = originalAttachmentIds.filter(id => !updatedAttachmentIds.includes(id));
		const newAttachmentIds = updatedAttachmentIds.filter(id => !originalAttachmentIds.includes(id));

		await Promise.all(deleteAttachmentIds.map(async id => {
			await db.warehouseAttachments.destroy({ where: { id: id }, transaction: t });
		}));

		await Promise.all(newAttachmentIds.map(async id => {
			const updatedRows = await db.warehouseAttachments.update(
				{ warehouseId: warehouse.id },
				{ where: { id: id }, transaction: t }
			);

			if(updatedRows[0] === 0) throw new HTTPError(404, `Attachment ${id} not found`);
		}));
	});

	return await exports.getWarehouse(warehouseId);
};

exports.deleteWarehouse = async function (userId, warehouseId) {
	const warehouse = await exports.getWarehouse(warehouseId);

	if(warehouse.owner.id !== userId) throw new HTTPError(403, "Only owner can patch");

	await warehouse.destroy();
};