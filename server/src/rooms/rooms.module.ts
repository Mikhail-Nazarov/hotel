import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from 'src/file/file.module';
import { BedTypeModule } from '../bed-type/bed-type.module';
import { BedTypes_Rooms } from '../bed-type/bedsTypes-rooms.model';
import { BookingsRooms } from '../bookings/bookings-rooms.model';
import { Booking } from '../bookings/bookings.model';
import { RoomTypeModule } from '../room-type/room-type.module';
import { RoomTypeService } from '../room-type/room-type.service';
import { RoomsController } from './rooms.controller';
import { Room } from './rooms.models';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    SequelizeModule.forFeature([Booking, BookingsRooms, Room, BedTypes_Rooms]),
    RoomTypeModule,
    BedTypeModule,
    FileModule,
  ],
  exports: [RoomsService],
})
export class RoomsModule {}
