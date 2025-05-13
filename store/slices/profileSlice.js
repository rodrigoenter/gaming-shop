import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    image: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setImage: (state, action) => {
            state.image = action.payload;
        },
    },
});

export const { setImage } = profileSlice.actions;
export default profileSlice.reducer;