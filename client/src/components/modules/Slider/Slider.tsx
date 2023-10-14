import * as React from "react";
import { FC, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Slider.scss";

type sliderProps = {
  height: string;
  width: string;
};

const Slider: FC<sliderProps> = ({ height, width, children }) => {
  const childrenArray = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<string>("slide-right");

  const slideLeft = () => {
    const nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      setCurrentIndex(childrenArray.length - 1);
    } else {
      setCurrentIndex(nextIndex);
    }
    setDirection("slide-left");
  };

  const slideRight = () => {
    setCurrentIndex((currentIndex + 1) % childrenArray.length);
    setDirection("slide-right");
  };

  const childFactory = (direction) => (child) =>
    React.cloneElement(child, {
      classNames: direction,
    });

  return (
    <div className="slider">
      <button className="slider-button left" onClick={slideLeft}></button>
      <div className="slider-body" style={{ height: height, width: width }}>
        <TransitionGroup childFactory={childFactory(direction)}>
          <CSSTransition
            key={childrenArray.indexOf(childrenArray[currentIndex])}
            timeout={400}
            classNames={direction}
          >
            <div style={{ position: "absolute" }}>
              {childrenArray[currentIndex]}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <button className="slider-button" onClick={slideRight}></button>
    </div>
  );
};

export default Slider;
