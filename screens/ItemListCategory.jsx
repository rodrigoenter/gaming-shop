import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import allProducts from '../data/juegos.json';
import Card from '../components/Card';
import SearchInput from '../components/SearchInput';

const ItemListCategory = ({ route }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const { categoria } = route.params || {};

    useEffect(() => {
        let filtered = allProducts;

        if (categoria) {
            const categoryKey = categoria.toLowerCase().replace(/\s/g, '-');
            filtered = filtered.filter(product => product.category === categoryKey);
        }

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [searchQuery, categoria]);

    return (
        <View style={styles.container}>
            <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Card item={item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    list: {
        paddingVertical: 16,
    },
});

export default ItemListCategory;