import { createSlice } from '@reduxjs/toolkit';

const carritoSlice = createSlice({
    name: 'carrito',
    initialState: {
        items: [],
    },
    reducers: {
        agregarAlCarrito: (state, action) => {
            const product = action.payload;
            const existingProduct = state.items.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        quitarDelCarrito: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        vaciarCarrito: (state) => {
            state.items = [];
        },
        aumentarCantidad: (state, action) => {
            const product = state.items.find(item => item.id === action.payload);
            if (product) {
                product.quantity += 1;
            }
        },
        disminuirCantidad: (state, action) => {
            const product = state.items.find(item => item.id === action.payload);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        },
    },
});

export const {
    agregarAlCarrito,
    quitarDelCarrito,
    vaciarCarrito,
    aumentarCantidad,
    disminuirCantidad
} = carritoSlice.actions;

export default carritoSlice.reducer;