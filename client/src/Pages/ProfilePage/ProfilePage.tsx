import BackgroundSlider from "../../components/modules/BackgroundSlider/BackgroundSlider";
import SideBar from "../../components/modules/SideBar/SideBar";
import { aboutUsData } from "../../data";
import "./ProfilePage.scss";

const ProfilePage: React.FC = () => {
  return <SideBar endPoints={[{ to: "test", title: "test" }]}></SideBar>;
};

export default ProfilePage;
