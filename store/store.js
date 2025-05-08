import { configureStore } from "@reduxjs/toolkit";
import carritoReducer from "./slices/carritoSlice";
import favoritosReducer from "./slices/favoritosSlice";
import ordenesReducer from "./slices/ordenesSlice";
import { shopApi } from "../services/shopServices";

export const store = configureStore({
    reducer: {
        carrito: carritoReducer,
        favoritos: favoritosReducer,
        ordenes: ordenesReducer,
        [shopApi.reducerPath]: shopApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware),
});