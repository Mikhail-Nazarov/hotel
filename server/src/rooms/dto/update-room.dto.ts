export class UpdateRoomDto {
  id: number;
  capacity: number;
  price: number;
  type: number;
  name: string;
  description: string;
  images: (File | string)[];
}
