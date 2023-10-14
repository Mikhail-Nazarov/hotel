import { $host } from "../../index.http";
import { CreateBookingDto } from "../../interfaces/interfaces";

export const getRoom = async (id: number) => {
  const { data } = await $host.get("/rooms/" + id);
  return data;
};

export const getMaxPrice = async () => {
  const { data } = await $host.get("/rooms/getMaxPrice");
  return data;
};

export const createBooking = async (dto: CreateBookingDto) => {
  console.log("dto", dto);
  const { data } = await $host.post("/bookings/", { ...dto });
  return data;
};
