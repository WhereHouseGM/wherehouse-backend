module.exports = (sequelize, DataTypes) => {
	const modelName = "warehouseLocations";
	const tableName = "warehouse_locations";

	const WarehouseLocation = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		latitude: { type: DataTypes.DOUBLE, allowNull: false },
		longitude: { type: DataTypes.DOUBLE, allowNull: false }
	}, { tableName: tableName, timestamps: false });

	return WarehouseLocation;
};