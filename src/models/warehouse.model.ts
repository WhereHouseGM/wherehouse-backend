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

@Table({ modelName: "warehouses", timestamps: false })
class WarehouseModel extends Model<WarehouseModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataTypes.STRING(20))
    name: string;

    @AllowNull(false)
    @Column(DataTypes.BOOLEAN)
    canUse: boolean;

    @AllowNull(false)
    @ForeignKey(() => WarehouseTypeModel)
    @Column(DataTypes.INTEGER)
    typeId: number;

    @BelongsTo(() => WarehouseTypeModel)
    type: WarehouseTypeModel;

    @AllowNull(false)
    @ForeignKey(() => UserModel)
    @Column(DataTypes.INTEGER)
    userId: number;

    @BelongsTo(() => UserModel)
    owner: UserModel;

    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    size: number;

    @AllowNull(false)
    @Column(DataTypes.STRING(100))
    address: string;

    @AllowNull(false)
    @Column(DataTypes.STRING(100))
    addressDetail: string;

    @AllowNull(false)
    @Column(DataTypes.STRING(1024))
    description: string;

    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    availableWeekdays: number;

    @AllowNull(false)
    @Column(DataTypes.TIME)
    openAt: Date;

    @AllowNull(false)
    @Column(DataTypes.TIME)
    closeAt: Date;

    @AllowNull(true)
    @Column(DataTypes.STRING(100))
    availableTimeDetail: string;

    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    monthlyFee: number;

    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    depositFee: number;

    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    maintenanceFee: number;

    @AllowNull(true)
    @Column(DataTypes.INTEGER)
    minUseTerm: number;

    @AllowNull(false)
    @Default(false)
    @Column(DataTypes.BOOLEAN)
    cctvExist: boolean;

    @AllowNull(false)
    @Default(false)
    @Column(DataTypes.BOOLEAN)
    securityCompanyExist: boolean;

    @AllowNull(true)
    @Default(null)
    @Column(DataTypes.STRING(100))
    securityCompanyName: string;

    @AllowNull(false)
    @Default(false)
    @Column(DataTypes.BOOLEAN)
    doorlockExist: boolean;

    @AllowNull(false)
    @Default('NONE')
    @Column(DataTypes.ENUM('HEATING', 'COOLING', 'NONE'))
    airConditioningType: string;

    @AllowNull(false)
    @Default(false)
    @Column(DataTypes.BOOLEAN)
    workerExist: boolean;

    @AllowNull(false)
    @Default(false)
    @Column(DataTypes.BOOLEAN)
    insuranceExist: boolean;

    @AllowNull(true)
    @Default(null)
    @Column(DataTypes.STRING(100))
    insuranceName: string;

    @AllowNull(false)
    @Default(false)
    @Column(DataTypes.BOOLEAN)
    canPickup: boolean;

    @AllowNull(false)
    @Default(false)
    @Column(DataTypes.BOOLEAN)
    canPark: boolean;
}

export default WarehouseModel;