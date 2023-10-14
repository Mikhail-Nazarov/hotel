import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Room } from '../rooms/rooms.models';
import { User } from '../users/users.models';
import { BookingsRooms } from './bookings-rooms.model';

interface BookingCreationAttrs {
  userId: number;
  start_date: Date;
  end_date: Date;
  persons_count: number;
}

@Table({ tableName: 'bookings' })
export class Booking extends Model<Booking, BookingCreationAttrs> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @Column({
    type: DataType.DATE,
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
  })
  end_date: Date;

  @Column({
    type: DataType.INTEGER,
  })
  persons_count: number;

  @BelongsTo(() => User) user: User;
  @BelongsToMany(() => Room, () => BookingsRooms) rooms: Room[];
}
