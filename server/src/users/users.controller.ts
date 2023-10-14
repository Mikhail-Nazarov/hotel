import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginUserDto } from './dto/user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: LoginUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get('/refresh')
  refresh(@Req() req, @Res() res) {
    console.log('refresh');
    return this.usersService.refresh(req, res);
  }

  @Get('logout')
  logout(@Req() req) {
    return this.usersService.logout(req);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.usersService.getAllUser();
  }
}
