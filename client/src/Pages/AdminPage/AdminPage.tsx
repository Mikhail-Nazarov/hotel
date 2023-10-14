import { FC, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Button from "../../components/UI/Button";
import "./AdminPage.scss";

const AdminPage: FC = () => {
  const endPoints: { to: string; title: string }[] = [
    { to: "rooms", title: "Номера" },
    { to: "roles", title: "Роли пользователей" },
    { to: "room-types", title: "Типы номеров" },
    { to: "bed-types", title: "Спальные места" },
  ];
  return (
    <div className="admin-page">
      <div className="admin-navbar">
        {endPoints.map((endPoint) => {
          return (
            <NavLink key={endPoint.to} to={endPoint.to}>
              <Button>{endPoint.title}</Button>
            </NavLink>
          );
        })}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default AdminPage;
