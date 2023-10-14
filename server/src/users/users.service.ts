import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TokensService } from 'src/auth/tokens.service';
import { RolesService } from '../roles/roles.service';
import { LoginUserDto, UserDto } from './dto/user-dto';
import { User } from './users.models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private tokensService: TokensService,
  ) {}

  toUserDto(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      phone_number: user.phone_number,
      is_activated: user.is_activated,
      activation_link: user.activation_link,
    };
  }

  async createUser(dto: LoginUserDto) {
    let role = await this.roleService.getByName('user');
    if (!role) role = await this.roleService.createRole({ name: 'user' });
    const user = await this.userRepository.create(dto);
    user.roles = [role];
    await user.$set('roles', [role.id]);
    return user;
  }

  async getAllUser() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async saveToken(userId: number, refreshToken: string) {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (user) {
      return await User.update(
        { refreshToken: refreshToken },
        { where: { id: userId } },
      );
    }
    throw new HttpException('Пользователь не найден', 400);
  }

  async logout(req: any) {
    const { refreshToken } = req.cookies;
    await User.update({ refreshToken: '' }, { where: { refreshToken } });
    return;
  }

  async refresh(req, res) {
    console.log('refresh');
    try {
      const { refreshToken } = req.cookies;
      console.log('refreshToken', refreshToken);
      if (!refreshToken) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const userData = this.tokensService.validateRefreshToken(refreshToken);
      const user = await User.findOne({
        where: { refreshToken },
        include: { all: true },
      });
      if (!userData || !user) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const tokens = this.tokensService.generateTokens({
        email: user.email,
        password: user.password,
        roles: user.roles,
      });
      await this.saveToken(user.id, tokens.refreshToken);

      const tokensData = {
        ...tokens,
        user: {
          email: user.email,
          name: user.name,
          roles: user.roles,
        },
      };

      res.cookie('refreshToken', tokensData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        //sameSite: "None",
        secure: false,
      });
      return res.json(tokensData);
    } catch (e) {
      console.log(e);

      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
