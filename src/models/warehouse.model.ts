import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
    Default,
    AllowNull,
    ForeignKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import WarehouseTypeModel from './warehouse-type.model';
import UserModel from './user.model';

@Table
class WarehouseModel extends Model<WarehouseModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id: number;

    @Column(DataTypes.BOOLEAN)
    canUse: boolean;

    @ForeignKey(() => WarehouseTypeModel)
    @Column(DataTypes.INTEGER)
    typeId: number;

    @BelongsTo(() => WarehouseTypeModel)
    type: WarehouseTypeModel;

    @ForeignKey(() => UserModel)
    @Column(DataTypes.INTEGER)
    userId: number;

    @BelongsTo(() => UserModel)
    owner: UserModel;

    @Column(DataTypes.INTEGER)
    size: number;

    @Column(DataTypes.STRING(100))
    address: string;

    @Column(DataTypes.STRING(100))
    addressDetail: string;

    @Column(DataTypes.STRING(1024))
    description: string;

    @Column(DataTypes.INTEGER)
    availableWeekdays: number;

    @Column(DataTypes.TIME)
    openAt: Date;

    @Column(DataTypes.TIME)
    closeAt: Date;

    @AllowNull(true)
    @Column(DataTypes.STRING(100))
    availableTimeDetail: string;

    @Column(DataTypes.INTEGER)
    monthlyFee: number;

    @Column(DataTypes.INTEGER)
    depositFee: number;

    @Column(DataTypes.INTEGER)
    maintenanceFee: number;

    @AllowNull(true)
    @Column(DataTypes.INTEGER)
    minUseTerm: number;

    @Default(false)
    @Column(DataTypes.BOOLEAN)
    cctvExist: boolean;

    @Default(false)
    @Column(DataTypes.BOOLEAN)
    securityCompanyExist: boolean;

    @AllowNull(true)
    @Default(null)
    @Column(DataTypes.STRING(100))
    securityCompanyName: string;

    @Default(false)
    @Column(DataTypes.BOOLEAN)
    doorlockExist: boolean;

    @Default('NONE')
    @Column(DataTypes.ENUM('HEATING', 'COOLING', 'NONE'))
    airConditioningType: string;

    @Default(false)
    @Column(DataTypes.BOOLEAN)
    workerExist: boolean;

    @Default(false)
    @Column(DataTypes.BOOLEAN)
    insuranceExist: boolean;

    @AllowNull(true)
    @Default(null)
    @Column(DataTypes.STRING(100))
    insuranceName: string;

    @Default(false)
    @Column(DataTypes.BOOLEAN)
    canPickup: boolean;

    @Default(false)
    @Column(DataTypes.BOOLEAN)
    canPark: boolean;
}

export default WarehouseModel;