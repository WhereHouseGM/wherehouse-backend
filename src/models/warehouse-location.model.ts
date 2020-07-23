import { Table, Column, PrimaryKey, AutoIncrement, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import WarehouseModel from './warehouse.model';

@Table({ modelName: "warehouse_locations", timestamps: false })
class WarehouseLocationModel extends Model<WarehouseLocationModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id: number;

    @ForeignKey(() => WarehouseModel)
    @Column(DataTypes.INTEGER)
    warehouseId: number;

    @BelongsTo(() => WarehouseModel)
    warehouse: WarehouseModel;
  
    @Column(DataTypes.DOUBLE)
    latitude: number;

    @Column(DataTypes.DOUBLE)
    longitude: number;
}

export default WarehouseLocationModel;