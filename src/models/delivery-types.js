module.exports = (sequelize, DataTypes) => {
	const modelName = "deliveryTypes";
	const tableName = "delivery_types";

	const DeliveryType = sequelize.define(modelName, {
		id: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
		name: DataTypes.STRING(30), allowNull: false
	}, { tableName, timestamps: false });

	return DeliveryType;
};