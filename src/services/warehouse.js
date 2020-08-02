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

exports.postWarehouse = async function (userId, postWarehouseRequest) {
	const warehouseId = await db.sequelize.transaction(async function(t) {
		// create warehouse
		const _warehouse = await db.warehouses.create({
			ownerId: userId,
			name: postWarehouseRequest.name,
			serviceType: postWarehouseRequest.serviceType,
			address: postWarehouseRequest.address,
			addressDetail: postWarehouseRequest.addressDetail,
			description: postWarehouseRequest.description,
			availableWeekdays: postWarehouseRequest.availableWeekdays,
			openAt: postWarehouseRequest.openAt,
			closeAt: postWarehouseRequest.closeAt,
			availableTimeDetail: postWarehouseRequest.availableTimeDetail,
			cctvExist: postWarehouseRequest.cctvExist,
			securityCompanyExist: postWarehouseRequest.securityCompanyExist,
			securityCompanyName: postWarehouseRequest.securityCompanyName,
			doorLockExist: postWarehouseRequest.doorLockExist,
			airConditioningType: postWarehouseRequest.airConditioningType,
			workerExist: postWarehouseRequest.workerExist,
			insuranceExist: postWarehouseRequest.insuranceExist,
			insuranceName: postWarehouseRequest.insuranceName,
			canPickup: postWarehouseRequest.canPickup,
			canPark: postWarehouseRequest.canPark,
		}, { transaction: t });

		//create location
		const location = postWarehouseRequest.location;
		await db.warehouseLocations.create({
			latitude: location.latitude,
			longitude: location.longitude,
			warehouseId: _warehouse.id
		}, { transaction: t });

		// create detail
		const serviceType = postWarehouseRequest.serviceType;
		const additionalInfo = postWarehouseRequest.additionalInfo;

		if (serviceType === "GENERAL") {
			await db.generalWarehouseDetails.create({
				type: additionalInfo.type,
				size: additionalInfo.size,
				monthlyFee: additionalInfo.monthlyFee,
				depositFee: additionalInfo.depositFee,
				maintenanceFee: additionalInfo.maintenanceFee,
				minUseTerm: additionalInfo.minUseTerm,
				warehouseId: _warehouse.id
			}, { transaction: t });
		} else {
			const agencyDetail = await db.agencyWarehouseDetails.create({
				type: additionalInfo.type,
				mainItemType: additionalInfo.mainItemType,
				storageType: additionalInfo.storageType,
				warehouseId: _warehouse.id
			}, { transaction: t });

			await Promise.all[additionalInfo.payments.map(async payment => {
				await db.agencyWarehousePayments.create({
					unit: payment.unit,
					cost: payment.cost,
					description: payment.description,
					type: payment.type,
					agencyWarehouseDetailId: agencyDetail.id
				}, { transaction: t });
			})];
		}

		// update attachments
		await Promise.all(postWarehouseRequest.attachmentIds.map(async _ => {
			await db.warehouseAttachments.update(
				{ warehouseId: _warehouse.id },
				{ where: { id: _ }, transaction: t }
			);
		}));

		return _warehouse.id;
	});

	return await exports.getWarehouse(warehouseId);
};