const Joi = require("joi");
const { getWarehouses, getWarehouse, postWarehouse, patchWarehouse, deleteWarehouse } = require("../../services/warehouse");
const { authorize } = require("../../middlewares/auth");
const SimplifiedWarehouseDto = require("../../dtos/simplified-warehouse");
const DetailedWarehouseDto = require("../../dtos/detailed-warehouse");

const getWarehousesQueryValidator = Joi.object({
	address: Joi.string(),
	minSize: Joi.number().integer(),
	maxSize: Joi.number().integer(),
	offset: Joi.number().integer(),
	limit: Joi.number().integer()
});

const postWarehouseLocationRequestValidator = Joi.object({
	latitude: Joi.number().required(),
	longitude: Joi.number().required()
});

const postGeneralWarehouseDetailValidator = Joi.object({
	monthlyFee: Joi.number().integer().required(),
	depositFee: Joi.number().integer().required(),
	maintenanceFee: Joi.number().integer().required(),
	minUseTerm: Joi.number().integer()
});

const postAgencyWarehousePaymentValidator = Joi.object({
	unit: Joi.string().max(10).required(),
	cost: Joi.number().integer().required(),
	description: Joi.string().max(40).required(),
	type: Joi.string().valid("STORE", "WORK", "DELIVER", "OTHER").required()
});

const postAgencyWarehouseDetailValidator = Joi.object({
	type: Joi.string().valid("3PL", "FULLFILMENT").required(),
	mainItemTypes: Joi.array().items(Joi.string().valid("CLOTH", "FOOD", "ACCESSORY", "ELECTRONIC", "COSMETIC", "COMPONENT", "RAW_MATERIAL")).required(),
	storageType: Joi.string().valid("PALLET", "BOX", "SPECIAL").required(),
	payments: Joi.array().items(postAgencyWarehousePaymentValidator)
});

const postWarehouseRequestValidator = Joi.object({
	name: Joi.string().max(20).required(),
	serviceType: Joi.string().valid("GENERAL", "AGENCY").required(),
	types: Joi.array().items(Joi.string().valid("ROOM_TEMPERATURE", "LOW_TEMPERATURE", "BONDED", "SAVAGE", "HAZARDOUS", "SELF_STORAGE", "CONTAINER"))	.required(),
	landArea: Joi.number().integer().required(),
	totalArea: Joi.number().integer().required(),
	address: Joi.string().max(100).required(),
	addressDetail: Joi.string().max(100).required(),
	description: Joi.string().max(400).required(),
	availableWeekdays: Joi.number().integer().required(),
	openAt: Joi.string().regex(/^([0-9]{2}\:[0-9]{2}\:[0-9]{2})/).required(),
	closeAt: Joi.string().regex(/^([0-9]{2}\:[0-9]{2}\:[0-9]{2})/).required(),
	availableTimeDetail: Joi.string().max(100).required(),
	cctvExist: Joi.boolean().required(),
	securityCompanyExist: Joi.boolean().required(),
	securityCompanyName: Joi.string().max(100),
	doorLockExist: Joi.boolean().required(),
	airConditioningType: Joi.string().valid("HEATING", "COOLING", "NONE").required(),
	workerExist: Joi.boolean().required(),
	insuranceExist: Joi.boolean().required(),
	insuranceName: Joi.string().max(100),
	canPickup: Joi.boolean().required(),
	canPark: Joi.boolean().required(),
	parkingScale: Joi.number().integer(),
	attachmentIds: Joi.array().items(Joi.number().integer()).required(),
	location: postWarehouseLocationRequestValidator.required(),
	additionalInfo: Joi.any().when("serviceType", { is: "GENERAL", then: postGeneralWarehouseDetailValidator, otherwise: postAgencyWarehouseDetailValidator})
});

const patchWarehouseLocationRequestValidator = Joi.object({
	latitude: Joi.number(),
	longitude: Joi.number()
});

const patchGeneralWarehouseDetailValidator = Joi.object({
	types: Joi.array().items(Joi.string().valid("ROOM_TEMPERATURE", "LOW_TEMPERATURE", "BONDED", "SAVAGE", "HAZARDOUS", "SELF_STORAGE", "CONTAINER")),
	landArea: Joi.number().integer(),
	totalArea: Joi.number().integer(),
	monthlyFee: Joi.number().integer(),
	depositFee: Joi.number().integer(),
	maintenanceFee: Joi.number().integer(),
	minUseTerm: Joi.number().integer()
});

const patchAgencyWarehousePaymentValidator = Joi.object({
	unit: Joi.string().max(10),
	cost: Joi.number().integer(),
	description: Joi.string().max(40),
	type: Joi.string().valid("STORE", "WORK", "DELIVER", "OTHER")
});

const patchAgencyWarehouseDetailValidator = Joi.object({
	type: Joi.string().valid("3PL", "FULLFILMENT"),
	mainItemType: Joi.string().valid("CLOTH", "FOOD", "ACCESSORY", "ELECTRONIC", "COSMETIC", "COMPONENT", "RAW_MATERIAL"),
	storageType: Joi.string().valid("PALLET", "BOX", "SPECIAL"),
	payments: Joi.array().items(patchAgencyWarehousePaymentValidator)
});

const patchWarehouseRequestValidator = Joi.object({
	name: Joi.string().max(20),
	serviceType: Joi.string().valid("GENERAL", "AGENCY"),
	address: Joi.string().max(100),
	addressDetail: Joi.string().max(100),
	description: Joi.string().max(400),
	availableWeekdays: Joi.number().integer(),
	openAt: Joi.string().regex(/^([0-9]{2}\:[0-9]{2}\:[0-9]{2})/),
	closeAt: Joi.string().regex(/^([0-9]{2}\:[0-9]{2}\:[0-9]{2})/),
	availableTimeDetail: Joi.string().max(100),
	cctvExist: Joi.boolean(),
	securityCompanyExist: Joi.boolean(),
	securityCompanyName: Joi.string().max(100),
	doorLockExist: Joi.boolean(),
	airConditioningType: Joi.string().valid("HEATING", "COOLING", "NONE"),
	workerExist: Joi.boolean(),
	insuranceExist: Joi.boolean(),
	insuranceName: Joi.string().max(100),
	canPickup: Joi.boolean(),
	canPark: Joi.boolean(),
	attachmentIds: Joi.array().items(Joi.number().integer()),
	location: patchWarehouseLocationRequestValidator,
	additionalInfo: Joi.any().when("serviceType", { is: "GENERAL", then: patchGeneralWarehouseDetailValidator, otherwise: patchAgencyWarehouseDetailValidator})
});

module.exports = (router) => {
	router.get("/warehouses", async function (req, res, next) {
		try {
			const query = req.query;
			const { value, error } = getWarehousesQueryValidator.validate(query);
			if(error) throw error;

			const warehouses = await getWarehouses(value);

			res.status(200).json({ warehouses: warehouses.map(warehouse => SimplifiedWarehouseDto(warehouse)) });
		} catch(err) {
			next(err);
		}
	});

	router.post("/warehouses", authorize(), async function (req, res, next) {
		try {
			const userId = res.locals.userId;
			const { value, error } = postWarehouseRequestValidator.validate(req.body);
			if(error) throw error;

			const warehouse = await postWarehouse(userId, value);
			res.status(201).json({ warehouse: DetailedWarehouseDto(warehouse) });
		} catch(err) {
			next(err);
		}
	});

	router.post("/warehouses", authorize(), async function (req, res, next) {
		try {
			const userId = res.locals.userId;
			const { value, error } = postWarehouseRequestValidator.validate(req.body);
			if(error) throw error;

			const warehouse = await postWarehouse(userId, value);
			res.status(201).json(warehouse);
		} catch(err) {
			next(err);
		}
	});

	router.get("/warehouses/:warehouseId", authorize(), async function (req, res, next) {
		try {
			const warehouseId = req.params.warehouseId;

			const warehouse = await getWarehouse(warehouseId);

			res.status(200).json({ warehouse: DetailedWarehouseDto(warehouse) });
		} catch(err) {
			next(err);
		}
	});

	router.patch("/warehouses/:warehouseId", authorize(), async function (req, res, next) {
		try {
			const userId = res.locals.userId;
			const warehouseId = req.params.warehouseId;
			const {value, error} = patchWarehouseRequestValidator.validate(req.body);
			if (error) throw error;

			const warehouse = await patchWarehouse(userId, warehouseId, value);
			res.status(200).json({warehouse: DetailedWarehouseDto(warehouse)});
		} catch (err) {
			next(err);
		}
	});

	router.delete("/warehouses/:warehouseId", authorize(), async function (req, res, next) {
		try {
			const userId = res.locals.userId;
			const warehouseId = req.params.warehouseId;

			await deleteWarehouse(userId, warehouseId);

			res.status(204).send({});
		} catch(err) {
			next(err);
		}
	});
};