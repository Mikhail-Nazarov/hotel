import { FC, useEffect, useState } from "react";
import BackgroundSlider from "../../components/modules/BackgroundSlider/BackgroundSlider";
import Slider from "../../components/modules/Slider/Slider";
import { welcomeData, whyWeData } from "../../data";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { API_URL, STATIC_URL } from "../../index.http";
import { RootState } from "../../store/index";
import { setIsNeedAuth } from "../../store/slices/authSlice";
import { getRoomsTypes } from "./HomeApi";

import "./homePage.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";

type WelcomeProps = {
  title?: string;
  description?: string;
};

const HomePage: React.FC = () => {
  const [roomTypes, setRoomTypes] = useState([]);

  const appDispatch = useAppDispatch();
  const globalState = useAppSelector((state: RootState) => state);

  const welcomeBlocks = [
    {
      title: welcomeData[0].title,
      description: welcomeData[0].description,
      buttons: [
        <button style={{ width: "200px" }} className="strict-button">
          О нас
        </button>,
        <button style={{ width: "200px" }} className="strict-button">
          Перейти к номерам
        </button>,
      ],
    },
  ];

  useEffect(() => {
    const init = async () => {
      const roomtypes = await getRoomsTypes();
      setRoomTypes(roomtypes);
    };
    init();
    // appDispatch(setIsNeedAuth(true));
  }, []);

  const WelcomeBlock: FC<WelcomeProps> = ({ title, description, children }) => {
    return (
      <div className="welcome-block">
        <CSSTransition in appear timeout={1000} classNames="fade_1">
          <h1 className="header-1">{title}</h1>
        </CSSTransition>
        <CSSTransition in appear timeout={1000} classNames="fade_2">
          <p>{description}</p>
        </CSSTransition>
        <div style={{ display: "flex", gap: "20px" }}>{children}</div>
      </div>
    );
  };

  return (
    <div>
      <BackgroundSlider urls={["pic-4.jpg", "pic-1.jpg", "pic-3.jpg"]}>
        <WelcomeBlock
          title={welcomeData[0].title}
          description={welcomeData[0].description}
        >
          <button style={{ width: "200px" }} className="strict-button">
            О нас
          </button>
          <button style={{ width: "200px" }} className="strict-button">
            Перейти к номерам
          </button>
        </WelcomeBlock>
        <WelcomeBlock
          title={welcomeData[1].title}
          description={welcomeData[1].description}
        />
      </BackgroundSlider>
      <div style={{ textAlign: "center" }}>
        <div className="why-we">
          <h1 style={{ margin: "auto" }} className="header-1-dark">
            Почему мы?
          </h1>
          <Slider height={"500px"} width={"1000px"}>
            {whyWeData.map((item: { url: string; text: string }, index) => {
              return (
                <div
                  key={index}
                  style={{ backgroundImage: `url("${item.url}")` }}
                  className="whyWe-card"
                >
                  <h1 className="header-1">{item.text}</h1>
                </div>
              );
            })}
          </Slider>
        </div>
        <h1 className="header-1-dark">Номера в отеле Delux House</h1>
        <div className="room-types">
          {roomTypes.map((item: any) => {
            return (
              <div>
                <h1 className="header-2-dark">{item.name}</h1>
                <img
                  src={STATIC_URL + "/" + item.rooms[0]?.images[0]}
                  className="room-type-preview"
                />
                <p className="dark-text">{item.description}</p>
                <p className="dark-text">
                  от {item.rooms[0]?.price} руб./сутки
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
