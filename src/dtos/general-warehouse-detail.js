module.exports = function (generalWarehouseDetail) {
	return {
		id: generalWarehouseDetail.id,
		types: generalWarehouseDetail.types.map(type => type.name),
		landArea: generalWarehouseDetail.landArea,
		totalArea: generalWarehouseDetail.totalArea,
		monthlyFee: generalWarehouseDetail.monthlyFee,
		depositFee: generalWarehouseDetail.depositFee,
		maintenanceFee: generalWarehouseDetail.maintenanceFee,
		minUseTerm: generalWarehouseDetail.minUseTerm
	};
};