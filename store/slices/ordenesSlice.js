import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const agregarOrden = createAsyncThunk(
    "ordenes/agregarOrden",
    async (orden, thunkAPI) => {
        try {
            const response = await fetch(
                "https://gaming-shop-1ec5c-default-rtdb.firebaseio.com/ordenes.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orden),
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo agregar la orden");
            }

            const data = await response.json();
            return { ...orden, id: data.name };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    ordenes: [],
    loading: false,
    error: null,
};

export const fetchOrdenes = createAsyncThunk(
    "ordenes/fetchOrdenes",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("https://gaming-shop-1ec5c-default-rtdb.firebaseio.com/ordenes.json");
            const data = await response.json();

            if (!data) return [];

            const ordenesArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));

            return ordenesArray.reverse();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const ordenesSlice = createSlice({
    name: "ordenes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdenes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdenes.fulfilled, (state, action) => {
                state.loading = false;
                state.ordenes = action.payload;
            })
            .addCase(fetchOrdenes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(agregarOrden.pending, (state) => {
                state.loading = true;
            })
            .addCase(agregarOrden.fulfilled, (state, action) => {
                state.loading = false;
                state.ordenes.push(action.payload);
            })
            .addCase(agregarOrden.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ordenesSlice.reducer;
