const LocationDto = require("./location");

module.exports = function (warehouse) {
	const types = warehouse.generalDetail === null ? [warehouse.agencyDetail.type] : warehouse.generalDetail.types.map(type => type.name);
	const landArea = warehouse.generalDetail === null ? null : warehouse.generalDetail.landArea;
	const totalArea = warehouse.generalDetail === null ? null : warehouse.generalDetail.totalArea;

	return {
		id: warehouse.id,
		name: warehouse.name,
		types,
		thumbnailUrl: warehouse.attachments[0] || null,
		landArea,
		totalArea,
		canUse: warehouse.canUse,
		location: LocationDto(warehouse.location)
	};
};
