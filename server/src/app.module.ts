import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.models';
import { UsersModule } from './users/users.module';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.models';
import { UsersRoles } from './roles/users-roles.models';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/bookings.model';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsRooms } from './bookings/bookings-rooms.model';
import { BedTypeModule } from './bed-type/bed-type.module';
import { RoomTypeModule } from './room-type/room-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './../.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'my-hotel-postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'hotel',
      // define: {
      //   timestamps: false,
      // },

      autoLoadModels: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'static'),
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    FileModule,
    BookingsModule,
    RoomsModule,
    BedTypeModule,
    RoomTypeModule,
  ],
})
export class AppModule {}
