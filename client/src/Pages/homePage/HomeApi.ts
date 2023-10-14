import { $host } from "../../index.http";

export const getRoomsTypes = async () => {
  const { data } = await $host.get("/room-type");

  return data;
};
