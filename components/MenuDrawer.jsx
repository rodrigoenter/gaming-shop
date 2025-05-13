import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomText from "./CustomText";
import SearchInput from "./SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../store/slices/profileSlice";
import { subirImagenPerfil, obtenerImagenPerfil } from "../services/profileService";
import { Colors } from "../components/colors";

import PS5Icon from "../assets/iconos_consolas/ps5.svg";
import PS4Icon from "../assets/iconos_consolas/ps4.svg";
import SeriesXIcon from "../assets/iconos_consolas/series_x.svg";
import SeriesSIcon from "../assets/iconos_consolas/series_s.svg";
import Switch1Icon from "../assets/iconos_consolas/switch_1.svg";
import Switch2Icon from "../assets/iconos_consolas/switch_2.svg";

const categorias = [
    { nombre: "Playstation", icono: "logo-playstation", subcategorias: ["PS5", "PS4"] },
    { nombre: "Xbox", icono: "logo-xbox", subcategorias: ["Series X", "Series S"] },
    { nombre: "Nintendo", icono: "game-controller-outline", subcategorias: ["Switch 2", "Switch 1"] },
    { nombre: "Dirección de entrega", icono: "location-outline", subcategorias: [] },
    { nombre: "Acerca de nosotros", icono: "information-circle-outline", subcategorias: [] },
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
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const image = useSelector((state) => state.profile.image);

    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (userId) {
                    const url = await obtenerImagenPerfil(userId);
                    if (url) dispatch(setImage(url));
                }
            } catch (error) {
                console.error("Error cargando imagen de perfil:", error.message);
            }
        };
        fetchImage();
    }, [userId]);

    const handleSelectImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permiso denegado", "Necesitamos acceso a la cámara.");
            return;
        }

        Alert.alert("Seleccionar imagen", "¿Desde dónde querés cargar tu foto?", [
            {
                text: "Galería",
                onPress: async () => {
                    const result = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 0.5,
                    });
                    if (!result.canceled && result.assets?.length > 0) {
                        await guardarImagen(result.assets[0].uri);
                    }
                },
            },
            {
                text: "Cámara",
                onPress: async () => {
                    const result = await ImagePicker.launchCameraAsync({
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 0.5,
                    });
                    if (!result.canceled && result.assets?.length > 0) {
                        await guardarImagen(result.assets[0].uri);
                    }
                },
            },
            { text: "Cancelar", style: "cancel" },
        ]);
    };

    const guardarImagen = async (uri) => {
        try {
            setLoading(true);
            await subirImagenPerfil(userId, uri);
            dispatch(setImage(uri));
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la imagen.");
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (nombre) => {
        setExpanded((prev) => ({ ...prev, [nombre]: !prev[nombre] }));
    };

    return (
        <DrawerContentScrollView contentContainerStyle={styles.container}>
            <View>
                <View style={styles.profile}>
                    <View style={styles.avatarWrapper}>
                        <TouchableOpacity onPress={handleSelectImage} style={styles.avatarContainer}>
                            {loading ? (
                                <ActivityIndicator size="small" color={Colors.primary} />
                            ) : (
                                <Image
                                    source={image ? { uri: image } : require("../assets/foto-usuario.png")}
                                    style={styles.avatar}
                                />
                            )}
                        </TouchableOpacity>
                        <Ionicons
                            name="camera"
                            size={22}
                            color={Colors.primary}
                            style={styles.cameraIcon}
                        />
                    </View>
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
                                    } else if (cat.nombre === "Dirección de entrega") {
                                        navigation.navigate("Dirección de entrega");
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
    container: {
        flexGrow: 1,
        justifyContent: "space-between",
        paddingVertical: 20,
        backgroundColor: Colors.background,
    },
    profile: {
        alignItems: "center",
        justifyContent: "center",
        height: 170,
        marginBottom: 20,
    },
    avatarWrapper: {
        position: "relative",
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    avatarContainer: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primary,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    cameraIcon: {
        position: "absolute",
        bottom: -2,
        right: -2,
        backgroundColor: Colors.textAccent,
        borderRadius: 15,
        padding: 5,
        zIndex: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    profileText: {
        fontSize: 16,
        color: Colors.secondary,
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    icon: {
        marginRight: 10,
    },
    item: {
        fontSize: 16,
        color: Colors.secondary,
    },
    subItemContainer: {
        paddingLeft: 50,
    },
    subItem: {
        fontSize: 14,
        color: Colors.primary,
        paddingVertical: 2,
    },
    noResultsContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    noResultsText: {
        fontSize: 14,
        color: Colors.primary,
        fontStyle: "italic",
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
        color: Colors.textSecondary,
        marginTop: 10,
    },
});

export default MenuDrawer;