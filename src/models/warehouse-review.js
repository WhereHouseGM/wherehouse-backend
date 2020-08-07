module.exports = (sequelize, DataTypes) => {
	const modelName = "warehouseReviews";
	const tableName = "warehouse_reviews";

	const WarehouseReview = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		rating: { type: DataTypes.INTEGER, allowNull: false },
		content: { type: DataTypes.STRING(200), allowNull: false }
	}, { tableName: tableName, timestamps: false });

	WarehouseReview.associate = function (db) {
		db.warehouseReviews.belongsTo(db.users, { as: "writer", foreignKey: "writerId" });
		db.warehouseReviews.belongsTo(db.warehouses, { as: "warehouse", foreignKey: "warehouseId" });
	};

	return WarehouseReview;
};