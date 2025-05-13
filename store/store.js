import { configureStore } from "@reduxjs/toolkit";
import carritoReducer from "./slices/carritoSlice";
import favoritosReducer from "./slices/favoritosSlice";
import ordenesReducer from "./slices/ordenesSlice";
import authReducer from "./slices/authSlice";
import { shopApi } from "../services/shopServices";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
    reducer: {
        carrito: carritoReducer,
        favoritos: favoritosReducer,
        ordenes: ordenesReducer,
        auth: authReducer,
        profile: profileReducer,
        [shopApi.reducerPath]: shopApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware),
});
