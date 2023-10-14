import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Room } from "../rooms/rooms.models";
import { BedTypeController } from "./bed-type.controller";
import { BedTypeService } from "./bed-type.service";
import { BedTypes_Rooms } from "./bedsTypes-rooms.model";
import { BedType } from "./bedType.model";

@Module({
  controllers: [BedTypeController],
  providers: [BedTypeService],
  imports: [SequelizeModule.forFeature([BedType, BedTypes_Rooms, Room])],
  exports: [BedTypeService],
})
export class BedTypeModule {}
