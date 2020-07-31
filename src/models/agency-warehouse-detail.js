module.exports = (sequelize, DataTypes) => {
	const modelName = "agencyWarehouseDetails";
	const tableName = "agency_warehouse_details";

	const AgencyWarehouseDetail = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
		type: { type: DataTypes.ENUM("3PL", "FULLFILMENT"), allowNull: false },
		storageType: { type: DataTypes.ENUM("PALLET", "BOX", "SPECIAL"), allowNull: false },
		mainItemType: { type: DataTypes.ENUM("CLOTH", "FOOD", "ACCESSORY", "ELECTRONIC", "COSMETIC", "COMPONENT", "FURNITURE", "RAW_MATERIAL"), allowNull: false }
	}, { tableName: tableName, timestamps: false });

	return AgencyWarehouseDetail;
};