import { NavLink, Outlet } from "react-router-dom";
import Footer from "./components/modules/Footer/Footer";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { STATIC_URL } from "./index.http";
import { logout } from "./Pages/AuthPage/AuthApi";
import AuthPage from "./Pages/AuthPage/AuthPage";
import { RootState } from "./store/index";
import {
  logoutReducer,
  setAuth,
  setIsNeedAuth,
} from "./store/slices/authSlice";

const endPoints: { to: string; title: string }[] = [
  { to: "home", title: "Главная" },
  { to: "/aboutUs", title: "О нас" },
  { to: "/rooms", title: "Номера" },
  // { to: "/services", title: "Услуги" },
  // { to: "/reviews", title: "Отзывы" },
];

const Navbar: React.FC = () => {
  const appDispatch = useAppDispatch();
  const globalState = useAppSelector((state: RootState) => state);

  const getComponent = () => {
    if (
      globalState.authState.auth.isNeedAuth &&
      !globalState.authState.auth.isAuth
    )
      return <AuthPage />;
    else {
      appDispatch(setIsNeedAuth(false));
      return (
        <>
          <div className="navBar">
            <NavLink className="homeButton" to="home">
              <img
                style={{ height: "150px" }}
                src={
                  STATIC_URL +
                  "/icons/Untitled_logo_1_free-file_(2)-transformed.png"
                }
              />
            </NavLink>
            <div
              className="navButtons"
              style={{
                gridTemplateColumns: `repeat(${endPoints.length}, 1fr)`,
              }}
            >
              {endPoints.map((endPoint) => {
                return (
                  <NavLink
                    key={endPoint.to}
                    className={({ isActive }) =>
                      isActive ? "navlink-active" : "navlink"
                    }
                    to={endPoint.to}
                  >
                    {endPoint.title}
                  </NavLink>
                );
              })}
            </div>
            <div className="localization-labels">
              {globalState.authState.auth.isAuth ? (
                <>
                  <NavLink className="navlink" to={`profile`}>
                    {globalState.authState.auth.user.name}
                  </NavLink>
                  <button
                    className="primary-button"
                    onClick={(e) => {
                      appDispatch(logoutReducer());
                      logout();
                    }}
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <button
                  className="primary-button"
                  onClick={() => {
                    appDispatch(setIsNeedAuth(true));
                  }}
                >
                  Войти / Зарегистрироваться
                </button>
              )}
            </div>
          </div>
          <Outlet />
          <Footer />
        </>
      );
    }
  };

  return getComponent();
};

export default Navbar;
