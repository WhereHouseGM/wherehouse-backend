import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import WarehouseType from './warehouse-type';

@Table
class UserDemand extends Model<UserDemand> {
    @Column(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id: number;
    @Column(DataTypes.INTEGER)
    minSize: number;
    @Column(DataTypes.INTEGER)
    maxSize: number;
    @Column(DataTypes.DATE)
    startDate: Date;
    @Column(DataTypes.DATE)
    endDate: Date;
    @Column(DataTypes.STRING(20))
    username: string;
    @Column(DataTypes.STRING(20))
    companyName: string;
    @Column(DataTypes.STRING(20))
    phoneNumber: string;
    @Column(DataTypes.STRING(30))
    email: string;
    @Column(DataTypes.STRING(1024))
    description: string;
    @BelongsTo(() => WarehouseType)
    type: WarehouseType;
}

export default UserDemand;