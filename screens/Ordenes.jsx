import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Ordenes = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>📦 Órdenes realizadas</Text>
        </View>
    );
};

export default Ordenes;

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