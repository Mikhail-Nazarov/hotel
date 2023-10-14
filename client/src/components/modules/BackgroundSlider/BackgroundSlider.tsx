import * as React from "react";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./BackgroundSlider.scss";

type bgProps = {
  urls: string[];
};

const BackgroundSlider: FC<bgProps> = ({ urls, children }) => {
  const childrenArray = React.Children.toArray(children);

  const [current, setCurrent] = useState<string>(urls[0]);
  const [currentChild, setCurrentChild] = useState<any>(childrenArray[0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const index = urls.indexOf(current) + 1;
      setCurrentChild(childrenArray[index] || childrenArray[0]);
      setCurrent(urls[index] || urls[0]);
    }, 10000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="background-slider">
      <div
        className="second-plan-image"
        style={{ backgroundImage: `url("${current}")` }}
      ></div>
      {urls.length > 1 && (
        <div className="change-backgroud">
          {urls.map((url, index) => {
            return (
              <button
                key={index}
                className={current === urls[index] ? "active" : ""}
                onClick={(e) => {
                  setCurrent(urls[index]);
                  setCurrentChild(childrenArray[index] || childrenArray[0]);
                }}
              ></button>
            );
          })}
        </div>
      )}
      {currentChild}
    </div>
  );
};

export default BackgroundSlider;
