import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthPayload {
  user: { email: string; name: string; roles: number[] } | undefined;
  isAuth: boolean;
  isNeedAuth: boolean;
}

const initialState: AuthPayload = {
  isAuth: false,
  user: undefined,
  isNeedAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsNeedAuth(state: AuthPayload, action: PayloadAction<boolean>) {
      state.isNeedAuth = action.payload;
    },
    setAuth(state: AuthPayload, action: PayloadAction<{ isAuth: boolean }>) {
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
    },
    logoutReducer(state: AuthPayload, action: any) {
      state.user = undefined;
      state.isAuth = false;
    },
  },
  extraReducers: {},
});

export const { setAuth, logoutReducer, setIsNeedAuth } = authSlice.actions;

export default authSlice.reducer;
