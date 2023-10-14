export class CreateBookingDto {
  readonly start_date: Date;
  readonly end_date: Date;
  readonly persons_count: number;
  readonly roomsIds: number[];
}
