import { IRoomsFilters } from "../../components/modules/RoomsFilters/RoomsFilters";
import { $host } from "../../index.http";
import { IBedType, IRoom, IRoomType } from "../../interfaces/interfaces";

export const setRoomsTypes = async (roomTypes: IRoomType[]) => {
  const { data } = await $host.post("/room-type/create-mas", roomTypes);
  return data;
};

export const getBedsTypes = async () => {
  const { data } = await $host.get("/bed-type");
  return data;
};

export const saveBedsTypes = async (bedTypes: IBedType[]) => {
  const { data } = await $host.post("/bed-type/create-mas", bedTypes);
  return data;
};

export const updateRoom = async (fd: FormData) => {
  const { data } = await $host.post("/rooms/update", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getRooms = async () => {
  const { data } = await $host.get("/rooms/getAll");
  return data;
};

export const getRoomsWithFilters = async (
  page: number,
  filters: IRoomsFilters
) => {
  const { data } = await $host.get(
    `/rooms/?page=${page}&sortBy=${filters.sortBy}${
      filters.price ? `&price=${filters.price}` : ""
    }${filters.type ? `&type=${filters.type}` : ""}`
  );
  return data;
};

export const getAdminRole = async () => {
  const { data } = await $host.get("/roles", { params: { name: "admin" } });
  return data;
};
