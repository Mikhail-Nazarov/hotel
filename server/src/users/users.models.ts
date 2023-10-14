import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Booking } from '../bookings/bookings.model';
import { Role } from '../roles/roles.models';
import { UsersRoles } from '../roles/users-roles.models';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
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
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_activated: boolean;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @Column({
    type: DataType.TEXT,
  })
  refreshToken: string;

  @BelongsToMany(() => Role, () => UsersRoles) roles: Role[];
  @HasMany(() => Booking) bookings: Booking[];
}
