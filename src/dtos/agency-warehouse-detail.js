const AgencyWarehousePaymentDto = require("./agency-warehouse-payment");

module.exports = function (agencyWarehouseDetail) {
	const mainItemTypes = agencyWarehouseDetail.mainItemTypes.map(type => type.name);

	return {
		id: agencyWarehouseDetail.id,
		type: agencyWarehouseDetail.type,
		mainItemTypes,
		storageType: agencyWarehouseDetail.storageType,
		payments: agencyWarehouseDetail.payments.map(_ => AgencyWarehousePaymentDto(_))
	};
};