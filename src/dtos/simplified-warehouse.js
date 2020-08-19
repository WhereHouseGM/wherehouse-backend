const LocationDto = require("./location");

module.exports = function (warehouse) {
	const size = warehouse.generalDetail === null ? null : warehouse.generalDetail.size;
	const types = warehouse.generalDetail === null ? [warehouse.agencyDetail.type] : warehouse.generalDetail.types.map(type => type.name);

	return {
		id: warehouse.id,
		name: warehouse.name,
		types,
		thumbnailUrl: warehouse.attachments[0] || null,
		size: size,
		canUse: warehouse.canUse,
		location: LocationDto(warehouse.location)
	};
};
