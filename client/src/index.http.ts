import axios, { AxiosResponse } from "axios";
import { store } from "./main";
import { setAuth } from "./store/slices/authSlice";
export const API_URL = "http://localhost:7000";
export const STATIC_URL = "http://localhost:7000";
export const $host = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// const appDispatch = useAppDispatch();

$host.interceptors.request.use((config) => {
  config.headers!["Access-Control-Allow-Origin"] = `*`;
  config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$host.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    switch (error.response.status) {
      case 401:
        if (error.config && !error.config._isRetry) {
          originalRequest._isRetry = true;
          try {
            const dataUser: AxiosResponse = await axios.get(
              API_URL + "/users/refresh",
              {
                withCredentials: true,
              }
            );
            console.log("dataUser", dataUser);
            localStorage.setItem("token", dataUser.data.accessToken);
            return $host.request(originalRequest);
          } catch (e) {
            console.log("Не авторизован");
          }
          if (error.config._isRetry) {
            console.log("Не авторизован");
            store.dispatch(setAuth({ user: undefined, isAuth: false }));
            // appDispatch(setAuth({ isAuth: false }));
          }
        }
        break;
      //   default:
      //     assistant.dispatch(
      //       setError({
      //         message: error.response.data.message,
      //         status: error.response.status,
      //       })
      //     );
      //     break;
    }
    throw error;
  }
);
