module.exports = function (generalWarehouseDetail) {
	return {
		id: generalWarehouseDetail.id,
		type: generalWarehouseDetail.type,
		landArea: generalWarehouseDetail.landArea,
		totalArea: generalWarehouseDetail.totalArea,
		monthlyFee: generalWarehouseDetail.monthlyFee,
		depositFee: generalWarehouseDetail.depositFee,
		maintenanceFee: generalWarehouseDetail.maintenanceFee,
		minUseTerm: generalWarehouseDetail.minUseTerm
	};
};