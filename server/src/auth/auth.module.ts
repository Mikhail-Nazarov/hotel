import { Body, forwardRef, Get, Module, Post } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensService } from './tokens.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokensService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  exports: [AuthService, JwtModule, TokensService],
})
export class AuthModule {}
