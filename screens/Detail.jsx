import React from "react";
import { SafeAreaView, View, Image, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import { Colors } from '../components/colors';
import { useDispatch, useSelector } from 'react-redux';
import { agregarAlCarrito } from '../store/slices/carritoSlice';
import { agregarAFavoritos, quitarDeFavoritos } from '../store/slices/favoritosSlice';
import Toast from 'react-native-toast-message';

const Detail = ({ route, navigation }) => {
    const { product } = route.params;
    const dispatch = useDispatch();

    const favoritos = useSelector(state => state.favoritos.items);

    const isFavorito = favoritos.some(fav => fav.id === product.id);

    const precioOriginal = parseFloat(product.price);
    const precioConDescuento = (precioOriginal * 0.9).toFixed(2);

    const handleAgregarAlCarrito = () => {
        dispatch(agregarAlCarrito(product));
        console.log("Producto agregado al carrito:", product.title);

        Toast.show({
            type: 'success',
            position: 'top',
            topOffset: 50,
            rightOffset: 20,
            text1: `${product.title} agregado al carrito`,
            text2: '¡Puedes ver tu carrito en cualquier momento!',
            visibilityTime: 3000,
            autoHide: true,
        });
    };

    const handleToggleFavorito = () => {
        if (isFavorito) {
            dispatch(quitarDeFavoritos(product.id));
        } else {
            dispatch(agregarAFavoritos(product));
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={30} color={Colors.primary} />
                    <CustomText style={styles.backText}>
                        Volver atrás
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Compartir")}>
                    <Ionicons name="share-social" size={30} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                    />
                    <View style={styles.discountTag}>
                        <CustomText weight="Bold" style={styles.discountText}>
                            10% OFF
                        </CustomText>
                    </View>

                    <Pressable style={styles.favoriteButton} onPress={handleToggleFavorito}>
                        <Ionicons
                            name={isFavorito ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isFavorito ? Colors.primary : Colors.textSecondary}
                        />
                    </Pressable>
                </View>

                <View style={styles.detailsContainer}>
                    <CustomText style={styles.title}>
                        {product.title}
                    </CustomText>

                    <View style={styles.priceContainer}>
                        <CustomText style={styles.originalPrice}>
                            ${product.price}
                        </CustomText>
                        <CustomText style={styles.discountedPrice}>
                            ${precioConDescuento}
                        </CustomText>
                    </View>

                    <CustomText style={styles.description}>
                        {product.description}
                    </CustomText>

                    <TouchableOpacity
                        onPress={handleAgregarAlCarrito}
                        style={styles.buyButton}
                    >
                        <CustomText style={styles.buttonText}>
                            Agregar al carrito
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = {
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 80,
        marginTop: 40,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backText: {
        fontSize: 16,
        color: Colors.primary,
        marginLeft: 10
    },
    imageContainer: {
        position: 'relative',
        paddingHorizontal: 20,
    },
    productImage: {
        width: "100%",
        height: 300,
        resizeMode: "contain",
        borderRadius: 16,
    },
    discountTag: {
        position: 'absolute',
        top: 20,
        right: 35,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        paddingVertical: 6,
        paddingHorizontal: 12,
        zIndex: 1,
    },
    discountText: {
        color: Colors.textAccent,
        fontSize: 14,
        letterSpacing: 0.5,
    },
    detailsContainer: {
        padding: 20
    },
    title: {
        fontSize: 24,
        color: Colors.primary,
        fontWeight: "bold",
        marginBottom: 10
    },
    priceContainer: {
        marginVertical: 15
    },
    originalPrice: {
        fontSize: 18,
        color: Colors.secondary,
        textDecorationLine: 'line-through',
        marginBottom: 5
    },
    discountedPrice: {
        fontSize: 24,
        color: Colors.primary,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 16,
        color: Colors.textSecondary,
        lineHeight: 24,
        marginTop: 15
    },
    buyButton: {
        marginTop: 30,
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: "center",
    },
    buttonText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
    favoriteButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 20,
        padding: 8,
    },
};

export default Detail;