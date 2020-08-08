const AgencyWarehousePaymentDto = require("./agency-warehouse-payment");

module.exports = function (agencyWarehouseDetail) {
	return {
		id: agencyWarehouseDetail.id,
		type: agencyWarehouseDetail.type,
		mainItemType: agencyWarehouseDetail.mainItemType,
		storageType: agencyWarehouseDetail.storageType,
		payments: agencyWarehouseDetail.payments.map(_ => AgencyWarehousePaymentDto(_))
	};
};