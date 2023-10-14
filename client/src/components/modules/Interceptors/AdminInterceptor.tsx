import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { getAdminRole } from "../../../Pages/AdminPage/AdminApi";
import { RootState } from "../../../store/index";

import "../../../Pages/AuthPage/AuthPage.scss";

const AdminInterceptor: FC<React.PropsWithChildren> = ({ children }) => {
  const globalState = useAppSelector((state: RootState) => state);
  const [adminRole, setAdminRole] = useState<number>(-1);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const init = async () => {
    const aR = await getAdminRole();
    setAdminRole(aR.id);
    console.log("adminRole", adminRole);
    setIsLoad(true);
  };
  useEffect(() => {
    console.log(globalState.authState);
    init();
  }, [globalState.authState]);

  if (isLoad)
    return (
      <>
        {globalState.authState.auth.user?.roles.find(
          (role: any) => role.id === adminRole
        ) ? (
          <>{children}</>
        ) : (
          <div className="authForm-wrapper">
            <h1>Для доступа к этой странице необходимы права администратора</h1>
          </div>
        )}
      </>
    );
};
export default AdminInterceptor;
