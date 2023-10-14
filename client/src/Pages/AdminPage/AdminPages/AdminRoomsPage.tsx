import { FC, useEffect, useState } from "react";
import AdminTable from "../../../components/modules/AdminTable/AdminTable";
import RoomCard from "../../../components/modules/RoomCard/RoomCard";
import Button from "../../../components/UI/Button";
import MyInput from "../../../components/UI/MyInput";
import { API_URL } from "../../../index.http";
import { IBedType, IRoom, IRoomType } from "../../../interfaces/interfaces";
import { getRoomsTypes } from "../../homePage/HomeApi";
import { getBedsTypes, getRooms } from "../AdminApi";

const AdminRoomsPage: FC = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const [bedTypes, setBedTypes] = useState<IBedType[]>([]);

  const init = async () => {
    const data = await getRooms();
    const types = await getRoomsTypes();
    const bedTypes = await getBedsTypes();
    setRoomTypes(types);
    setRooms(data);
    setBedTypes(bedTypes);
    setIsLoading(true);
  };
  useEffect(() => {
    if (!isLoading) init();
  }, []);

  const createRoom = (e: any) => {
    setRooms([
      ...rooms,
      {
        id: 0,
        capacity: 1,
        type: roomTypes[0].id,
        images: [],
        price: 0,
        name: "",
        description: "",
      },
    ]);
    console.log(rooms);
  };

  if (isLoading)
    return (
      <div>
        {rooms.map((room) => {
          return (
            <RoomCard room={room} roomTypes={roomTypes} bedTypes={bedTypes} />
          );
        })}
        <Button onClick={createRoom}>Добавить</Button>
      </div>
    );
};
export default AdminRoomsPage;
