import { SafeAreaView, View, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import { Colors } from "../components/colors";
import { useSelector, useDispatch } from "react-redux";
import { quitarDelCarrito, vaciarCarrito, aumentarCantidad, disminuirCantidad } from "../store/slices/carritoSlice";

const Carrito = ({ navigation }) => {
    const carritoItems = useSelector((state) => state.carrito.items);
    const dispatch = useDispatch();

    const handleQuitarDelCarrito = (id) => {
        dispatch(quitarDelCarrito(id));
    };

    const handleVaciarCarrito = () => {
        dispatch(vaciarCarrito());
    };

    const handleAumentarCantidad = (id) => {
        dispatch(aumentarCantidad(id));
    };

    const handleDisminuirCantidad = (id) => {
        dispatch(disminuirCantidad(id));
    };

    const calcularTotal = () => {
        return carritoItems
            .reduce((acc, item) => acc + (item.price * 0.9) * item.quantity, 0)
            .toFixed(2);
    };

    const handleIrAFinalizarOrden = () => {
        navigation.navigate("FinalizarOrden");
    };

    const renderItem = ({ item }) => {
        const precioConDescuento = (item.price * 0.9).toFixed(2);
        const totalItem = (precioConDescuento * item.quantity).toFixed(2);

        return (
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                    <CustomText weight="Bold" style={styles.cardTitle}>
                        {item.title}
                    </CustomText>
                    <CustomText style={styles.cardPrice}>
                        ${precioConDescuento} x {item.quantity} = ${totalItem}
                    </CustomText>
                    <View style={styles.quantityControls}>
                        <TouchableOpacity onPress={() => handleDisminuirCantidad(item.id)}>
                            <Ionicons name="remove-circle" size={24} color={Colors.primary} />
                        </TouchableOpacity>
                        <CustomText style={styles.quantityText}>{item.quantity}</CustomText>
                        <TouchableOpacity onPress={() => handleAumentarCantidad(item.id)}>
                            <Ionicons name="add-circle" size={24} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleQuitarDelCarrito(item.id)}>
                        <CustomText style={styles.removeButton}>Quitar</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color={Colors.primary} />
                    <CustomText style={styles.backText}>Volver al inicio</CustomText>
                </TouchableOpacity>
            </View>

            {carritoItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Image
                        source={require("../assets/empty-cart.png")}
                        style={styles.emptyImage}
                    />
                    <CustomText style={styles.emptyText}>
                        Lo sentimos, tu carrito está vacío 🥲{"\n"}Agrega algunos juegos para comenzar.
                    </CustomText>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.returnButton}>
                        <CustomText style={styles.returnButtonText}>Volver al inicio</CustomText>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={carritoItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                    <View style={styles.footer}>
                        <CustomText style={styles.totalText}>
                            Total: ${calcularTotal()}
                        </CustomText>
                        <TouchableOpacity onPress={handleIrAFinalizarOrden} style={styles.finalizarButton}>
                            <CustomText style={styles.finalizarButtonText}>Finalizar Orden</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleVaciarCarrito} style={styles.clearButton}>
                            <CustomText style={styles.clearButtonText}>Vaciar carrito</CustomText>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        marginTop: 40,
        height: 80,
        backgroundColor: Colors.background,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    backText: {
        fontSize: 16,
        color: Colors.primary,
        marginLeft: 10,
    },

    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    emptyImage: {
        width: 200,
        height: 200,
        resizeMode: "contain",
    },
    emptyText: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: "center",
        marginTop: 30,
    },
    returnButton: {
        marginTop: 30,
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    returnButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 16,
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        resizeMode: 'contain',
        marginRight: 12,
        backgroundColor: Colors.border,
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 4,
    },
    cardPrice: {
        fontSize: 14,
        color: Colors.secondary,
        marginBottom: 6,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: Colors.textPrimary,
    },
    removeButton: {
        color: Colors.secondary,
        fontSize: 14,
        marginTop: 4,
    },
    footer: {
        backgroundColor: Colors.background,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    totalText: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.primary,
        marginBottom: 10,
    },
    clearButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: "center",
    },
    clearButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
    finalizarButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: "center",
        marginBottom: 10,
    },
    finalizarButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
});

export default Carrito;