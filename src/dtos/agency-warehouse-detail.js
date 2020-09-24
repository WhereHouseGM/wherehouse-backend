const AgencyWarehousePaymentDto = require("./agency-warehouse-payment");

module.exports = function (agencyWarehouseDetail) {
	const mainItemTypes = agencyWarehouseDetail.mainItemTypes.map(type => type.name);
	const deliveryCompanies = agencyWarehouseDetail.deliveryTypes.map(deliveryType => deliveryType.name);

	return {
		id: agencyWarehouseDetail.id,
		type: agencyWarehouseDetail.type,
		mainItemTypes,
		storageType: agencyWarehouseDetail.storageType,
		payments: agencyWarehouseDetail.payments.map(_ => AgencyWarehousePaymentDto(_)),
		deliveryCompanies
	};
};