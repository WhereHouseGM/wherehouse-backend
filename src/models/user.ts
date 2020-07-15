import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement, Default } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
class User extends Model<User> {
    @Column(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id: number;
    @Column(DataTypes.STRING(10))
    name: string;
    @Column(DataTypes.STRING(64))
    password: string;
    @Column(DataTypes.STRING(30))
    email: string;
    @Column(DataTypes.ENUM('SHIPPER', 'OWNER'))
    type: string;
    @Column(DataTypes.STRING(20))
    @AllowNull(true)
    telephoneNumber?: string;
    @Column(DataTypes.STRING(20))
    @AllowNull(true)
    companyName?: string;
    @Column(DataTypes.STRING(20))
    phoneNumber: string;
    @Column(DataTypes.ENUM('USER', 'ADMIN'))
    @Default('USER')
    role: string;
}

export default User;