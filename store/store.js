import { configureStore } from '@reduxjs/toolkit';
import carritoReducer from './slices/carritoSlice';
import favoritosReducer from './slices/favoritosSlice';

export const store = configureStore({
    reducer: {
        carrito: carritoReducer,
        favoritos: favoritosReducer,
    },
});