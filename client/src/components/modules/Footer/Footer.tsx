import { FC } from "react";
import { footerData } from "../../../data";
import { STATIC_URL } from "../../../index.http";
import "./Footer.scss";

const Footer: FC = () => {
  return (
    <div className="footer">
      <h1 className="header-1-dark">Контакты</h1>
      <div
        className="contacts-block"
        style={{ gridTemplateColumns: `repeat(${footerData.length}, 1fr)` }}
      >
        {footerData.map((item, index) => {
          return (
            <div key={index}>
              <img
                className="contact-icon"
                src={STATIC_URL + "/icons/" + item.icon}
              />
              <h3 className="header-2-dark"> {item.title}</h3>
              <p className="dark-text">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
