import { createSlice } from "@reduxjs/toolkit";
export const loaderSlice = createSlice({
    name: 'loaders',
    initialState: {
        loading: null,
    },
    reducers: {
        Setloader: (state, action) => {
            state.loading = action.payload;
        },
    },
});
export const loaderAction  = loaderSlice.actions;
