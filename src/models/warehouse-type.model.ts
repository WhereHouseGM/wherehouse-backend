import { Table, Column, PrimaryKey, AutoIncrement, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
class WarehouseType extends Model<WarehouseType> {
    @Column(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id: number;
    @Column(DataTypes.STRING(20))
    name: string;
}

export default WarehouseType;