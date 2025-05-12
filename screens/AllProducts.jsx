import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useGetAllProductsQuery } from '../services/shopServices';
import ProductCard from '../components/Card';
import CustomText from '../components/CustomText';
import { Colors } from '../components/colors';

const AllProducts = () => {
    const { data, isLoading, isError } = useGetAllProductsQuery();

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <CustomText>Cargando productos...</CustomText>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.center}>
                <CustomText style={{ color: 'red' }}>
                    Error al cargar productos.
                </CustomText>
            </View>
        );
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard item={item} />}
            contentContainerStyle={{ padding: 16 }}
        />
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AllProducts;