import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    isLoggedIn: false,
    isPending: false,
    isErrors: false,
    errorMessage: {
      authForm: "",
    },
  },
  reducers: {
    AuthStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    AuthError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
      console.log(action.payload);
      state.errorMessage.authForm = action.payload.data.message;
      // state.errorMessage.authForm = action.payload.data.message;
    },
    AuthSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    SignOutStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    SignOutSuccess: (state) => {
      state.userInfo = null;
      state.isPending = false;
      state.isLoggedIn = false;
    },
    SignOutError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
    MeRequestStart: (state, action) => {
      state.isErrors = false;
      state.isPending = true;
    },
    MeRequestSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    MeRequestError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
  },
});

export const {
  AuthError,
  AuthStart,
  AuthSuccess,
  SignOutStart,
  SignOutSuccess,
  SignOutError,
  MeRequestError,
  MeRequestStart,
  MeRequestSuccess,
} = userSlice.actions;

export const selectUser = (state) => state.user.userInfo;
export const UserState = (state) => state.user;
export default userSlice.reducer;
