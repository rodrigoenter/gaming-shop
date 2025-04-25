import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../components/colors";

const Header = ({ navigation }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={40} color={Colors.secondary} />
            </TouchableOpacity>
            <Image source={require("../assets/logo-gaming-shop.png")} style={styles.logo} />
            <TouchableOpacity onPress={() => navigation.navigate("Carrito")}>
                <Ionicons name="cart-outline" size={40} color={Colors.primary} />
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
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
});

export default Header;
