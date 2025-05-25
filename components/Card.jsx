import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { agregarAFavoritos, quitarDeFavoritos } from '../store/slices/favoritosSlice';
import CustomText from './CustomText';
import CardWrapper from './CardWrapper';
import { Colors } from './colors';

const ProductCard = ({ item }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const favoritos = useSelector(state => state.favoritos.items);

    const hasImage = item.image && item.image.trim() !== '';
    const precioOriginal = parseFloat(item.price);
    const precioConDescuento = (precioOriginal * 0.9).toFixed(2);

    const isFavorito = favoritos.some(fav => fav.id === item.id);

    const handleToggleFavorito = () => {
        if (isFavorito) {
            dispatch(quitarDeFavoritos(item.id));
        } else {
            dispatch(agregarAFavoritos(item));
        }
    };

    return (
        <CardWrapper onPress={() => navigation.navigate('Detail', { product: item })}>
            <View style={styles.imageContainer}>
                {hasImage ? (
                    <Image source={{ uri: item.image }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder} />
                )}
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

            <CustomText weight="Bold" style={styles.title}>
                {item.title}
            </CustomText>

            <View style={styles.priceContainer}>
                <CustomText weight="Regular" style={styles.originalPrice}>
                    ${item.price}
                </CustomText>
                <CustomText weight="Bold" style={styles.discountedPrice}>
                    ${precioConDescuento}
                </CustomText>
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.detailButton,
                    { opacity: pressed ? 0.8 : 1 }
                ]}
                onPress={() => navigation.navigate('Detail', { product: item })}
            >
                <CustomText weight="Regular" style={styles.buttonText}>
                    Ver Detalle
                </CustomText>
            </Pressable>
        </CardWrapper>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.border,
    },
    title: {
        fontSize: 18,
        color: Colors.primary,
        marginBottom: 6,
        textAlign: 'center',
    },
    priceContainer: {
        alignItems: 'center',
        marginBottom: 12,
    },
    originalPrice: {
        fontSize: 14,
        color: Colors.secondary,
        textDecorationLine: 'line-through',
        marginBottom: 4,
    },
    discountedPrice: {
        fontSize: 18,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    discountTag: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        paddingVertical: 4,
        paddingHorizontal: 10,
        zIndex: 1,
    },
    discountText: {
        color: Colors.textAccent,
        fontSize: 12,
        letterSpacing: 0.5,
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 20,
        padding: 8,
    },
    detailButton: {
        backgroundColor: Colors.secondary,
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 16,
        alignSelf: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: Colors.textAccent,
        fontSize: 12,
    },
});

export default ProductCard;