import { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ProductCard from '../components/Card';
import SearchInput from '../components/SearchInput';
import CustomText from '../components/CustomText';
import Header from '../components/Header';
import { Colors } from '../components/colors';
import { useGetProductsByCategoryQuery } from '../services/shopServices';

const ItemListCategory = ({ route, navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { categoria } = route.params || {};
    const categoryKey = categoria;
    const { data, isLoading, isError, error } = useGetProductsByCategoryQuery(categoryKey);

    const filteredProducts = useMemo(() => {
        if (!data) return [];
        if (!searchQuery) return data;
        return data.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <CustomText>Cargando productos...</CustomText>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.errorContainer}>
                <CustomText style={styles.errorText}>
                    Error al cargar los productos. Verifica tu conexión.
                </CustomText>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <Header navigation={navigation} />
            <View style={styles.innerContainer}>
                <SearchInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Buscar productos..."
                    style={styles.searchInput}
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
        </View>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 30,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default ItemListCategory;