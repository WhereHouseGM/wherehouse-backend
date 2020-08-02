module.exports = (sequelize, DataTypes) => {
	const modelName = "agencyWarehousePayments";
	const tableName = "agency_warehouse_payments";

	const AgencyWarehousePayment = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		unit: { type: DataTypes.STRING(10), allowNull: false },
		cost: { type: DataTypes.INTEGER, allowNull: false },
		description: { type: DataTypes.STRING(40), allowNull: false },
		type: { type: DataTypes.ENUM("STORE", "WORK", "DELIVER", "OTHER"), allowNull: false }
	}, { tableName: tableName, timestamps: false });

	return AgencyWarehousePayment;
};