import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import {
  CreateUserDto,
  LoginUserDto,
  ShortUserDto,
  UserDto,
} from 'src/users/dto/user-dto';

@Injectable()
export class TokensService {
  constructor(private jwtService: JwtService) {}

  generateTokens(payload: ShortUserDto) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = this.jwtService.verify(token);
      return userData;
    } catch (e) {
      return null;
    }
  }
}
