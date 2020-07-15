import { Table, Column, PrimaryKey, AutoIncrement, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
class WarehouseTypeModel extends Model<WarehouseTypeModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id: number;

    @Column(DataTypes.STRING(20))
    name: string;
}

export default WarehouseTypeModel;