import { FC, useState } from "react";
import { IBedType, IRoom, IRoomType } from "../../../interfaces/interfaces";
import { API_URL, STATIC_URL } from "../../../index.http";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import "./RoomCard.scss";

export type roomCardProps = {
  room: IRoom;
  roomTypes?: IRoomType;
  bedTypes?: IBedType;
};

const RoomCard: FC<roomCardProps> = ({ room, roomTypes, bedTypes }) => {
  const linkUrl = `room-detail/${room.id}`;
  return (
    <div className="room-card">
      <Link
        className="room-link"
        to={linkUrl}
        state={{ room, roomTypes, bedTypes }}
      >
        <div style={{ position: "relative" }}>
          <img src={STATIC_URL + "/" + room.images[0]} />
        </div>
        <div>
          <h1 className="header-1-dark">
            {room.id} {room.name}
          </h1>
          <h1 className="header-2-dark">{room.description}</h1>
          <div className="price">
            <h1 className="header-2-dark">{room.price}р/сутки</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default RoomCard;
