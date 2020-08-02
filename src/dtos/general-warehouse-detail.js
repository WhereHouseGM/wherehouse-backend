module.exports = function (generalWarehouseDetail) {
	return {
		id: generalWarehouseDetail.id,
		type: generalWarehouseDetail.type,
		size: generalWarehouseDetail.size,
		monthlyFee: generalWarehouseDetail.monthlyFee,
		depositFee: generalWarehouseDetail.depositFee,
		maintenanceFee: generalWarehouseDetail.maintenanceFee,
		minUseTerm: generalWarehouseDetail.minUseTerm
	};
};