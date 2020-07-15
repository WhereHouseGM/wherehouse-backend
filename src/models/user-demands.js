export default (sequelize, DataTypes) => {
  const UserDemand = sequelize.define('user-demand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    minSize: { type: DataTypes.INTEGER, allowNull: false },
    maxSize: { type: DataTypes.INTEGER, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    username: { type: DataTypes.STRING(20), allowNull: false },
    companyName: { type: DataTypes.STRING(20) },
    phoneNumber: { type: DataTypes.STRING(20) },
    email: { type: DataTypes.STRING(30) },
    description: { type: DataTypes.STRING(1024) }
  }, {
    sequelize,
    timestamps: false
  });

  UserDemand.associate = (models) => {
    UserDemand.belongsTo(models.warehouseType);
  };
  
  return UserDemand;
}