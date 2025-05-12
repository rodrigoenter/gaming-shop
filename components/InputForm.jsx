import { View, TextInput, Text, StyleSheet } from "react-native";
import { Colors } from "./colors";

const InputForm = ({ label, value, onChangeText, isSecure = false, error }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isSecure}
                style={[styles.input, error && styles.inputError]}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: "100%",
    },
    label: {
        color: Colors.textPrimary,
        marginBottom: 4,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.textSecondary,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    inputError: {
        borderColor: Colors.danger,
    },
    error: {
        color: Colors.danger,
        fontSize: 14,
        marginTop: 4,
    },
});

export default InputForm;