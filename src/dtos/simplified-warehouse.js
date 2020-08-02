const LocationDto = require("./location");

module.exports = function (warehouse) {
	const size = warehouse.generalDetail === null ? null : warehouse.generalDetail.size;

	return {
		id: warehouse.id,
		name: warehouse.name,
		thumbnailUrl: warehouse.attachments[0] || null,
		size: size,
		canUse: warehouse.canUse,
		location: LocationDto(warehouse.location)
	};
};