module.exports = (sequelize, DataTypes) => {
	const modelName = "generalWarehouseDetails";
	const tableName = "general_warehouse_details";

	const GeneralWarehouseDetail = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		landArea: { type: DataTypes.INTEGER, allowNull: false },
		totalArea: { type: DataTypes.INTEGER, allowNull: false },
		monthlyFee: { type: DataTypes.INTEGER, allowNull: false },
		depositFee: { type: DataTypes.INTEGER, allowNull: false },
		maintenanceFee: { type: DataTypes.INTEGER, allowNull: false },
		minUseTerm: { type: DataTypes.INTEGER }
	}, { tableName: tableName, timestamps: false });

	GeneralWarehouseDetail.associate = function(db) {
		db.generalWarehouseDetails.hasMany(db.generalWarehouseTypes, { as: "types", onUpdate: "cascade", onDelete: "cascade"});
	};

	return GeneralWarehouseDetail;
};