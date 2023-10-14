import { Routes, Route, Navigate, Router } from "react-router-dom";
import AdminInterceptor from "./components/modules/Interceptors/AdminInterceptor";
import AuthInterceptor from "./components/modules/Interceptors/AuthInterceptor";
import AdminRoomDetail from "./components/modules/RoomDetail/AdminRoomDetail";
import RoomDetail from "./components/modules/RoomDetail/RoomDetail";
import Navbar from "./Navbar";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import AdminRoomsPage from "./Pages/AdminPage/AdminPages/AdminRoomsPage";
import BedTypePage from "./Pages/AdminPage/AdminPages/BedTypePage";
import RoomTypePage from "./Pages/AdminPage/AdminPages/RoomTypePage";
import HomePage from "./Pages/homePage/HomePage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import RoomsPage from "./Pages/RoomsPage/RoomsPage";

const AppRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="home" element={<HomePage />} />
          <Route path="aboutUs" element={<AboutUsPage />} />

          <Route path="rooms" element={<RoomsPage />} />
          <Route path="rooms/room-detail/:roomId" element={<RoomDetail />} />

          <Route path="services" element={<></>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="admin"
            element={
              <AdminInterceptor>
                <AdminPage />
              </AdminInterceptor>
            }
          >
            <Route path="rooms" element={<AdminRoomsPage />} />
            <Route path="room-types" element={<RoomTypePage />} />
            <Route path="bed-types" element={<BedTypePage />} />
            <Route path="rooms/room-detail/*" element={<AdminRoomDetail />} />
          </Route>
          <Route path="/" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </>
  );
};
export default AppRouter;
