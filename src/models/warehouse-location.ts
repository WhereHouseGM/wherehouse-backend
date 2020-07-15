import { Table, Column, PrimaryKey, AutoIncrement, Model, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './user';
import Warehouse from './warehouse';

@Table
class WarehouseLocation extends Model<WarehouseLocation> {
  @Column(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  id: number;

  @BelongsTo(() => Warehouse)
  warehouse: Warehouse;
  
  @Column(DataTypes.INTEGER)
  latitude: number;

  @Column(DataTypes.STRING(1024))
  longitude: string;
}

export default WarehouseLocation;