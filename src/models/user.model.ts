import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement, Default } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ modelName: "users" })
class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataTypes.STRING(10))
    name: string;

    @AllowNull(false)
    @Column(DataTypes.STRING(64))
    password: string;

    @AllowNull(false)
    @Column(DataTypes.STRING(30))
    email: string;

    @AllowNull(false)
    @Column(DataTypes.ENUM('SHIPPER', 'OWNER'))
    type: string;

    @AllowNull(true)
    @Column(DataTypes.STRING(20))
    telephoneNumber?: string;

    @AllowNull(true)
    @Column(DataTypes.STRING(20))
    companyName?: string;

    @AllowNull(false)
    @Column(DataTypes.STRING(20))
    phoneNumber: string;

    @Default('USER')
    @Column(DataTypes.ENUM('USER', 'ADMIN'))
    role: string;
}

export default UserModel;