import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

const MenuDrawer = ({ navigation }) => {
    return (
        <DrawerContentScrollView style={{ backgroundColor: "#fff", paddingVertical: 20 }}>
            <View style={{ alignItems: "center", marginTop: 20, marginBottom: 100 }}>
                <Image source={require("../assets/foto-usuario.png")} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }} />
                <Text style={{ fontSize: 16, color: "#a40a9b" }}>Mi perfil</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
                <Text style={{ fontSize: 16, color: "#a40a9b", paddingHorizontal: 20, marginVertical: 5 }}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#a40a9b", paddingHorizontal: 20, marginVertical: 5 }}>Categoría 1</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#a40a9b", paddingHorizontal: 20, marginVertical: 5 }}>Categoría 2</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#a40a9b", paddingHorizontal: 20, marginVertical: 5 }}>Categoría 3</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center", marginTop: 300 }}>
                <Image source={require("../assets/logo-drawer.png")} style={{ width: 120, height: 35, resizeMode: "contain" }} />
                <Text style={{ fontSize: 10, color: "#888", marginTop: 10 }}>© 2025 GAMING SHOP</Text>
            </View>
        </DrawerContentScrollView>
    );
};

export default MenuDrawer;