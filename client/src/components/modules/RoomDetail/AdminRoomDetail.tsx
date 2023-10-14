import { FC, useState } from "react";
import { useLocation } from "react-router";
import { API_URL } from "../../../index.http";
import { IBedType, IRoom, IRoomType } from "../../../interfaces/interfaces";
import { updateRoom } from "../../../Pages/AdminPage/AdminApi";
import Button from "../../UI/Button";
import ImagesDropZone from "../../UI/ImagesDropZone";
import MyInput from "../../UI/MyInput";
import "./RoomDetail.scss";

const AdminRoomDetail: FC = () => {
  const { state } = useLocation();
  const [room, setRoom] = useState<IRoom>(state.room);

  const onChange = (key: string, value: any) => {
    const roomClone = structuredClone(room);
    roomClone[key] = value;
    setRoom(roomClone);
    console.log("room", room);
  };

  const saveRoom = () => {
    const formData = new FormData();
    console.log("room.images", room.images);

    room.images.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("id", room.id.toString());
    formData.append("name", String(room.name));
    formData.append("description", String(room.description));
    formData.append("capacity", room.capacity.toString());
    formData.append("price", room.price.toString());
    formData.append("type", room.type.toString());
    console.log("formData", formData.getAll("images"));
    updateRoom(formData);
  };

  return (
    <div className="room-detail admin">
      <h1 className="header-1-dark ">{state.room.id}</h1>
      <MyInput
        label="Название"
        value={room.name}
        onChange={(e) => {
          onChange("name", e.target.value);
        }}
      />
      <MyInput
        label="Описание"
        value={room.description}
        onChange={(e) => {
          onChange("description", e.target.value);
        }}
      />
      <MyInput
        type="number"
        label="Вместимость"
        value={room.capacity}
        onChange={(e) => {
          onChange("capacity", e.target.value);
        }}
      />
      <MyInput
        type="number"
        label="Цена"
        value={room.price}
        onChange={(e) => {
          onChange("price", e.target.value);
        }}
      />
      <MyInput
        type="select"
        label="Тип номера"
        value={room.type}
        onChange={(e) => {
          onChange("type", e.target.value);
        }}
      >
        {state.roomTypes.map((type) => {
          return {
            key: type.id.toString(),
            value: type.id.toString(),
            text: type.name,
          };
        })}
      </MyInput>

      <MyInput
        type="checkboxGroup"
        label="Спальные места"
        value={room.bedTypes}
        onChange={(e) => {
          onChange("bedTypes", e.target.value);
        }}
      >
        {state.bedTypes.map((type) => {
          return {
            key: type.id.toString(),
            value: type.id.toString(),
            text: type.size.toString(),
          };
        })}
      </MyInput>
      <div className="room-images">
        <ImagesDropZone
          images={room.images}
          setImages={(images: any[]) => {
            console.log("images", images);
            const clone = structuredClone(room);
            clone.images = images;
            setRoom(clone);
          }}
        />
      </div>
      <Button onClick={saveRoom}>Сохранить</Button>
    </div>
  );
};
export default AdminRoomDetail;
