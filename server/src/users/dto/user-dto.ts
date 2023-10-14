import { Role } from 'src/roles/roles.models';

export class UserDto {
  readonly id: number;
  readonly email: string;
  readonly name: string;
  readonly password: string;
  readonly phone_number: string;
  readonly is_activated: boolean;
  readonly activation_link: string;
}

export class ShortUserDto {
  readonly email: string;
  readonly password: string;
  readonly roles: Role[];
}

export class LoginUserDto {
  readonly email: string;
  readonly password: string;
}

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly phone: string;
}
