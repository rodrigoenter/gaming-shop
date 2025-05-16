import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: null,
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.address = action.payload;
        },
    },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;