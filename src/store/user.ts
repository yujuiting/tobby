import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "./api";

interface State {
  idToken?: string;
  userInfo?: UserInfo;
}

const initialState: State = {};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signedIn: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    signedOut: (state) => {
      state.userInfo = undefined;
    },
  },
});

export const { signedIn, signedOut } = slice.actions;

export default slice;
