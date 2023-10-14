import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.models";
import { RolesController } from "./roles.controller";
import { Role } from "./roles.models";
import { RolesService } from "./roles.service";
import { UsersRoles } from "./users-roles.models";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UsersRoles])],
  exports: [RolesService],
})
export class RolesModule {}
