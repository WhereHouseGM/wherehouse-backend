import { Table, Column, PrimaryKey, AutoIncrement, Model, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './user';

@Table
class WarehouseReview extends Model<WarehouseReview> {
  @Column(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  id: number;
  @Column(DataTypes.INTEGER)
  rating: number;
  @Column(DataTypes.STRING(1024))
  content: string;
  @BelongsTo(() => User)
  writer: User;
}

export default WarehouseReview;