import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles-guard';
import {
  CreateRoomTypeDto,
  UpdateRoomTypeDto,
} from './dto/create-roomType.dto';
import { RoomTypeService } from './room-type.service';

@Controller('room-type')
export class RoomTypeController {
  constructor(private roomTypeService: RoomTypeService) {}

  @Post()
  create(@Body() dto: CreateRoomTypeDto) {
    return this.roomTypeService.createRoomType(dto);
  }

  @Post('create-mas')
  createMas(@Body() dto: UpdateRoomTypeDto[]) {
    return this.roomTypeService.createRoomTypes(dto);
  }

  @Get()
  getTypes() {
    return this.roomTypeService.getTypes();
  }
}
