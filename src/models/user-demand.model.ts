import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import WarehouseTypeModel from './warehouse-type.model';

@Table({ modelName: "user_demands" })
class UserDemandModel extends Model<UserDemandModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    minSize: number;

    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    maxSize: number;

    @AllowNull(false)
    @Column(DataTypes.DATE)
    startDate: Date;

    @AllowNull(false)
    @Column(DataTypes.DATE)
    endDate: Date;

    @AllowNull(false)
    @Column(DataTypes.STRING(20))
    username: string;

    @AllowNull(false)
    @Column(DataTypes.STRING(20))
    companyName: string;

    @AllowNull(false)
    @Column(DataTypes.STRING(20))
    phoneNumber: string;

    @AllowNull(false)
    @Column(DataTypes.STRING(30))
    email: string;

    @AllowNull(false)
    @Column(DataTypes.STRING(1024))
    description: string;

    @AllowNull(false)
    @ForeignKey(() => WarehouseTypeModel)
    @Column(DataTypes.INTEGER)
    typeId: number;

    @BelongsTo(() => WarehouseTypeModel)
    type: WarehouseTypeModel;
}

export default UserDemandModel;