import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";
import SearchInput from "./SearchInput";
import PS5Icon from "../assets/iconos_consolas/ps5.svg";
import PS4Icon from "../assets/iconos_consolas/ps4.svg";
import SeriesXIcon from "../assets/iconos_consolas/series_x.svg";
import SeriesSIcon from "../assets/iconos_consolas/series_s.svg";
import Switch1Icon from "../assets/iconos_consolas/switch_1.svg";
import Switch2Icon from "../assets/iconos_consolas/switch_2.svg";
import { Colors } from "../components/colors";

const categorias = [
    { nombre: "Playstation", icono: "logo-playstation", subcategorias: ["PS5", "PS4"] },
    { nombre: "Xbox", icono: "logo-xbox", subcategorias: ["Series X", "Series S"] },
    { nombre: "Nintendo", icono: "game-controller-outline", subcategorias: ["Switch 2", "Switch 1"] },
    { nombre: "Acerca de nosotros", icono: "information-circle-outline", subcategorias: [] },
    { nombre: "Soporte técnico", icono: "help-circle-outline", subcategorias: [] },
];

const getSubcategoriaIcon = (nombre) => {
    switch (nombre) {
        case "PS5": return <PS5Icon width={28} height={18} style={styles.icon} />;
        case "PS4": return <PS4Icon width={28} height={18} style={styles.icon} />;
        case "Series X": return <SeriesXIcon width={18} height={18} style={styles.icon} />;
        case "Series S": return <SeriesSIcon width={18} height={18} style={styles.icon} />;
        case "Switch 2": return <Switch2Icon width={28} height={28} style={styles.icon} />;
        case "Switch 1": return <Switch1Icon width={18} height={18} style={styles.icon} />;
        default: return null;
    }
};

const MenuDrawer = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");
    const [expanded, setExpanded] = useState({});
    const [filteredCategorias, setFilteredCategorias] = useState(categorias);

    useEffect(() => {
        const lowerSearch = searchText.toLowerCase();
        const filtradas = categorias
            .map((cat) => {
                const matchCategoria = cat.nombre.toLowerCase().includes(lowerSearch);
                const matchSub = cat.subcategorias.filter((sub) => sub.toLowerCase().includes(lowerSearch));
                if (matchCategoria || matchSub.length > 0) {
                    return { ...cat, subcategorias: matchCategoria ? cat.subcategorias : matchSub };
                }
                return null;
            })
            .filter(Boolean);
        setFilteredCategorias(filtradas);
    }, [searchText]);

    const toggleExpand = (nombre) => {
        setExpanded((prev) => ({ ...prev, [nombre]: !prev[nombre] }));
    };

    return (
        <DrawerContentScrollView contentContainerStyle={styles.container}>
            <View>
                <View style={styles.profile}>
                    <Image source={require("../assets/foto-usuario.png")} style={styles.avatar} />
                    <CustomText style={styles.profileText}>Mi perfil</CustomText>
                </View>

                <SearchInput value={searchText} onChangeText={setSearchText} />

                <TouchableOpacity onPress={() => {
                    navigation.navigate("Inicio");
                    navigation.closeDrawer();
                }}>
                    <View style={styles.iconRow}>
                        <Ionicons name="home-outline" size={18} color={Colors.primary} style={styles.icon} />
                        <CustomText style={styles.item}>Inicio</CustomText>
                    </View>
                </TouchableOpacity>

                {filteredCategorias.length > 0 ? (
                    filteredCategorias.map((cat, index) => (
                        <View key={index}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (cat.nombre === "Acerca de nosotros") {
                                        navigation.navigate("Acerca de nosotros");
                                    } else if (cat.subcategorias.length === 0) {
                                        navigation.navigate("Inicio", {
                                            screen: "HomeTabs",
                                            params: { screen: "Home", params: { categoria: cat.nombre } }
                                        });
                                    } else {
                                        toggleExpand(cat.nombre);
                                    }
                                }}
                                style={styles.iconRow}
                            >
                                <Ionicons name={cat.icono} size={20} color={Colors.primary} style={styles.icon} />
                                <CustomText style={styles.item}>{cat.nombre}</CustomText>
                            </TouchableOpacity>
                            {expanded[cat.nombre] && cat.subcategorias.map((sub, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={styles.subItemContainer}
                                    onPress={() => {
                                        navigation.navigate("Inicio", {
                                            screen: "HomeTabs",
                                            params: { screen: "Home", params: { categoria: sub } }
                                        });
                                        navigation.closeDrawer();
                                    }}
                                >
                                    <View style={styles.iconRow}>
                                        {getSubcategoriaIcon(sub)}
                                        <CustomText style={styles.subItem}>{sub}</CustomText>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))
                ) : (
                    <View style={styles.noResultsContainer}>
                        <CustomText style={styles.noResultsText}>Tu búsqueda no encontró resultados 🥲</CustomText>
                    </View>
                )}
            </View>

            <View style={styles.bottomContainer}>
                <Image source={require("../assets/logo-drawer.png")} style={styles.logo} />
                <CustomText style={styles.copy}>© 2025 GAMING SHOP</CustomText>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: "space-between", paddingVertical: 20, backgroundColor: Colors.background },
    profile: { alignItems: "center", justifyContent: "center", height: 150, marginBottom: 20 },
    avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
    profileText: { fontSize: 16, color: Colors.secondary },
    iconRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginVertical: 5 },
    icon: { marginRight: 10 },
    item: { fontSize: 16, color: Colors.secondary },
    subItemContainer: { paddingLeft: 50 },
    subItem: { fontSize: 14, color: Colors.primary, paddingVertical: 2 },
    noResultsContainer: { paddingHorizontal: 20, marginTop: 10 },
    noResultsText: { fontSize: 14, color: Colors.primary, fontStyle: "italic" },
    bottomContainer: { alignItems: "center", paddingVertical: 20 },
    logo: { width: 150, height: 40, resizeMode: "contain" },
    copy: { fontSize: 10, color: Colors.textSecondary, marginTop: 10 },
});

export default MenuDrawer;