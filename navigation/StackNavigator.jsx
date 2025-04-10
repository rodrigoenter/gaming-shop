import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import CarritoScreen from "../screens/CarritoScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: "horizontal",
                transitionSpec: {
                    open: { animation: "timing", config: { duration: 200 } },
                    close: { animation: "timing", config: { duration: 200 } },
                },
                cardStyleInterpolator: Platform.OS === "ios"
                    ? CardStyleInterpolators.forHorizontalIOS
                    : CardStyleInterpolators.forFadeFromRightAndroid,
            }}
        >
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="Carrito" component={CarritoScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;