const LocationDto = require("./location");

module.exports = function (warehouse) {
	const types = warehouse.types.map(type => type.name);

	return {
		id: warehouse.id,
		name: warehouse.name,
		types,
		thumbnailUrl: warehouse.attachments[0] || null,
		landArea: warehouse.landArea,
		totalArea: warehouse.totalArea,
		canUse: warehouse.canUse,
		location: LocationDto(warehouse.location)
	};
};
