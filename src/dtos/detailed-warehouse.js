const SimplifiedUserDto = require("./simplified-user");
const AttachmentDto = require("./attachment");
const LocationDto = require("./location");
const AgencyWarehouseDetailDto = require("./agency-warehouse-detail");
const GeneralWarehouseDetailDto = require("./general-warehouse-detail");

module.exports = function(warehouse) {
	let additionalInfo;

	if(warehouse.serviceType == "AGENCY")
		additionalInfo = AgencyWarehouseDetailDto(warehouse.agencyDetail);
	else if(warehouse.serviceType == "GENERAL")
		additionalInfo = GeneralWarehouseDetailDto(warehouse.generalDetail);

	return {
		id: warehouse.id,
		name: warehouse.name,
		description: warehouse.description,
		serviceType: warehouse.serviceType,
		types: warehouse.types.map(type => type.name),
		landArea: warehouse.landArea,
		totalArea: warehouse.totalArea,
		owner: SimplifiedUserDto(warehouse.owner),
		address: warehouse.address,
		addressDetail: warehouse.addressDetail,
		availableWeekdays: warehouse.availableWeekdays,
		openAt: warehouse.openAt,
		closeAt: warehouse.closeAt,
		availableTimeDetail: warehouse.availableTimeDetail,
		cctvExist: warehouse.cctvExist,
		securityCompanyExist: warehouse.securityCompanyExist,
		securityCompanyName: warehouse.securityCompanyName,
		doorLockExist: warehouse.doorLockExist,
		airConditioningType: warehouse.airConditioningType,
		workerExist: warehouse.workerExist,
		insuranceExist: warehouse.insuranceExist,
		insuranceName: warehouse.insuranceName,
		canPickup: warehouse.canPickup,
		parkingScale: warehouse.parkingScale,
		canPark: warehouse.canPark,
		attachments: warehouse.attachments.map(_ => AttachmentDto(_)),
		location: LocationDto(warehouse.location),
		additionalInfo: additionalInfo
	};
};
