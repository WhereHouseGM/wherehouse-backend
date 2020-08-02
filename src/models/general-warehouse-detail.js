module.exports = (sequelize, DataTypes) => {
	const modelName = "generalWarehouseDetails";
	const tableName = "general_warehouse_details";

	const GeneralWarehouseDetail = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		type: { type: DataTypes.ENUM("ROOM_TEMPERATURE", "LOW_TEMPERATURE", "BONDED", "SAVAGE", "HAZARDOUS", "SELF_STORAGE", "CONTAINER"), allowNull: false },
		size: { type: DataTypes.INTEGER, allowNull: false },
		monthlyFee: { type: DataTypes.INTEGER, allowNull: false },
		depositFee: { type: DataTypes.INTEGER, allowNull: false },
		maintenanceFee: { type: DataTypes.INTEGER, allowNull: false },
		minUseTerm: { type: DataTypes.INTEGER }
	}, { tableName: tableName, timestamps: false });

	return GeneralWarehouseDetail;
};