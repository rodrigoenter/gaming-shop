import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../store/slices/locationSlice";
import { guardarDireccionUsuario } from "../services/locationService";
import CustomText from "../components/CustomText";
import { Colors } from "../components/colors";

const DireccionEntrega = ({ navigation }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);

    const [region, setRegion] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permiso denegado", "Se requiere acceso a la ubicación.");
                return;
            }

            try {
                const ubicacion = await Location.getCurrentPositionAsync({});
                setRegion({
                    latitude: ubicacion.coords.latitude,
                    longitude: ubicacion.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } catch (error) {
                Alert.alert("Error", "No se pudo obtener la ubicación actual.");
            }
        })();
    }, []);

    const guardarDireccion = async () => {
        if (!marker) {
            Alert.alert("Ubicación no seleccionada", "Tocá el mapa para seleccionar.");
            return;
        }

        try {
            const resultados = await Location.reverseGeocodeAsync(marker);
            if (!resultados || resultados.length === 0) {
                Alert.alert("Error", "No se pudo obtener una dirección para esa ubicación.");
                return;
            }

            const direccion = resultados[0];
            const direccionFormateada = `${direccion.street || "Calle desconocida"}, ${direccion.city || "Ciudad desconocida"}`;
            dispatch(setLocation(direccionFormateada));
            await guardarDireccionUsuario(userId, direccionFormateada);

            Alert.alert("Dirección guardada", "Tu dirección fue actualizada.");
            navigation.goBack();
        } catch (error) {
            console.error("Error guardando dirección:", error);
            Alert.alert("Error", "Ocurrió un problema al guardar tu dirección.");
        }
    };

    return (
        <View style={styles.container}>
            {region && (
                <MapView
                    style={styles.map}
                    initialRegion={region}
                    onPress={(e) => setMarker(e.nativeEvent.coordinate)}
                >
                    {marker && <Marker coordinate={marker} />}
                </MapView>
            )}
            <TouchableOpacity style={styles.boton} onPress={guardarDireccion}>
                <CustomText style={styles.texto}>Guardar ubicación</CustomText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    boton: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        elevation: 4,
    },
    texto: {
        color: Colors.textAccent,
        fontSize: 16,
    },
});

export default DireccionEntrega;