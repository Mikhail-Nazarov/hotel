import { FC } from "react";
import "./UI.scss";
import { CSSTransition } from "react-transition-group";

type modalProps = {
  active: boolean;
  setActive: (newActive: boolean) => void;
};

const Modal: FC<modalProps> = ({ active, setActive, children }) => {
  return (
    <CSSTransition in={active} timeout={300} classNames="fade_3" unmountOnExit>
      <div
        className={active ? "modal active" : "modal"}
        onClick={(e) => setActive(false)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
