import { useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdenes } from "../store/slices/ordenesSlice";
import CustomText from "../components/CustomText";
import { Colors } from "../components/colors";

const Ordenes = ({ navigation }) => {
    const dispatch = useDispatch();
    const { ordenes, loading, error } = useSelector((state) => state.ordenes);

    useEffect(() => {
        dispatch(fetchOrdenes());
    }, [dispatch]);

    const renderItem = ({ item }) => (
        <View style={styles.orderCard}>
            <CustomText style={styles.orderDate}>
                Fecha: {item.fecha ? new Date(item.fecha).toLocaleString() : "Sin fecha"}
            </CustomText>

            {Array.isArray(item.items) && item.items.length > 0 ? (
                item.items.map((prod) => (
                    <CustomText key={prod.id} style={styles.productItem}>
                        {prod.title} x {prod.quantity}
                    </CustomText>
                ))
            ) : (
                <CustomText style={styles.productItem}>Sin productos</CustomText>
            )}

            <CustomText style={styles.totalText}>
                Total: ${item.total?.toFixed(2) ?? "0.00"}
            </CustomText>
        </View>
    );

    const renderSeparator = () => (
        <View style={styles.separator} />
    );

    const renderContent = () => {
        if (loading) {
            return (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.center}>
                    <CustomText>Error al cargar órdenes: {error}</CustomText>
                </View>
            );
        }

        if (!Array.isArray(ordenes) || ordenes.length === 0) {
            return (
                <View style={styles.center}>
                    <Ionicons name="receipt-outline" size={120} color={Colors.border} />
                    <CustomText style={styles.emptyText}>
                        Todavía no hiciste ninguna orden 🛒
                    </CustomText>
                </View>
            );
        }

        return (
            <FlatList
                data={ordenes}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={renderSeparator}
                contentContainerStyle={{ padding: 15 }}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={30} color={Colors.primary} />
                    <CustomText style={styles.backText}>Volver atrás</CustomText>
                </TouchableOpacity>
            </View>

            {renderContent()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        height: 80,
        marginTop: 40,
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
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: "center",
        marginTop: 30,
    },
    orderCard: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 16,
        marginBottom: 4,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 8,
    },
    orderDate: {
        color: Colors.secondary,
        marginBottom: 8,
        fontWeight: "bold",
    },
    productItem: {
        color: Colors.textPrimary,
    },
    totalText: {
        marginTop: 10,
        fontWeight: "bold",
        color: Colors.primary,
    },
});

export default Ordenes;