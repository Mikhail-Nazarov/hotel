import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Room } from "../rooms/rooms.models";
import { BedType } from "./bedType.model";

@Table({ tableName: "bedsTypes_rooms", createdAt: false, updatedAt: false })
export class BedTypes_Rooms extends Model<BedTypes_Rooms> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => BedType)
  @Column({
    unique: false,
    type: DataType.INTEGER,
  })
  idBedType: number;

  @ForeignKey(() => Room)
  @Column({
    unique: false,
    type: DataType.INTEGER,
  })
  idRoom: number;
}
