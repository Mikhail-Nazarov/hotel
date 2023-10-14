import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Booking } from '../bookings/bookings.model';
import { Role } from '../roles/roles.models';
import { RolesModule } from '../roles/roles.module';
import { UsersRoles } from '../roles/users-roles.models';
import { UsersController } from './users.controller';
import { User } from './users.models';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UsersRoles, Booking]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
