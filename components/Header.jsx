import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ navigation }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, height: 80, marginTop: 20 }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={40} color="#a40a9b" />
            </TouchableOpacity>
            <Image source={require("../assets/logo-gaming-shop.png")} style={{ width: 100, height: 100, resizeMode: "contain" }} />
            <TouchableOpacity onPress={() => navigation.navigate("Carrito")}>
                <Ionicons name="cart-outline" size={40} color="#2912a7" />
            </TouchableOpacity>
        </View>
    );
};

export default Header;