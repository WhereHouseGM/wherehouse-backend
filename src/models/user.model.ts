import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement, Default } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id: number;

    @Column(DataTypes.STRING(10))
    name: string;

    @Column(DataTypes.STRING(64))
    password: string;

    @Column(DataTypes.STRING(30))
    email: string;

    @Column(DataTypes.ENUM('SHIPPER', 'OWNER'))
    type: string;

    @AllowNull(true)
    @Column(DataTypes.STRING(20))
    telephoneNumber?: string;

    @AllowNull(true)
    @Column(DataTypes.STRING(20))
    companyName?: string;

    @Column(DataTypes.STRING(20))
    phoneNumber: string;

    @Default('USER')
    @Column(DataTypes.ENUM('USER', 'ADMIN'))
    role: string;
}

export default UserModel;