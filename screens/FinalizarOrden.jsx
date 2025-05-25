import { View, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, TextInput, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { useEffect, useState } from "react";
import CustomText from "../components/CustomText";
import { Colors } from "../components/colors";
import { vaciarCarrito } from "../store/slices/carritoSlice";
import { agregarOrden } from "../store/slices/ordenesSlice";
import { Alert } from "react-native";

const FinalizarOrden = ({ navigation }) => {
    const carrito = useSelector((state) => state.carrito.items);
    const total = carrito
        .reduce((acc, item) => acc + item.price * 0.9 * item.quantity, 0)
        .toFixed(2);
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handlePagar = () => {
        if (!cardNumber || !expiry || !cvv || !name) {
            Alert.alert(
                "¡Faltan datos!",
                "Por favor, completá todos los campos.",
                [{ text: "OK", style: "default" }],
                { cancelable: true }
            );
            return;
        }
        setShowConfirmPrompt(true);
    };

    const handleConfirmarOrden = () => {
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

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <CustomText style={styles.loadingText}>Cargando...</CustomText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {!showConfirmPrompt ? (
                <>
                    <CustomText style={styles.confirmText}>Detalles de Pago</CustomText>
                    <View style={styles.cardMock}>
                        <Image
                            source={require("../assets/tarjeta_gs.png")}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.cardInfo}>
                            <CustomText style={styles.cardNumber}>
                                {cardNumber || "**** **** **** ****"}
                            </CustomText>
                            <View style={styles.cardFooter}>
                                <CustomText style={styles.cardName}>
                                    {name || "Nombre Apellido"}
                                </CustomText>
                                <CustomText style={styles.cardExpiry}>
                                    {expiry || "MM/AA"}
                                </CustomText>
                            </View>
                        </View>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del titular"
                        placeholderTextColor="#aaa"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número de tarjeta"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Fecha de expiración (MM/AA)"
                        placeholderTextColor="#aaa"
                        value={expiry}
                        onChangeText={setExpiry}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="CVV"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        secureTextEntry
                        value={cvv}
                        onChangeText={setCvv}
                    />

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={handlePagar} style={styles.confirmButton}>
                            <CustomText style={styles.confirmButtonText}>Pagar</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleCancelar} style={styles.cancelButton}>
                            <CustomText style={styles.cancelButtonText}>Cancelar</CustomText>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <CustomText style={styles.confirmText}>
                        ¿Deseás confirmar tu orden por ${total}?
                    </CustomText>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={handleConfirmarOrden}
                            style={styles.confirmButton}
                        >
                            <CustomText style={styles.confirmButtonText}>
                                Confirmar Orden
                            </CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowConfirmPrompt(false)}
                            style={styles.cancelButton}
                        >
                            <CustomText style={styles.cancelButtonText}>Volver</CustomText>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <CustomText style={styles.modalTitle}>¡Orden enviada!</CustomText>
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
                            <CustomText style={styles.modalButtonText}>
                                Volver al inicio
                            </CustomText>
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
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
    confirmButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 50,
        alignItems: "center",
        flex: 1,
        marginRight: 8,
    },
    confirmButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: Colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 50,
        alignItems: "center",
        flex: 1,
        marginLeft: 8,
    },
    cancelButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundDark,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
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
    input: {
        width: "100%",
        backgroundColor: Colors.textPrimary,
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        color: Colors.textAccent,
    },
    cardMock: {
        width: "100%",
        aspectRatio: 1.6,
        borderRadius: 16,
        marginTop: 20,
        marginBottom: 20,
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        padding: 20,
        position: "relative",
    },
    cardImage: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "115%",
        height: "150%",
        resizeMode: "cover",
        opacity: 0.5,
    },
    cardInfo: {
        zIndex: 1,
    },
    cardNumber: {
        fontSize: 22,
        color: Colors.textAccent,
        letterSpacing: 2,
        marginBottom: 20,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardName: {
        color: Colors.textAccent,
        fontSize: 16,
    },
    cardExpiry: {
        color: Colors.textAccent,
        fontSize: 16,
    },
});

export default FinalizarOrden;