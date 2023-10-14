import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.models';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/user-dto';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private tokensService: TokensService,
  ) {}

  async login(userDto: LoginUserDto, res) {
    const user = await this.validateUser(userDto);
    const tokens = this.tokensService.generateTokens({
      ...userDto,
      roles: user.roles,
    });
    await this.userService.saveToken(user.id, tokens.refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      //sameSite: "None",
      secure: false,
    });

    return res.json({
      user: {
        email: user.email,
        name: user.name,
        roles: user.roles,
      },
      token: tokens.accessToken,
    });
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) throw new HttpException('Неправильный email или пароль', 400);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) return user;
    throw new HttpException('Неправильный email или пароль', 400);
  }

  async registration(userDto: CreateUserDto, res) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const tokens = this.tokensService.generateTokens({
      email: userDto.email,
      password: userDto.password,
      roles: user.roles,
    });

    await this.userService.saveToken(user.id, tokens.refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      //sameSite: "None",
      secure: false,
    });
    return res.json({
      user: {
        email: user.email,
        name: user.name,
        roles: user.roles,
      },
      token: tokens.accessToken,
    });
  }
}
