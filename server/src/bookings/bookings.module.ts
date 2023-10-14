import { forwardRef, Module } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Booking } from "./bookings.model";
import { BookingsRooms } from "./bookings-rooms.model";
import { AuthModule } from "../auth/auth.module";
import { Room } from "../rooms/rooms.models";
import { User } from "../users/users.models";
import { UsersModule } from "../users/users.module";
import { RoomsModule } from "../rooms/rooms.module";

@Module({
  providers: [BookingsService],
  controllers: [BookingsController],
  imports: [
    SequelizeModule.forFeature([User, Booking, BookingsRooms, Room]),
    AuthModule,
    UsersModule,
    RoomsModule,
  ],
})
export class BookingsModule {}
