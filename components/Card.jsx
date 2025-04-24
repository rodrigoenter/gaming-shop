import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';

const Card = ({ item }) => {
    const navigation = useNavigation();

    return (
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('Detalle', { product: item })}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <CustomText weight="Bold" style={styles.title}>
                {item.title}
            </CustomText>
            <CustomText weight="Regular" style={styles.price}>
                ${item.price}
            </CustomText>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { opacity: pressed ? 0.8 : 1 }
                ]}
                onPress={() => navigation.navigate('Detalle', { product: item })}
            >
                <CustomText weight="Regular" style={styles.buttonText}>
                    Ver detalles
                </CustomText>
            </Pressable>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginTop:50,
        padding: 20,
        margin: 16,
        borderWidth: 2,
        borderColor: '#2912a710',
        shadowColor: '#2912a7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    imageContainer: {
        marginBottom: 12,
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'contain',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        color: '#2912a7',
        marginBottom: 6,
    },
    price: {
        fontSize: 16,
        color: '#a40a9b',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#2912a7',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default Card;