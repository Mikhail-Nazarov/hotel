import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { BedType } from 'src/bed-type/bedType.model';
import { FileService } from 'src/file/file.service';
import { RoomType } from 'src/room-type/room-type.models';
import { BedTypeService } from '../bed-type/bed-type.service';
import { RoomTypeService } from '../room-type/room-type.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './rooms.models';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room) private roomRepository: typeof Room,
    private roomTypeService: RoomTypeService,
    private bedsTypeService: BedTypeService,
    private fileService: FileService,
  ) {}

  async createRoom(dto: CreateRoomDto, images) {
    const imagesNames = await this.fileService.createFile(images);

    const roomType = dto.type || (await this.roomTypeService.getFirst()).id;
    const bedsType = await this.bedsTypeService.getFirst();
    if (!roomType || !bedsType)
      throw new HttpException(
        'Нет данных о типe номеров или спальных мест',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const room = await this.roomRepository.create({
      ...dto,
      images: imagesNames,
      type: roomType,
    });
    room.bedTypes = [bedsType];
    await room.$set('bedTypes', [bedsType.id]);
    return room;
  }

  async getAll() {
    const rooms = await this.roomRepository.findAll({
      include: { model: BedType },
    });
    return rooms;
  }

  async getWithFilters(params: any) {
    const limit = 2;
    const whereOptions: WhereOptions<Room> = {
      price: { [Op.between]: [0, Number.MAX_VALUE] },
      type: await this.roomTypeService.getAllIds(),
    };
    if (params.price) {
      const priceRange = params.price.split(',');
      whereOptions.price = {
        [Op.between]: [
          Number(priceRange[0]) || 0,
          Number(priceRange[1]) || Number.MAX_VALUE,
        ],
      };
    }
    if (params.type) {
      whereOptions.type = {
        [Op.in]: params.type.split(',').map((item: string) => Number(item)),
      };
    }
    const roomsCount: number = await this.roomRepository.count({
      where: whereOptions,
    });
    const rooms = await this.roomRepository.findAll({
      include: { model: BedType },
      offset: params.page * limit,
      limit: limit,
      order: [[params.sortBy, 'ASC']],
      where: whereOptions,
    });
    return { rooms: rooms, pagesCount: Math.round(roomsCount / limit) };
  }

  async getRoomsById(id: number[]) {
    const rooms = await this.roomRepository.findAll({
      where: { id: id },
      include: { all: true },
    });
    return rooms;
  }
  async getRoomById(id: number) {
    const rooms = await this.roomRepository.findOne({
      where: { id: id },
      include: { all: true },
    });
    return rooms;
  }

  async updateOrCreateRoom(dto: UpdateRoomDto, images: File[]) {
    const newImagesNames = await this.fileService.createFile(images);
    if (!dto.images) dto.images = [];
    const imagesNames = dto.images.concat(newImagesNames) as string[];
    const room = await this.roomRepository.findOne({
      where: { id: Number(dto.id) },
    });
    if (!room)
      await this.roomRepository.create({
        capacity: Number(dto.capacity),
        type: Number(dto.type),
        price: Number(dto.price),
        name: dto.name,
        description: dto.description,
        images: imagesNames,
      });
    else {
      await this.roomRepository.update(
        {
          capacity: Number(dto.capacity),
          type: Number(dto.type),
          price: Number(dto.price),
          name: dto.name,
          description: dto.description,
          images: imagesNames,
        },
        { where: { id: Number(dto.id) }, returning: true },
      );
    }
  }

  async getMaxPrice() {
    const maxPrice = await this.roomRepository.max('price');
    return maxPrice;
  }
}
