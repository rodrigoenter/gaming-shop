import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import CustomText from "../components/CustomText";
import { Colors } from "../components/colors";
import { vaciarCarrito } from "../store/slices/carritoSlice";
import { agregarOrden } from "../store/slices/ordenesSlice";

const FinalizarOrden = ({ navigation }) => {
    const carrito = useSelector((state) => state.carrito.items);
    const total = carrito
        .reduce((acc, item) => acc + item.price * 0.9 * item.quantity, 0)
        .toFixed(2);
    const dispatch = useDispatch();

    const handleFinalizarOrden = () => {
        if (carrito.length === 0) {
            Alert.alert("Carrito vacío", "Agrega productos antes de finalizar la orden.");
            return;
        }

        const nuevaOrden = {
            id: Date.now().toString(),
            fecha: new Date().toISOString(),
            items: carrito,
            total: parseFloat(total),
        };

        dispatch(agregarOrden(nuevaOrden));
        dispatch(vaciarCarrito());

        Alert.alert("¡Éxito!", "Tu orden fue enviada correctamente.", [
            {
                text: "OK",
                onPress: () => {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'HomeTabs',
                                    state: {
                                        index: 2,
                                        routes: [
                                            { name: 'Home' },
                                            { name: 'Favoritos' },
                                            { name: 'Ordenes' },
                                            { name: 'Previews' },
                                        ],
                                    },
                                },
                            ],
                        })
                    );
                }
            }
        ]);
    };

    const handleCancelar = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CustomText style={styles.confirmText}>
                ¿Deseás confirmar tu orden por ${total}?
            </CustomText>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleFinalizarOrden} style={styles.confirmButton}>
                    <CustomText style={styles.confirmButtonText}>Confirmar Orden</CustomText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelar} style={styles.cancelButton}>
                    <CustomText style={styles.cancelButtonText}>Cancelar</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    confirmText: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 30,
        color: Colors.textPrimary,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
    },
    confirmButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        flex: 1,
        marginRight: 10,
        borderRadius: 30,
    },
    confirmButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
        textAlign: "center",
    },
    cancelButton: {
        backgroundColor: Colors.secondary,
        paddingVertical: 15,
        flex: 1,
        marginLeft: 10,
        borderRadius: 30,
    },
    cancelButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
        textAlign: "center",
    },
});

export default FinalizarOrden;