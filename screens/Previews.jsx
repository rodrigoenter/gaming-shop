import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Previews = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>🎮 Previews de juegos por salir</Text>
        </View>
    );
};

export default Previews;

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