import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../components/colors";
import Logo from "../assets/logo-gaming-shop.svg";
import { useSelector } from "react-redux";

const Header = ({ navigation }) => {
    const carritoItems = useSelector((state) => state.carrito.items);
    const cantidadItems = carritoItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={40} color={Colors.secondary} />
            </TouchableOpacity>
            <Logo width={100} height={100} />
            <TouchableOpacity onPress={() => navigation.navigate("Carrito")}>
                <View style={styles.cartIconContainer}>
                    <Ionicons name="cart-outline" size={40} color={Colors.primary} />
                    {cantidadItems > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cantidadItems}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        height: 100,
        backgroundColor: Colors.background,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ccc",
        paddingBottom: 5,
    },
    cartIconContainer: {
        position: "relative",
    },
    cartBadge: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: Colors.secondary,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    cartBadgeText: {
        fontSize: 12,
        color: Colors.textAccent,
        fontWeight: "bold",
    },
});

export default Header;