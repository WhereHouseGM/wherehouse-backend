import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsTo, Default, AllowNull } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import WarehouseType from './warehouse-type.model';
import User from './user.model';

@Table
class Warehouse extends Model<Warehouse> {
  @Column(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  id: number;

  @Column(DataTypes.BOOLEAN)
  canUse: boolean;

  @BelongsTo(() => WarehouseType)
  type: WarehouseType;

  @BelongsTo(() => User)
  owner: User;

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

  @Column(DataTypes.STRING(100))
  @AllowNull(true)
  availableTimeDetail: string;

  @Column(DataTypes.INTEGER)
  monthlyFee: number;

  @Column(DataTypes.INTEGER)
  depositFee: number;

  @Column(DataTypes.INTEGER)
  maintenanceFee: number;

  @Column(DataTypes.INTEGER)
  @AllowNull(true)
  minUseTerm: number;

  @Column(DataTypes.BOOLEAN)
  @Default(false)
  cctvExist: boolean;

  @Column(DataTypes.BOOLEAN)
  @Default(false)
  securityCompanyExist: boolean;

  @Column(DataTypes.STRING(100))
  @AllowNull(true)
  @Default(null)
  securityCompanyName: string;

  @Column(DataTypes.BOOLEAN)
  @Default(false)
  doorlockExist: boolean;

  @Column(DataTypes.ENUM('HEATING', 'COOLING', 'NONE'))
  @Default('NONE')
  airConditioningType: string;

  @Column(DataTypes.BOOLEAN)
  @Default(false)
  workerExist: boolean;

  @Column(DataTypes.BOOLEAN)
  @Default(false)
  insuranceExist: boolean;

  @Column(DataTypes.STRING(100))
  @AllowNull(true)
  @Default(null)
  insuranceName: string;

  @Column(DataTypes.BOOLEAN)
  @Default(false)
  canPickup: boolean;

  @Column(DataTypes.BOOLEAN)
  @Default(false)
  canPark: boolean;
}

export default Warehouse;