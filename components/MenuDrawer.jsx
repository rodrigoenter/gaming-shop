import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import CustomText from "./CustomText";

const MenuDrawer = ({ navigation }) => {
    return (
        <DrawerContentScrollView contentContainerStyle={styles.container}>
            <View>
                <View style={styles.profile}>
                    <Image source={require("../assets/foto-usuario.png")} style={styles.avatar} />
                    <CustomText style={styles.profileText}>Mi perfil</CustomText>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
                    <CustomText style={styles.item}>Inicio</CustomText>
                </TouchableOpacity>
                <TouchableOpacity>
                    <CustomText style={styles.item}>Categoría 1</CustomText>
                </TouchableOpacity>
                <TouchableOpacity>
                    <CustomText style={styles.item}>Categoría 2</CustomText>
                </TouchableOpacity>
                <TouchableOpacity>
                    <CustomText style={styles.item}>Categoría 3</CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <Image source={require("../assets/logo-drawer.png")} style={styles.logo} />
                <CustomText style={styles.copy}>© 2025 GAMING SHOP</CustomText>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "space-between",
        paddingVertical: 20,
        backgroundColor: "#fff",
    },
    profile: {
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        marginBottom: 40,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileText: {
        fontSize: 16,
        color: "#a40a9b",
    },
    item: {
        fontSize: 16,
        color: "#a40a9b",
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    bottomContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    logo: {
        width: 150,
        height: 40,
        resizeMode: "contain",
    },
    copy: {
        fontSize: 10,
        color: "#888",
        marginTop: 10,
    },
});

export default MenuDrawer;