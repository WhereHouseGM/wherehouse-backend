export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(10), allowNull: false },
    email: { type: DataTypes.STRING(30), allowNull: false },
    type: { type: DataTypes.ENUM('SHIPPER', 'OWNER'), allowNull: false },
    telephoneNumber: { type: DataTypes.STRING(20) },
    companyName: { type: DataTypes.STRING(20) },
    phoneNumber: { type: DataTypes.STRING(20), allowNull: false },
    role: {type: DataTypes.ENUM('USER', 'ADMIN'), defaultValue: 'USER'}
  }, {
    sequelize,
    timestamps: false
  });

  return User;
}