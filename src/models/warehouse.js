module.exports = (sequelize, DataTypes) => {
	const modelName = "warehouses";
	const tableName = "warehouses";

	const Warehouse = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		canUse: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
		name: { type: DataTypes.STRING(20), allowNull: false },
		serviceType: { type: DataTypes.ENUM("GENERAL", "AGENCY"), allowNull: false },
		address: { type: DataTypes.STRING(100), allowNull: false },
		addressDetail: { type: DataTypes.STRING(100), allowNull: false },
		description: { type: DataTypes.STRING(400), allowNull: false },
		availableWeekdays: { type: DataTypes.INTEGER, allowNull: false },
		openAt: { type: DataTypes.TIME, allowNull: false },
		closeAt: { type: DataTypes.TIME, allowNull: false },
		availableTimeDetail: { type: DataTypes.STRING(100), allowNull: true, defaultValue: null },
		cctvExist: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		securityCompanyExist: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		securityCompanyName: { type: DataTypes.STRING(100), allowNull: true, defaultValue: null },
		doorLockExist: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
		airConditioningType: { type: DataTypes.ENUM("HEATING", "COOLING", "NONE"), defaultValue: "NONE" },
		workerExist: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		insuranceExist: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		insuranceName: { type: DataTypes.STRING(100), allowNull: true, defaultValue: null },
		canPickup: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		canPark: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		parkingScale: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null}
	}, { tableName: tableName, timestamps: false });

	Warehouse.associate = function (db) {
		db.warehouses.hasOne(db.generalWarehouseDetails, { as: "generalDetail", foreignKey: "warehouseId", onUpdate: "cascade", onDelete: "cascade"});
		db.warehouses.hasOne(db.agencyWarehouseDetails, { as: "agencyDetail", foreignKey: "warehouseId", onUpdate: "cascade", onDelete: "cascade"});
		db.warehouses.hasOne(db.warehouseLocations, { as: "location", foreignKey: "warehouseId", onUpdate: "cascade", onDelete: "cascade"});
		db.warehouses.hasMany(db.warehouseAttachments, { as: "attachments", onUpdate: "cascade", onDelete: "cascade"});
		db.warehouses.belongsTo(db.users, { as: "owner" });
	};

	return Warehouse;
};