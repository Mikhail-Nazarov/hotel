import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RoomTypeController } from './room-type.controller';
import { RoomType } from './room-type.models';
import { RoomTypeService } from './room-type.service';

@Module({
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
  imports: [SequelizeModule.forFeature([RoomType]), AuthModule],
  exports: [RoomTypeService],
})
export class RoomTypeModule {}
