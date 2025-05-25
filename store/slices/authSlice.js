import { createSlice } from '@reduxjs/toolkit';
import { initDB, insertSession, fetchSession, deleteSession } from '../../database';

const initialState = {
    userId: null,
    token: null,
    loadingSession: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.loadingSession = false;
        },
        logout: (state) => {
            state.userId = null;
            state.token = null;
            state.loadingSession = false;
        },
        setLoading: (state, action) => {
            state.loadingSession = action.payload;
        },
    },
});

export const { setUser, logout, setLoading } = authSlice.actions;

export const restoreSession = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await initDB();
        const session = await fetchSession();
        if (session) {
            dispatch(setUser({ userId: session.userId, token: session.token }));
        } else {
            dispatch(setLoading(false));
        }
    } catch (error) {
        console.error("Error restaurando sesión:", error);
        dispatch(setLoading(false));
    }
};

export const loginAndPersist = (userId, token) => async (dispatch) => {
    try {
        await initDB();
        await insertSession(userId, token);
        dispatch(setUser({ userId, token }));
    } catch (error) {
        console.error("Error guardando sesión:", error);
    }
};

export const logoutAndClear = () => async (dispatch) => {
    try {
        await initDB();
        await deleteSession();
        dispatch(logout());
    } catch (error) {
        console.error("Error eliminando sesión:", error);
    }
};

export default authSlice.reducer;