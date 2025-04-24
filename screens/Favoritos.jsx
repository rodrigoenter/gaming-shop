import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Favoritos = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>❤️ Favoritos</Text>
        </View>
    );
};

export default Favoritos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});