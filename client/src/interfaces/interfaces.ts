export interface isValid {
  isValid: boolean;
  errorMessage: string;
}

export interface contactItem {
  icon: string;
  title: string;
  text: string;
}

export interface IRoomType {
  id: number;
  name: string;
  description: string;
}

export interface IBedType {
  id: number;
  size: number;
}

export interface IBooking {
  id: number;
  iserId: number;
  start_date: Date;
  end_date: Date;
  persons_count: number;
}

export interface IRoom {
  id: number;
  capacity: number;
  type: number;
  roomType: IRoomType;
  images: any;
  price: number;
  name: string;
  description: string;
  bookings?: IBooking[];
  bedTypes?: IBedType[];
}

export interface CreateBookingDto {
  start_date: Date;
  end_date: Date;
  persons_count: number;
  roomsIds: number[];
}
