import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BedTypes_Rooms } from '../bed-type/bedsTypes-rooms.model';
import { BedType } from '../bed-type/bedType.model';
import { BookingsRooms } from '../bookings/bookings-rooms.model';
import { Booking } from '../bookings/bookings.model';
import { RoomType } from '../room-type/room-type.models';

interface RoomCreationAttrs {
  capacity: number;
  price: number;
  name: string;
  description: string;
  type: number;
  images?: string[];
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RoomCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  capacity: number;

  @ForeignKey(() => RoomType)
  @Column({
    type: DataType.INTEGER,
  })
  type: Number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  images: string[];

  @BelongsToMany(() => Booking, () => BookingsRooms) bookings: Booking[];
  @BelongsToMany(() => BedType, () => BedTypes_Rooms) bedTypes: BedType[];
  @BelongsTo(() => RoomType)
  roomType: RoomType;
}
