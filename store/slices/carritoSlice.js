import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loaded: false,
};

const carritoSlice = createSlice({
    name: "carrito",
    initialState,
    reducers: {
        agregarAlCarrito: (state, action) => {
            const productoExistente = state.items.find(item => item.id === action.payload.id);
            if (productoExistente) {
                productoExistente.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        quitarDelCarrito: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        vaciarCarrito: (state) => {
            state.items = [];
        },
        aumentarCantidad: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        disminuirCantidad: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.id !== action.payload);
            }
        },
        setCarrito: (state, action) => {
            state.items = action.payload;
            state.loaded = true;
        },
    },
});

export const { agregarAlCarrito, quitarDelCarrito, vaciarCarrito, aumentarCantidad, disminuirCantidad, setCarrito } = carritoSlice.actions;

export default carritoSlice.reducer;