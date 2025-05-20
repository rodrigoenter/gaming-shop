import { useEffect, useState, useCallback } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { restoreSession } from "./store/slices/authSlice";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import Toast from "react-native-toast-message";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const loadFonts = () =>
  Font.loadAsync({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
  });

function Root() {
  const dispatch = useDispatch();
  const loadingSession = useSelector((state) => state.auth.loadingSession);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
        await dispatch(restoreSession());
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && !loadingSession) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, loadingSession]);

  if (!appIsReady || loadingSession) return null;

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <MainNavigator />
      <Toast />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}