import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import RoomCard from "../../components/modules/RoomCard/RoomCard";
import RoomsFilters, {
  IRoomsFilters,
} from "../../components/modules/RoomsFilters/RoomsFilters";
import { IRoom } from "../../interfaces/interfaces";
import { getRooms, getRoomsWithFilters } from "../AdminPage/AdminApi";
import "./RoomsPage.scss";
import queryString from "query-string";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as React from "react";
import ParticleBackground from "../../components/modules/ParticalBackground/ParticleBackground";

const RoomsPage: FC = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [page, setPage] = useState<number>(query.page | 0);
  const [pagesCount, setPagesCount] = useState<number>(1);

  const init = async () => {
    setRooms([]);
    const temp = query.page | 0;
    setPage(temp);
    const filters: IRoomsFilters = {
      sortBy: query.sortBy || "name",
      price: query.price?.split("-"),
      type: query.type?.split(","),
    };
    console.log("location", location);
    const data = await getRoomsWithFilters(temp, filters);
    setPagesCount(data.pagesCount);
    setRooms(data.rooms);
  };

  useEffect(() => {
    init();
  }, [location]);

  const pageButtons = () => {
    const buttons = [];
    if (rooms.length)
      for (let i = 0; i < pagesCount; i++) {
        buttons.push(
          <button
            className={i === page ? "active" : ""}
            value={i.toString()}
            onClick={(e) => {
              setRooms([]);
              const str =
                `?page=${e.target.value}` +
                location.search.replace(/\?page=\d*/g, "");
              navigate(str);
            }}
          >
            {i + 1}
          </button>
        );
      }
    return buttons;
  };

  return (
    <ParticleBackground className="rooms-page">
      <div className="rooms-page">
        <RoomsFilters rooms={rooms} />

        <div>
          <TransitionGroup>
            {rooms.map((room, index) => {
              return (
                <CSSTransition
                  timeout={1000}
                  classNames={index % 2 === 0 ? "fade_1" : "fade_2"}
                >
                  <div>
                    <RoomCard room={room} />;
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          <div className="pag-buttons">{pageButtons()}</div>
        </div>
      </div>
    </ParticleBackground>
  );
};

export default RoomsPage;
