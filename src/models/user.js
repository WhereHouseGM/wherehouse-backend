module.exports = (sequelize, DataTypes) => {
	const tableName = "users";

	const User = sequelize.define(tableName, {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		password: { type: DataTypes.STRING(64), allowNull: false },
		name: { type: DataTypes.STRING(10), allowNull: false },
		email: { type: DataTypes.STRING(30), allowNull: false, unique: true},
		type: { type: DataTypes.ENUM("SHIPPER", "OWNER"), allowNull: false },
		telephoneNumber: { type: DataTypes.STRING(20), allowNull: false },
		companyName: { type: DataTypes.STRING(20), allowNull: false },
		phoneNumber: { type: DataTypes.STRING(20), allowNull: false },
		role: { type: DataTypes.ENUM("USER", "ADMIN"), allowNull: false, defaultValue: "USER" }
	}, { tableName: tableName, timestamps: false });

	return User;
};