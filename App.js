import React, { useCallback, useEffect, useState } from "react";
import { Text as DefaultText } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";

SplashScreen.preventAutoHideAsync();

DefaultText.defaultProps = DefaultText.defaultProps || {};
DefaultText.defaultProps.style = [{ fontFamily: "Rubik-Regular" }];

const loadFonts = () =>
  Font.loadAsync({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
  });

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}