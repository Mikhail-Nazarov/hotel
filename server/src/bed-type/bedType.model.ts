import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Room } from "../rooms/rooms.models";
import { BedTypes_Rooms } from "./bedsTypes-rooms.model";

interface BedTypeCreationAttrs {
  size: number;
}

@Table({ tableName: "bed_types" })
export class BedType extends Model<BedType, BedTypeCreationAttrs> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  size: number;

  @BelongsToMany(() => Room, () => BedTypes_Rooms) rooms: Room[];
}
