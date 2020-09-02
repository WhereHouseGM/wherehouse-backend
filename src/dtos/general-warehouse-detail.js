module.exports = function (generalWarehouseDetail) {
	return {
		id: generalWarehouseDetail.id,
		monthlyFee: generalWarehouseDetail.monthlyFee,
		depositFee: generalWarehouseDetail.depositFee,
		maintenanceFee: generalWarehouseDetail.maintenanceFee,
		minUseTerm: generalWarehouseDetail.minUseTerm
	};
};