import React, { useEffect, useState, useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import Card from "../components/Card";
import allProducts from "../data/juegos.json";

const Home = ({ navigation }) => {
    const [filteredProducts, setFilteredProducts] = useState(allProducts);

    const flatListRef = useRef(null);

    useEffect(() => {
        setFilteredProducts(allProducts);
    }, []);

    const handleFloatingButtonPress = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header navigation={navigation} />
            <FlatList
                ref={flatListRef}
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card item={item} onPress={() => navigation.navigate("Detail", { product: item })} />
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                decelerationRate="normal"
                scrollEventThrottle={16}
                bounces={true}
            />
            <TouchableOpacity style={styles.floatingButton} onPress={handleFloatingButtonPress}>
                <Ionicons name="rocket" size={30} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
    },
    floatingButton: {
        position: "absolute",
        right: 16,
        bottom: 16,
        backgroundColor: "#2912a7",
        borderRadius: 50,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },
});

export default Home;