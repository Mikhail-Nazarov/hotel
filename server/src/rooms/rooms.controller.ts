import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(@Body() dto: CreateRoomDto, @UploadedFiles() images) {
    return this.roomService.createRoom(dto, images);
  }

  @Post('update')
  @UseInterceptors(FilesInterceptor('images'))
  update(@Body() dto: UpdateRoomDto, @UploadedFiles() images) {
    console.log('dto', dto.name);
    console.log('images', images);
    return this.roomService.updateOrCreateRoom(dto, images);
  }

  @Get('getAll')
  getRooms() {
    return this.roomService.getAll();
  }

  @Get('getMaxPrice')
  getMaxPrice() {
    return this.roomService.getMaxPrice();
  }
  @Get(':id')
  getRoom(@Param('id') id) {
    return this.roomService.getRoomById(id);
  }

  @Get()
  getWithFilters(@Query() params) {
    return this.roomService.getWithFilters(params);
  }
}
