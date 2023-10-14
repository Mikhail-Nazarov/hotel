import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../users/users.models";
import { Role } from "./roles.models";

@Table({ tableName: "users_roles", createdAt: false, updatedAt: false })
export class UsersRoles extends Model<UsersRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    unique: false,
    type: DataType.INTEGER,
  })
  idUser: number;

  @ForeignKey(() => Role)
  @Column({
    unique: false,
    type: DataType.INTEGER,
  })
  idRole: number;
}
