import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '../users/dto/user-dto';
import { User } from '../users/user.decorator';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() bookingDto: CreateBookingDto, @User() user: UserDto) {
    return this.bookingService.createBooking(bookingDto, user);
  }
}
