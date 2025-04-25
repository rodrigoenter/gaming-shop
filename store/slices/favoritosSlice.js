import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

export const favoritosSlice = createSlice({
    name: 'favoritos',
    initialState,
    reducers: {
        agregarAFavoritos: (state, action) => {
            const existe = state.items.find(item => item.id === action.payload.id);
            if (!existe) {
                state.items.push(action.payload);
            }
        },
        quitarDeFavoritos: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { agregarAFavoritos, quitarDeFavoritos } = favoritosSlice.actions;

export default favoritosSlice.reducer;