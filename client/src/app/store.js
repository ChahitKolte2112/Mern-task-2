import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import { loaderSlice } from "../slices/loaderSlice";
import { postSlice } from "../slices/postSlice";
import modalSlice from "../slices/modalSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        loader: loaderSlice.reducer,
        data: postSlice.reducer,
        modal: modalSlice.reducer,
    },
});
