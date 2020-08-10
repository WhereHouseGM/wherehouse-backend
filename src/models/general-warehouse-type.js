module.exports = (sequelize, DataTypes) => {
	const modelName = "generalWarehouseTypes";
	const tableName = "general_warehouse_types";

	const GeneralWarehouseType = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.ENUM("ROOM_TEMPERATURE", "LOW_TEMPERATURE", "BONDED", "SAVAGE", "HAZARDOUS", "SELF_STORAGE", "CONTAINER"), allowNull: false }
	}, { tableName, timestamps: false });

	return GeneralWarehouseType;
};