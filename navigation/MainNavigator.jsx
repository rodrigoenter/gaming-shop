import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { cargarFavoritos } from "../store/slices/favoritosSlice";
import AuthStack from "./AuthStack";
import DrawerNavigator from "./DrawerNavigator";

const MainNavigator = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const favoritosCargados = useSelector((state) => state.favoritos.loaded);

    useEffect(() => {
        if (userId && !favoritosCargados) {
            dispatch(cargarFavoritos(userId));
        }
    }, [userId]);

    return userId ? <DrawerNavigator /> : <AuthStack />;
};

export default MainNavigator;