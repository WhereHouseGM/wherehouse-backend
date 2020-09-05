module.exports = (sequelize, DataTypes) => {
	const modelName = "deliveryTypes";
	const tableName = "delivery_types";

	const DeliveryType = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING(30), allowNull: false }
	}, { tableName, timestamps: false });

	return DeliveryType;
};