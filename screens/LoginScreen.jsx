import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import InputForm from "../components/InputForm";
import { login } from "../services/authService";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../components/CustomText";
import { Colors } from "../components/colors";
import { loginAndPersist } from "../store/slices/authSlice";
import { cargarFavoritos } from "../store/slices/favoritosSlice";
import logo from "../assets/logo-gaming-shop.png";

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const passwordRef = useRef();

    const handleLogin = async () => {
        setErrors({});
        if (!email || !password) {
            setErrors({
                email: !email ? "Email requerido" : null,
                password: !password ? "Password requerido" : null,
            });
            return;
        }

        try {
            const res = await login({ email, password });
            dispatch(loginAndPersist(res.localId, res.idToken));
            dispatch(cargarFavoritos(res.localId));
            Toast.show({ type: "success", text1: "¡Sesión iniciada!" });
        } catch (err) {
            const errorMsg = err?.error?.message || "Credenciales inválidas";
            Toast.show({
                type: "error",
                text1: "Error de login",
                text2: errorMsg,
            });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.form}>
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} resizeMode="contain" />
                        <CustomText style={styles.welcomeText}>
                            ¡Bienvenid@s a Gaming Shop!
                        </CustomText>
                    </View>

                    <InputForm
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        error={errors.email}
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        returnKeyType="next"
                    />

                    <InputForm
                        label="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        isSecure
                        error={errors.password}
                        inputRef={passwordRef}
                        onSubmitEditing={handleLogin}
                        returnKeyType="done"
                    />

                    <TouchableOpacity onPress={handleLogin} style={styles.submitButton}>
                        <CustomText style={styles.submitText}>Iniciar sesión</CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <CustomText style={styles.linkText}>
                            ¿No tenés cuenta? Registrate
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scroll: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "center",
    },
    form: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 16,
        color: Colors.primary,
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 50,
        alignItems: "center",
        marginTop: 20,
    },
    submitText: {
        color: Colors.textAccent,
        fontSize: 16,
    },
    linkText: {
        color: Colors.primary,
        textAlign: "center",
        marginTop: 20,
        fontSize: 15,
    },
});

export default LoginScreen;