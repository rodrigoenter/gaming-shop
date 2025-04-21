import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Card from "../components/Card";
import allProducts from "../data/juegos.json";

const Home = ({ navigation }) => {
    const [filteredProducts, setFilteredProducts] = useState(allProducts);

    useEffect(() => {
        setFilteredProducts(allProducts);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header navigation={navigation} />
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card item={item} onPress={() => navigation.navigate("Detail", { product: item })} />
                )}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
    },
});

export default Home;