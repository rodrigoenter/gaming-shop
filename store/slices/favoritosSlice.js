import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { obtenerFavoritos } from '../../services/favoritosService';

export const cargarFavoritos = createAsyncThunk(
    'favoritos/cargarFavoritos',
    async (userId) => {
        const data = await obtenerFavoritos(userId);
        return data ? data : [];
    }
);

const initialState = {
    items: [],
    loaded: false,
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
        setFavoritos: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(cargarFavoritos.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loaded = true;
        });
    },
});

export const { agregarAFavoritos, quitarDeFavoritos, setFavoritos } = favoritosSlice.actions;
export default favoritosSlice.reducer;