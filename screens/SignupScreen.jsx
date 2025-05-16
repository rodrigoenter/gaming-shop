import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Image } from "react-native";
import InputForm from "../components/InputForm";
import { signUp } from "../services/authService";
import { signupSchema } from "../validations/signupSchema";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import { Colors } from "../components/colors";
import { loginAndPersist } from "../store/slices/authSlice";
import logo from "../assets/logo-gaming-shop.png";

const SignupScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleSignup = async () => {
        try {
            signupSchema.validateSync(
                { email, password, confirmPassword },
                { abortEarly: false }
            );

            const res = await signUp({ email, password });
            dispatch(loginAndPersist(res.localId, res.idToken));
            Toast.show({ type: "success", text1: "¡Registrado exitosamente!" });
        } catch (err) {
            if (err.inner) {
                const formErrors = {};
                err.inner.forEach((e) => {
                    formErrors[e.path] = e.message;
                });
                setErrors(formErrors);
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error de registro",
                    text2: err.error?.message || "Ocurrió un error inesperado",
                });
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color={Colors.primary} />
                    <CustomText style={styles.backText}>Volver atrás</CustomText>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.form}>
                        <View style={styles.logoContainer}>
                            <Image source={logo} style={styles.logo} resizeMode="contain" />
                            <CustomText style={styles.welcomeText}>
                                Por favor, crea tu usuari@ para comenzar...
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
                            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                            returnKeyType="next"
                        />

                        <InputForm
                            label="Confirmar Contraseña"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            isSecure
                            error={errors.confirmPassword}
                            inputRef={confirmPasswordRef}
                            onSubmitEditing={handleSignup}
                            returnKeyType="done"
                        />

                        <TouchableOpacity onPress={handleSignup} style={styles.submitButton}>
                            <CustomText style={styles.submitText}>Registrarme</CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <CustomText style={styles.linkText}>
                                ¿Ya tenés cuenta? Iniciá sesión
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        marginTop: 40,
        height: 80,
        backgroundColor: Colors.background,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    backText: {
        fontSize: 16,
        color: Colors.primary,
        marginLeft: 10,
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
        color: Colors.secondary,
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

export default SignupScreen;