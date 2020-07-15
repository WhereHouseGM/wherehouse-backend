import { Table, Column, PrimaryKey, AutoIncrement, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import WarehouseModel from './warehouse.model';

@Table
class WarehouseAttachmentModel extends Model<WarehouseAttachmentModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id: number;

    @ForeignKey(() => WarehouseModel)
    @Column(DataTypes.INTEGER)
    warehouseId: number;

    @BelongsTo(() => WarehouseModel)
    warehouse: WarehouseModel;

    @Column(DataTypes.STRING(30))
    url: string;
}

export default WarehouseAttachmentModel;