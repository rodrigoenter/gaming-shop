import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../components/CustomText';
import { Colors } from '../components/colors';

const Ordenes = ({ navigation }) => {
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
                <Text style={styles.text}>📦 Órdenes realizadas</Text>
                <CustomText style={{
                    fontSize: 16,
                    color: Colors.textSecondary,
                    textAlign: "center",
                    marginTop: 50
                }}>
                    Aquí podrás ver el historial de tus órdenes.
                </CustomText>
            </View>
        </SafeAreaView>
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
        color: Colors.textPrimary,
    },
});