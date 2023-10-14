import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import "./scss/App.scss";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./hooks/redux";
import { RootState } from "./store/index";
import { setAuth } from "./store/slices/authSlice";
import { API_URL } from "./index.http";
import AuthPage from "./components/AuthPage/AuthPage";
import axios from "axios";

function App() {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    const init = async () => {
      if (localStorage.getItem("token")) {
        try {
          const dataUser = await axios.get(API_URL + "/users/refresh", {
            withCredentials: true,
          });
          localStorage.setItem("token", dataUser.data.accessToken);
          console.log("dataUser", dataUser);
          appDispatch(
            setAuth({
              user: dataUser.data.user,
              isAuth: true,
            })
          );
        } catch (e) {
          console.log("error", e);
        }
      }
    };
    init();
  }, []);

  // const store = useSelector((state: RootState) => state.authState.auth.isAuth);

  // if (!store) {
  //   return <AuthPage />;
  // }
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <div className="app-background">
          <AppRouter />
        </div>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
