module.exports = (sequelize, DataTypes) => {
	const modelName = "agencyWarehouseDetails";
	const tableName = "agency_warehouse_details";

	const AgencyWarehouseDetail = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		type: { type: DataTypes.ENUM("3PL", "FULLFILMENT"), allowNull: false },
		storageType: { type: DataTypes.ENUM("PALLET", "BOX", "SPECIAL"), allowNull: false },
	}, { tableName: tableName, timestamps: false });

	AgencyWarehouseDetail.associate = function (db) {
		db.agencyWarehouseDetails.hasMany(db.agencyWarehousePayments, { as: "payments", onUpdate: "cascade", onDelete: "cascade" });
		db.agencyWarehouseDetails.hasMany(db.deliveryTypes, { as: "deliveryTypes" });
		db.agencyWarehouseDetails.hasMany(db.agencyMainItemTypes, { as: "mainItemTypes" });
	};

	return AgencyWarehouseDetail;
};