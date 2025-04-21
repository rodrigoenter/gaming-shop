import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';

const Card = ({ item }) => {
    const navigation = useNavigation();

    return (
        <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('Detalle', { product: item })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <CustomText weight="Bold" style={styles.title}>
                {item.title}
            </CustomText>
            <CustomText weight="Regular" style={styles.price}>
                ${item.price}
            </CustomText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        padding: 16,
        marginTop: 50,
        marginBottom: 16,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: '#444',
    },
});

export default Card;
