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
		availableTimeDetail: { type: DataTypes.STRING(100) },
		cctvExist: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		securityCompanyExist: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		securityCompanyName: { type: DataTypes.STRING(100) },
		doorLockExist: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
		airConditioningType: { type: DataTypes.ENUM("HEATING", "COOLING", "NONE"), defaultValue: "NONE" },
		workerExist: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		insuranceExist: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		insuranceName: { type: DataTypes.STRING(100) },
		canPickup: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
		canPark: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false }
	}, { tableName: tableName, timestamps: false });

	Warehouse.associate = function (db) {
		db.warehouses.hasOne(db.generalWarehouseDetails, { onUpdate: "cascade", onDelete: "cascade"});
		db.warehouses.hasOne(db.agencyWarehouseDetails, { onUpdate: "cascade", onDelete: "cascade"});
		db.warehouses.hasOne(db.warehouseLocations, { onUpdate: "cascade", onDelete: "cascade"});
		db.warehouses.hasMany(db.warehouseAttachments, { onUpdate: "cascade", onDelete: "cascade"});
		db.warehouses.belongsTo(db.users);
	};

	return Warehouse;
};