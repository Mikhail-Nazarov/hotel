import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: LoginUserDto, @Res() res) {
    return this.authService.login(userDto, res);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto, @Res() res) {
    return this.authService.registration(userDto, res);
  }
}
