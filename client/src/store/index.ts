import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";

const authState = combineReducers({
  auth: auth,
});

const rootReducer = combineReducers({ authState });

export function setupHotelState() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppHotel = ReturnType<typeof setupHotelState>;
export type AppDispatch = AppHotel["dispatch"];
