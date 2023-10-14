import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux";
import AuthPage from "../../../Pages/AuthPage/AuthPage";
import { RootState } from "../../../store/index";

const AuthInterceptor: FC<React.PropsWithChildren> = ({ children }) => {
  const globalState = useAppSelector((state: RootState) => state);

  if (globalState.authState.auth.isAuth) return <>{children}</>;
  else
    return (
      <div>
        <AuthPage />
      </div>
    );
};
export default AuthInterceptor;
