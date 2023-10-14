import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Room } from "../rooms/rooms.models";
import { Booking } from "./bookings.model";

@Table({ tableName: "bookings_rooms", createdAt: false, updatedAt: false })
export class BookingsRooms extends Model<BookingsRooms> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Booking)
  @Column({
    unique: false,
    type: DataType.INTEGER,
  })
  idBooking: number;

  @ForeignKey(() => Room)
  @Column({
    unique: false,
    type: DataType.INTEGER,
  })
  idRoom: number;
}
