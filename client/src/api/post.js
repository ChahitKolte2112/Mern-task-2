import axios from "axios";
import { SERVER_URL } from "./config";

import { useSelector } from "react-redux";

import { loaderAction, loaderSlice } from "../slices/loaderSlice";
import { postAction } from "../slices/postSlice";
const API = axios.create({ baseURL: SERVER_URL });

export const Create = async (data, dispatch, navigate) => {
    console.log(data);
    dispatch(loaderAction.Setloader(true));
    try {
        const result = await API.post("/api/post/add-post", data, {
            withCredentials: true,
        });

        dispatch(loaderAction.Setloader(false));
        return result;
    } catch (error) {
        console.log(error.message);
        dispatch(loaderAction.Setloader(false));
    }
};
export const Getall = async (dispatch, navigate) => {
    try {
        const result = await API.get("/api/post/all-post", {
            withCredentials: true,
        });

        dispatch(postAction.GetData(result.data));
    } catch (error) {
        console.log(error.message);
        dispatch(loaderAction.Setloader(false));
    }
};
export const Deletepost = async (data, dispatch) => {
    dispatch(loaderAction.Setloader(true));
    console.log(data);
    try {
        const result = await API.delete(`/api/post/delete-post/${data}`, {
            withCredentials: true,
        });

        console.log(result);
        dispatch(loaderAction.Setloader(false));

        return result;
    } catch (error) {
        console.log(error.message);
        dispatch(loaderAction.Setloader(false));
    }
};
export const Editpost = async (data, dispatch) => {
    dispatch(loaderAction.Setloader(true));
    try {
        const result = await API.put(`/api/post/edit-post/${data.id}`, {
            withCredentials: true,
        });
        dispatch(loaderAction.Setloader(false));
    } catch (error) {
        console.log(error.message);
        dispatch(loaderAction.Setloader(false));
    }
};
