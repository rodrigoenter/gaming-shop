import { ScrollView, Image, StyleSheet, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  require("../assets/banners-app-1.png"),
  require("../assets/banners-app-2.png"),
];

const BannerCarousel = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {banners.map((banner, index) => (
          <Image
            key={index}
            source={banner}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );a
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 2,
    marginTop: 10,
    marginBottom: 30,
  },
  image: {
    width,
    aspectRatio: 2,
  },
});

export default BannerCarousel;
