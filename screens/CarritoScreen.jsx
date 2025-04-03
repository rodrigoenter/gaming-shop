import React from "react";
import { SafeAreaView, View, Image, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CarritoScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, height: 80, marginTop: 70 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="arrow-back" size={30} color="#2912a7" />
                    <Text style={{ fontSize: 16, color: "#2912a7", marginLeft: 10 }}>Volver al inicio</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 75 }}>
                <Image source={require("../assets/empty-cart.png")} style={{ width: 200, height: 200, resizeMode: "contain" }} />
                <Text style={{ fontSize: 16, color: "#888", textAlign: "center", marginTop: 50 }}>
                    Lo sentimos, tu carrito está vacío 🥲{"\n"}Agrega algunos juegos para comenzar.
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 50, backgroundColor: "#2912a7", padding: 10, borderRadius: 50 }}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>Volver al inicio</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CarritoScreen;