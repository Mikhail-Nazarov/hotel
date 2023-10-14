import { FC } from "react";
import "./UI.scss";

type buttonProps = {
  onClick?: (e: any) => void;
  isDisabled?: boolean;
};

const Button: FC<buttonProps> = ({ onClick, isDisabled = false, children }) => {
  return (
    <button
      disabled={isDisabled}
      className={isDisabled ? "primary-button disabled" : "primary-button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
