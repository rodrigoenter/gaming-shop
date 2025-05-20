import { useEffect } from "react";
import { SafeAreaView, View, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../components/CustomText';
import { Colors } from '../components/colors';
import { useSelector, useDispatch } from 'react-redux';
import { quitarDeFavoritos } from '../store/slices/favoritosSlice';
import { agregarAlCarrito } from '../store/slices/carritoSlice';
import Toast from 'react-native-toast-message';
import { subirFavoritos } from '../services/favoritosService';

const Favoritos = ({ navigation }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const favoritos = useSelector((state) => state.favoritos.items);

    useEffect(() => {
        if (userId) {
            subirFavoritos(userId, favoritos);
        }
    }, [favoritos, userId]);

    const handleRemove = (id) => {
        dispatch(quitarDeFavoritos(id));
    };

    const handleAddToCart = (item) => {
        dispatch(agregarAlCarrito(item));
        Toast.show({
            type: 'success',
            text1: 'Agregado al carrito 🛒',
            text2: `${item.title} se ha añadido correctamente.`,
            position: 'bottom',
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
                <CustomText weight="Bold" style={styles.title}>
                    {item.title}
                </CustomText>
                <CustomText style={styles.price}>${(item.price * 0.9).toFixed(2)}</CustomText>

                <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.favoriteButton}>
                    <Ionicons name="heart-dislike" size={24} color={Colors.secondary} />
                    <CustomText style={styles.favoriteText}>Eliminar favorito</CustomText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.cartButton}>
                    <Ionicons name="cart" size={24} color={Colors.primary} />
                    <CustomText style={styles.cartText}>Agregar al carrito</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={30} color={Colors.primary} />
                    <CustomText style={styles.backText}>Volver atrás</CustomText>
                </TouchableOpacity>
            </View>

            {favoritos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={120} color={Colors.border} />
                    <CustomText style={styles.emptyText}>
                        Todavía no agregaste favoritos 🥲
                    </CustomText>
                </View>
            ) : (
                <FlatList
                    data={favoritos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 15 }}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 80,
        marginTop: 40,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: 16,
        color: Colors.primary,
        marginLeft: 10,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 30,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 16,
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        resizeMode: 'contain',
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: Colors.secondary,
        marginBottom: 5,
    },
    favoriteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    favoriteText: {
        marginLeft: 8,
        fontSize: 14,
        color: Colors.secondary,
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartText: {
        marginLeft: 8,
        fontSize: 14,
        color: Colors.primary,
    },
});

export default Favoritos;