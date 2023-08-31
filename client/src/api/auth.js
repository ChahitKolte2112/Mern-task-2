import axios from "axios";
import {
  AuthError,
  AuthStart,
  AuthSuccess,
  MeRequestError,
  MeRequestStart,
  MeRequestSuccess,
  SignOutError,
  SignOutStart,
  SignOutSuccess,
} from "../slices/userSlice";
import { SERVER_URL } from "./config";
const API = axios.create({ baseURL: SERVER_URL });

export const SignUp = async (data, dispatch, navigate) => {
  dispatch(AuthStart());
  try {
    const result = await API.post("/api/auth/sign-up", data, {
      withCredentials: true,
    });
    dispatch(AuthSuccess(result.data));
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch(AuthError(error.response));
  }
};

export const SignIn = async (data, dispatch, navigate) => {
  dispatch(AuthStart());
  try {
    const result = await API.post("/api/auth/sign-in", data, {
      withCredentials: true,
    });
    dispatch(AuthSuccess(result.data));
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch(AuthError(error.response));
  }
};

export const MeRequest = async (dispatch, navigate) => {
  dispatch(MeRequestStart());
  try {
    const result = await API.get("/api/auth/me", { withCredentials: true });
    dispatch(MeRequestSuccess(result.data));
  } catch (error) {
    navigate("/sign-in");
    dispatch(MeRequestError(error.response));
  }
};

export const SignOut = async (dispatch, navigate) => {
  dispatch(SignOutStart());
  try {
    const result = await API.get("/api/auth/sign-out", {
      withCredentials: true,
    });
    dispatch(SignOutSuccess());
    navigate("/sign-in");
  } catch (error) {
    SignOutError(error.response);
  }
};
