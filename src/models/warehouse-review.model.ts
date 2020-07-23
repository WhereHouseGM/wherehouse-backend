import { Table, Column, PrimaryKey, AutoIncrement, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import UserModel from './user.model';
import WarehouseModel from './warehouse.model';

@Table({ modelName: "warehouse_reviews" })
class WarehouseReviewModel extends Model<WarehouseReviewModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id: number;

    @Column(DataTypes.INTEGER)
    rating: number;

    @Column(DataTypes.STRING(1024))
    content: string;

    @ForeignKey(() => UserModel)
    @Column(DataTypes.INTEGER)
    writerId: number;

    @BelongsTo(() => UserModel)
    writer: UserModel;

    @ForeignKey(() => WarehouseModel)
    @Column(DataTypes.INTEGER)
    warehouseId: number;

    @BelongsTo(() => WarehouseModel)
    warehouse: UserModel;
}

export default WarehouseReviewModel;