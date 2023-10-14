import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col, fn } from 'sequelize';
import { Room } from 'src/rooms/rooms.models';
import {
  CreateRoomTypeDto,
  UpdateRoomTypeDto,
} from './dto/create-roomType.dto';
import { RoomType } from './room-type.models';
const { Op } = require('sequelize');

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectModel(RoomType) private roomTypeRepository: typeof RoomType,
  ) {}

  async createRoomType(dto: CreateRoomTypeDto) {
    const roomType = await this.roomTypeRepository.create(dto);
    return roomType;
  }

  async createRoomTypes(dto: UpdateRoomTypeDto[]) {
    for (let roomType of dto) {
      if (!roomType.id) {
        const newType = await this.createRoomType({
          name: roomType.name,
          description: roomType.description,
        });
        roomType = newType;
      }
    }
    await this.roomTypeRepository.destroy({
      where: { [Op.not]: { id: dto.map((item) => item.id) } },
    });
    for (const type of dto) {
      if (type.id === 0)
        await this.roomTypeRepository.create({
          name: type.name,
          description: type.description,
        });
      else
        await this.roomTypeRepository.update(
          { name: type.name, description: type.description },
          { where: { id: type.id } },
        );
    }
    return;
  }

  async getFirst() {
    const roomType = await this.roomTypeRepository.findOne();
    return roomType;
  }

  async getAllIds() {
    const roomTypes = await this.roomTypeRepository.findAll();
    return roomTypes.map((item: RoomType) => item.id);
  }

  async getTypes() {
    const roomTypes = await this.roomTypeRepository.findAll({
      include: {
        model: Room,
        limit: 1,
        order: [['price', 'ASC']],
      },
    });
    return roomTypes;
  }
}
