import { createSlice } from "@reduxjs/toolkit";
export const postSlice = createSlice({
    name: "post",
    initialState: {
        postdata: [],
    },
    reducers: {
        GetData: (state, action) => {
            state.postdata = [...action.payload];
        },
    },
});

export const postAction = postSlice.actions;
