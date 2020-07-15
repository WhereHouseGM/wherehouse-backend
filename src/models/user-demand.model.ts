import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import WarehouseTypeModel from './warehouse-type.model';

@Table
class UserDemandModel extends Model<UserDemandModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
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

    @ForeignKey(() => WarehouseTypeModel)
    @Column(DataTypes.INTEGER)
    typeId: number;

    @BelongsTo(() => WarehouseTypeModel)
    type: WarehouseTypeModel;
}

export default UserDemandModel;