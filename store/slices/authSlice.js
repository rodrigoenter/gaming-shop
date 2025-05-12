import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.userId = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;