import { useEffect, useState, useRef } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import Card from "../components/Card";
import BannerCarousel from "../components/BannerCarousel";
import { Colors } from "../components/colors";
import CustomText from "../components/CustomText";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetAllProductsQuery,
} from "../services/shopServices";

const Home = ({ navigation, route }) => {
  const categoriaParam = route.params?.categoria;
  const flatListRef = useRef(null);
  const [productosPorConsola, setProductosPorConsola] = useState({});
  const [showScrollButton, setShowScrollButton] = useState(false);

  const { data: categories, isLoading: loadingCategories, error: errorCategories } = useGetCategoriesQuery();

  const {
    data: productosFiltrados,
    isLoading: loadingFiltrados,
    error: errorFiltrados,
  } = useGetProductsByCategoryQuery(categoriaParam, { skip: !categoriaParam });

  const {
    data: todosLosProductos,
    isLoading: loadingTodos,
    error: errorTodos,
  } = useGetAllProductsQuery(undefined, { skip: !!categoriaParam });

  const productosData = categoriaParam ? productosFiltrados : todosLosProductos;
  const loadingProducts = categoriaParam ? loadingFiltrados : loadingTodos;
  const errorProducts = categoriaParam ? errorFiltrados : errorTodos;

  useEffect(() => {
    if (!productosData) return;

    const productos = Object.values(productosData);
    const agrupados = productos.reduce((acc, producto) => {
      const categoria = producto.category;
      if (!categoria || categoria === 'undefined' || Number.isNaN(categoria)) return acc;

      if (!acc[categoria]) acc[categoria] = [];
      acc[categoria].push(producto);
      return acc;
    }, {});

    setProductosPorConsola(agrupados);
  }, [productosData]);

  const obtenerNombreConsola = (consolaId) => {
    const categoria = categories?.find(cat => cat.id === consolaId);
    return categoria ? categoria.name : consolaId.toUpperCase();
  };

  const renderSeccionCarrusel = (consolaId, productos) => {
    const nombreConsola = obtenerNombreConsola(consolaId);
    return (
      <View key={consolaId} style={styles.seccion}>
        <CustomText style={styles.tituloSeccion}>{nombreConsola.toUpperCase()}</CustomText>
        <FlatList
          data={productos}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <Card
                item={item}
                onPress={() => navigation.navigate("Detail", { product: item })}
              />
            </View>
          )}
        />
      </View>
    );
  };

  const handleScrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    setShowScrollButton(currentOffset > 300);
  };

  if (loadingCategories || loadingProducts) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (errorCategories || errorProducts) {
    return (
      <View style={styles.errorContainer}>
        <CustomText style={styles.errorText}>Error al cargar los datos</CustomText>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header navigation={navigation} />
      <FlatList
        ref={flatListRef}
        ListHeaderComponent={<BannerCarousel />}
        data={Object.entries(productosPorConsola)}
        keyExtractor={([consolaId]) => consolaId}
        renderItem={({ item: [consolaId, productos] }) =>
          renderSeccionCarrusel(consolaId, productos)
        }
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <TouchableOpacity
        style={[styles.floatingButton, { display: showScrollButton ? "flex" : "none" }]}
        onPress={handleScrollToTop}
      >
        <Ionicons name="rocket" size={30} color={Colors.textAccent} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  seccion: {
    marginBottom: 30,
  },
  tituloSeccion: {
    fontSize: 20,
    color: Colors.primary,
    marginLeft: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  cardWrapper: {
    paddingLeft: 16,
    width: 260,
  },
  floatingButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default Home;