import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../components/CustomText';
import { Colors } from '../components/colors';

const Previews = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
                height: 80,
                marginTop: 40
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="arrow-back" size={30} color={Colors.primary} />
                    <CustomText style={{ fontSize: 16, color: Colors.primary, marginLeft: 10 }}>
                        Volver atrás
                    </CustomText>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 75 }}>
                <Text style={[styles.text, { color: Colors.textPrimary }]}>🎮 Previews de juegos por salir</Text>
                <CustomText style={{
                    fontSize: 16,
                    color: Colors.textSecondary,
                    textAlign: "center",
                    marginTop: 50
                }}>
                    Aquí podrás ver los juegos que estarán disponibles pronto.
                </CustomText>
            </View>
        </SafeAreaView>
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