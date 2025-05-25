import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { cargarFavoritos } from "../store/slices/favoritosSlice";
import { subirFavoritos } from "../services/favoritosService";
import { cargarCarrito, subirCarrito } from "../services/carritoService";
import { setCarrito } from "../store/slices/carritoSlice";
import AuthStack from "./AuthStack";
import DrawerNavigator from "./DrawerNavigator";

const MainNavigator = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const favoritos = useSelector((state) => state.favoritos.items);
    const favoritosCargados = useSelector((state) => state.favoritos.loaded);
    const carrito = useSelector((state) => state.carrito.items);

    useEffect(() => {
        if (userId && !favoritosCargados) {
            dispatch(cargarFavoritos(userId));
        }
    }, [userId, favoritosCargados, dispatch]);

    useEffect(() => {
        if (userId && favoritosCargados) {
            subirFavoritos(userId, favoritos).catch((err) =>
                console.error("Error al sincronizar favoritos:", err)
            );
        }
    }, [favoritos, userId, favoritosCargados]);

    useEffect(() => {
        const fetchCarrito = async () => {
            if (userId) {
                const data = await cargarCarrito(userId);
                dispatch(setCarrito(data));
            }
        };
        fetchCarrito();
    }, [userId, dispatch]);

    useEffect(() => {
        if (userId) {
            subirCarrito(userId, carrito).catch((err) =>
                console.error("Error al sincronizar carrito:", err)
            );
        }
    }, [carrito, userId]);

    return userId ? <DrawerNavigator /> : <AuthStack />;
};

export default MainNavigator;