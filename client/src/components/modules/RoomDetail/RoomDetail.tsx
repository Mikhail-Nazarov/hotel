import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { STATIC_URL } from "../../../index.http";
import {
  CreateBookingDto,
  IBedType,
  IRoom,
  IRoomType,
} from "../../../interfaces/interfaces";
import { getRoomsTypes } from "../../../Pages/homePage/HomeApi";
import { createBooking, getRoom } from "../../../Pages/RoomsPage/RoomsApi";
import { RootState } from "../../../store/index";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import MyDateRangePicker from "../../UI/MyDateRangePicker";
import MyInput from "../../UI/MyInput";
import BackgroundSlider from "../BackgroundSlider/BackgroundSlider";
import "./RoomDetail.scss";

const RoomDetail: FC = () => {
  const [room, setRoom] = useState<IRoom>();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [bookingPersonsCount, setBookingPersonsCount] = useState<number>(1);
  const [isBookingDatesValid, setIsBookingDatesValid] =
    useState<boolean>(false);
  const [bookingDates, setBookingDates] = useState<(Date | null)[]>([
    null,
    null,
  ]);
  const navigate = useNavigate();
  const location = useLocation();

  const globalState = useAppSelector((state: RootState) => state);

  const init = async () => {
    const splitUrl = window.location.href.split("/");
    const room = await getRoom(Number(splitUrl[splitUrl.length - 1]));
    console.log("room", room);
    setRoom(room);
    setModalActive(false);
    setBookingDates([null, null]);
    setBookingPersonsCount(1);
  };

  useEffect(() => {
    init();
  }, []);

  function valideCapacity() {
    if (room?.capacity === 1) return `${room.capacity}-го человека`;
    return `${room?.capacity}-x человек`;
  }

  const bookARoom = async (e: any) => {
    const dto: CreateBookingDto = {
      start_date: bookingDates[0]!,
      end_date: bookingDates[1] ? bookingDates[1] : bookingDates[0]!,
      persons_count: bookingPersonsCount,
      roomsIds: [room!.id],
    };
    const booking = await createBooking(dto);
    init();
    if (booking?.id) {
      alert(`Бронирование № ${booking.id} успешно создано`);
    }
  };

  return (
    <div>
      {room && (
        <>
          <Modal active={modalActive} setActive={setModalActive}>
            {globalState.authState.auth.isAuth ? (
              <>
                <MyInput
                  type={"number"}
                  minValue={1}
                  maxValue={room?.capacity}
                  value={bookingPersonsCount}
                  onChange={(e) => setBookingPersonsCount(e.target.value)}
                  label={"Кол-во человек"}
                />
                <MyDateRangePicker
                  dates={bookingDates}
                  setDates={setBookingDates}
                  busyDates={room?.bookings?.map((booking) => {
                    return [
                      new Date(booking.start_date.toString()),
                      new Date(booking.end_date.toString()),
                    ];
                  })}
                  isValid={isBookingDatesValid}
                  setIsValid={setIsBookingDatesValid}
                />
                <div style={{ display: "flex", gap: "5px" }}>
                  <Button
                    isDisabled={
                      !(
                        bookingDates[0] && bookingPersonsCount <= room?.capacity
                      )
                    }
                    onClick={bookARoom}
                  >
                    Забронировать
                  </Button>
                  <Button onClick={(e) => setModalActive(false)}>Отмена</Button>
                </div>
              </>
            ) : (
              <h1>Авторизуйтесь!</h1>
            )}
          </Modal>
          <BackgroundSlider
            urls={room.images.map((image: string) => STATIC_URL + "/" + image)}
          >
            <div className="welcome-block">
              <div className="room-info-panel">
                <h1 className="header-1">
                  Номер {room.id} {room.name} {room.roomType.name}
                </h1>
                <p>{room.description}</p>
                <p>для {valideCapacity()}</p>
                <p>Цена: {room.price} рублей в сутки</p>
                <div style={{ display: "flex", gap: "20px" }}>
                  <button
                    style={{ width: "200px" }}
                    className="strict-button"
                    onClick={(e) => {
                      setModalActive(true);
                    }}
                  >
                    Забронировать
                  </button>
                  <button
                    onClick={() => {
                      location.state ? navigate(-1) : navigate("../rooms");
                    }}
                    style={{ width: "200px" }}
                    className="strict-button"
                  >
                    К номерам
                  </button>
                </div>
              </div>
            </div>
          </BackgroundSlider>
        </>
      )}
    </div>
  );
};
export default RoomDetail;
