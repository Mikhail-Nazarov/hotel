import { Body, Controller, Get, Post } from '@nestjs/common';
import { BedTypeService } from './bed-type.service';
import { CreateBedTypeDto } from './dto/create-bedType.dto';

@Controller('bed-type')
export class BedTypeController {
  constructor(private bedsTypeService: BedTypeService) {}

  @Post()
  create(@Body() dto: CreateBedTypeDto) {
    return this.bedsTypeService.createBedsType(dto);
  }

  @Get()
  getTypes() {
    return this.bedsTypeService.getTypes();
  }

  @Post('create-mas')
  createMas(@Body() dto: { id: number; size: number }[]) {
    return this.bedsTypeService.createBedTypes(dto);
  }
}
