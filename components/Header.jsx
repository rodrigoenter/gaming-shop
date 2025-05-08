import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../components/colors";
import Logo from "../assets/logo-gaming-shop.svg";

const Header = ({ navigation }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={40} color={Colors.secondary} />
            </TouchableOpacity>
            <Logo width={100} height={100} />
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
});

export default Header;