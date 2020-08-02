module.exports = function (agencyWarehousePayment) {
	return {
		id: agencyWarehousePayment.id,
		unit: agencyWarehousePayment.unit,
		cost: agencyWarehousePayment.cost,
		description: agencyWarehousePayment.description,
		type: agencyWarehousePayment.type
	};
};