import React from "react";
import {
    SafeAreaView,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../components/CustomText";

const Detail = ({ route, navigation }) => {
    const { product } = route.params;

    const agregarAlCarrito = () => {
        console.log("Producto agregado al carrito:", product);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 15,
                    height: 80,
                    marginTop: 40,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Ionicons name="arrow-back" size={30} color="#2912a7" />
                    <CustomText
                        style={{
                            fontSize: 16,
                            color: "#2912a7",
                            marginLeft: 10,
                        }}
                    >
                        Volver al inicio
                    </CustomText>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Image
                    source={{ uri: product.image }}
                    style={{
                        width: "100%",
                        height: 300,
                        resizeMode: "contain",
                        marginBottom: 50,
                    }}
                />
                <CustomText
                    style={{
                        fontSize: 20,
                        color: "#2912a7",
                        fontWeight: "bold",
                        marginBottom: 8,
                    }}
                >
                    {product.title}
                </CustomText>
                <CustomText
                    style={{
                        fontSize: 18,
                        color: "#a40a9b",
                        marginBottom: 16,
                    }}
                >
                    ${product.price}
                </CustomText>
                <CustomText
                    style={{
                        fontSize: 16,
                        lineHeight: 24,
                        marginBottom: 40,
                    }}
                >
                    {product.description}
                </CustomText>
                <TouchableOpacity
                    onPress={agregarAlCarrito}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        backgroundColor: "#2912a7",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 50,
                    }}
                >
                    <Ionicons
                        name="cart-outline"
                        size={16}
                        color="#fff"
                        style={{ marginRight: 10 }}
                    />
                    <CustomText style={{ color: "#fff", fontSize: 16 }}>
                        Agregar al carrito
                    </CustomText>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Detail;