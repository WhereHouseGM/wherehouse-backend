import { Table, Column, PrimaryKey, AutoIncrement, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import WarehouseModel from './warehouse.model';

@Table
class WarehouseLocationModel extends Model<WarehouseLocationModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id: number;

    @ForeignKey(() => WarehouseModel)
    @Column(DataTypes.INTEGER)
    typeId: number;

    @BelongsTo(() => WarehouseModel)
    warehouse: WarehouseModel;
  
    @Column(DataTypes.INTEGER)
    latitude: number;

    @Column(DataTypes.STRING(1024))
    longitude: number;
}

export default WarehouseLocationModel;