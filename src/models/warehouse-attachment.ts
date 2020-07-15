import { Table, Column, PrimaryKey, AutoIncrement, Model, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Warehouse from './warehouse';

@Table
class WarehouseAttachment extends Model<WarehouseAttachment> {
    @Column(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id: number;

    @BelongsTo(() => Warehouse)
    warehouse: Warehouse;

    @Column(DataTypes.STRING(30))
    url: string;
}

export default WarehouseAttachment;