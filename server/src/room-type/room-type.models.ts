import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Room } from "../rooms/rooms.models";

interface RoomTypeCreationAttrs {
  name: string;
  description: string;
}

@Table({ tableName: "rooms_types" })
export class RoomType extends Model<RoomType, RoomTypeCreationAttrs> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @HasMany(() => Room) rooms: Room[];
}
