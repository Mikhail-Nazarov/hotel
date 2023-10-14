import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @Get()
  getByName(@Query() params: any) {
    return this.rolesService.getByName(params.name);
  }
}
