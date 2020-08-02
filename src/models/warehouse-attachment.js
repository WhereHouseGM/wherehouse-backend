module.exports = (sequelize, DataTypes) => {
	const modelName = "warehouseAttachments";
	const tableName = "warehouse_attachments";

	const WarehouseAttachment = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		url: { type: DataTypes.STRING(30), allowNull: false }
	}, { tableName: tableName, timestamps: false });

	return WarehouseAttachment;
};