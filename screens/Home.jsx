import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import Card from "../components/Card";
import BannerCarousel from "../components/BannerCarousel";
import allProducts from "../data/juegos.json";
import { Colors } from "../components/colors";
import CustomText from "../components/CustomText";

const Home = ({ navigation }) => {
  const [productosPorConsola, setProductosPorConsola] = useState({});
  const flatListRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const agrupados = agruparPorConsola(allProducts);
    setProductosPorConsola(agrupados);
  }, []);

  const agruparPorConsola = (productos) => {
    const agrupados = {};
    productos.forEach((producto) => {
      const consola = producto.category ? producto.category.trim() : "Otros";
      if (!agrupados[consola]) {
        agrupados[consola] = [];
      }
      agrupados[consola].push(producto);
    });
    return agrupados;
  };

  const renderSeccionCarrusel = (consola, productos) => (
    <View key={consola} style={styles.seccion}>
      <CustomText style={styles.tituloSeccion}>
        <CustomText style={{ fontWeight: 'bold' }}>{consola.toUpperCase()}</CustomText>
      </CustomText>
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

  const handleScrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    setShowScrollButton(currentOffset > 300);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header navigation={navigation} />
      <FlatList
        ref={flatListRef}
        ListHeaderComponent={<BannerCarousel />}
        data={Object.entries(productosPorConsola)}
        keyExtractor={([consola]) => consola}
        renderItem={({ item: [consola, productos] }) => renderSeccionCarrusel(consola, productos)}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <TouchableOpacity
        style={[styles.floatingButton, { display: showScrollButton ? 'flex' : 'none' }]}
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
    fontWeight: 'bold',
  },
  cardWrapper: {
    paddingLeft: 16,
    width: 260,
  },
  floatingButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: Colors.secondary,
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