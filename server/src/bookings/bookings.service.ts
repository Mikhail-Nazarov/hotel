import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.models';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from '../rooms/rooms.service';
import { UserDto } from '../users/dto/user-dto';
import { Booking } from './bookings.model';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking) private bokingRepository: typeof Booking,
    private roomService: RoomsService,
    private usersService: UsersService,
  ) {}

  async createBooking(bookingDto: CreateBookingDto, userDto: UserDto) {
    const user: User = await this.usersService.getUserByEmail(userDto.email);
    console.log('bookingDto', bookingDto);
    const booking = await this.bokingRepository.create({
      ...bookingDto,
      userId: user.id,
    });
    const rooms = await this.roomService.getRoomsById(bookingDto.roomsIds);
    booking.rooms = rooms;
    await booking.$set(
      'rooms',
      rooms.map((room) => room.id),
    );
    return booking;
  }
}
