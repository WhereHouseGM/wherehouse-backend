module.exports = (sequelize, DataTypes) => {
	const modelName = "agencyMainItemTypes";
	const tableName = "agency_main_item_types";

	const AgencyMainItemTypes = sequelize.define(modelName, {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: {
			type: DataTypes.ENUM("CLOTH", "FOOD", "ACCESSORY", "ELECTRONIC", "COSMETIC", "COMPONENT", "FURNITURE", "RAW_MATERIAL"),
			allowNull: false
		}
	}, {tableName, timestamps: false});

	return AgencyMainItemTypes;
}