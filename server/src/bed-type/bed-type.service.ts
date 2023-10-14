import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { BedType } from './bedType.model';
import { CreateBedTypeDto } from './dto/create-bedType.dto';

@Injectable()
export class BedTypeService {
  constructor(
    @InjectModel(BedType) private bedTypeRepository: typeof BedType,
  ) {}

  async createBedsType(dto: CreateBedTypeDto) {
    const role = await this.bedTypeRepository.create(dto);
    return role;
  }

  async getFirst() {
    const bedType = await this.bedTypeRepository.findOne();
    return bedType;
  }

  async getTypes() {
    const bedTypes = await this.bedTypeRepository.findAll();
    return bedTypes;
  }

  async createBedTypes(dto: { id: number; size: number }[]) {
    await this.bedTypeRepository.destroy({
      where: { [Op.not]: { id: dto.map((item) => item.id) } },
    });
    for (const type of dto) {
      if (type.id === 0)
        await this.bedTypeRepository.create({
          size: type.size,
        });
      else
        await this.bedTypeRepository.update(
          { size: type.size },
          { where: { id: type.id } },
        );
    }
    return;
  }
}
