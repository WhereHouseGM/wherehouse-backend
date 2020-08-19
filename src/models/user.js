module.exports = (sequelize, DataTypes) => {
	const modelName = "users";
	const tableName = "users";

	const User = sequelize.define(modelName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		password: { type: DataTypes.STRING(64), allowNull: false },
		name: { type: DataTypes.STRING(10), allowNull: false },
		email: { type: DataTypes.STRING(30), allowNull: false, unique: true},
		type: { type: DataTypes.ENUM("SHIPPER", "OWNER"), allowNull: false },
		telephoneNumber: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null },
		companyName: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null },
		phoneNumber: { type: DataTypes.STRING(20), allowNull: false },
		role: { type: DataTypes.ENUM("USER", "ADMIN"), allowNull: false, defaultValue: "USER" }
	}, { tableName: tableName, timestamps: false });

	return User;
};
