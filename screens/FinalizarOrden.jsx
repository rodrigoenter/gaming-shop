import { View, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
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
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFinalizarOrden = () => {
        if (carrito.length === 0) return;

        setIsLoading(true);

        setTimeout(() => {
            const nuevaOrden = {
                id: Date.now().toString(),
                fecha: new Date().toISOString(),
                items: carrito,
                total: parseFloat(total),
            };

            dispatch(agregarOrden(nuevaOrden));
            dispatch(vaciarCarrito());
            setIsLoading(false);
            setModalVisible(true);
        }, 2000);
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

            {/* Indicador de carga */}
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <CustomText style={styles.loadingText}>Procesando tu orden...</CustomText>
                </View>
            )}

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <CustomText style={styles.modalTitle}>🎮 ¡Orden enviada!</CustomText>
                        <CustomText style={styles.modalMessage}>
                            Tu compra fue registrada correctamente. ¡Gracias por elegirnos!
                        </CustomText>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [
                                            {
                                                name: "HomeTabs",
                                                state: {
                                                    index: 2,
                                                    routes: [
                                                        { name: "Home" },
                                                        { name: "Favoritos" },
                                                        { name: "Ordenes" },
                                                        { name: "Previews" },
                                                    ],
                                                },
                                            },
                                        ],
                                    })
                                );
                            }}
                        >
                            <CustomText style={styles.modalButtonText}>Volver al inicio</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundDark,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    confirmText: {
        fontSize: 20,
        color: Colors.textAccent,
        marginBottom: 30,
        textAlign: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    confirmButton: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        marginRight: 8,
        borderRadius: 50,
        alignItems: "center",
    },
    confirmButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingVertical: 12,
        marginLeft: 8,
        borderRadius: 50,
        alignItems: "center",
    },
    cancelButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
    loadingContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: Colors.backgroundDark,
        transform: [{ translateX: -75 }, { translateY: -50 }],
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
    loadingText: {
        color: Colors.textAccent,
        marginTop: 12,
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    modalBox: {
        backgroundColor: Colors.backgroundDark,
        padding: 24,
        borderRadius: 16,
        alignItems: "center",
        width: "100%",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.textAccent,
        marginBottom: 12,
        textAlign: "center",
    },
    modalMessage: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        alignItems: "center",
        width: "80%",
    },
    modalButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
});

export default FinalizarOrden;