import { FC } from "react";
import { NavLink } from "react-router-dom";
import { footerData } from "../../../data";
import { STATIC_URL } from "../../../index.http";
import "./SideBar.scss";

type sidebarProps = {
  endPoints: { to: string; title: string }[];
};

const SideBar: FC<sidebarProps> = ({ endPoints, children }) => {
  return (
    <div className="side-bar-wrapper">
      <div className="side-bar">
        {endPoints.map((endPoint) => {
          return (
            <NavLink
              key={endPoint.to}
              className={"side-bar-button"}
              to={endPoint.to}
            >
              {endPoint.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
