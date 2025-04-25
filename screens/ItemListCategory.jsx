import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import allProducts from '../data/juegos.json';
import ProductCard from '../components/Card';
import SearchInput from '../components/SearchInput';
import { Colors } from '../components/colors';

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
            <SearchInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Buscar productos..."
            />

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductCard item={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <CustomText style={styles.emptyText}>
                            No se encontraron productos
                        </CustomText>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 16,
    },
    listContent: {
        paddingBottom: 30,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});

export default ItemListCategory;