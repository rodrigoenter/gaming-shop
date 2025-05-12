import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../components/colors';

const AboutUs = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo-gaming-shop.png')} style={styles.logo} />
            <Text style={styles.title}>Gaming Shop</Text>
            <Text style={styles.subtitle}>Desde 2025</Text>
            <Text style={styles.text}>📍 Avenida Siempre Viva 742</Text>
            <Text style={styles.text}>🎮 Apasionados por los videojuegos</Text>
            <Text style={styles.text}>📦 Envíos a todo el país</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Inicio')} style={styles.returnButton}>
                <Text style={styles.returnButtonText}>Volver al inicio</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: Colors.textAccent,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textAccent,
        marginBottom: 12,
    },
    text: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginVertical: 4,
    },
    returnButton: {
        marginTop: 30,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    returnButtonText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
});

export default AboutUs;