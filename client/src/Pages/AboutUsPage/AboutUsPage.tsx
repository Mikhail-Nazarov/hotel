import BackgroundSlider from "../../components/modules/BackgroundSlider/BackgroundSlider";
import { aboutUsData } from "../../data";
import "./AboutUsPage.scss";

const AboutUsPage: React.FC = () => {
  return (
    <BackgroundSlider urls={["pic-4.jpg"]}>
      <div className="welcome-block">
        <h1 className="header-1 animated">
          Туристический отель «DELUX&nbsp;HOUSE»&nbsp;—&nbsp;это:
        </h1>
        <lu>
          {aboutUsData.topics.map((value, index) => {
            return (
              <li className="animated" key={index}>
                {value}
              </li>
            );
          })}
        </lu>
      </div>
    </BackgroundSlider>
  );
};

export default AboutUsPage;
