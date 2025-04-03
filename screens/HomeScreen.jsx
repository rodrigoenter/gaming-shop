import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header navigation={navigation} />
        </SafeAreaView>
    );
};

export default HomeScreen;