import React from "react";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import MenuDrawer from "../components/MenuDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: "#fff",
                    width: "75%",
                },
                drawerType: Platform.OS === "ios" ? "slide" : "front",
                overlayColor: Platform.select({
                    ios: "rgba(0, 0, 0, 0.3)",
                    android: "rgba(0, 0, 0, 0.5)",
                }),
                swipeEdgeWidth: Platform.OS === "ios" ? 20 : 40,
                swipeEnabled: true,
            }}
            drawerContent={(props) => <MenuDrawer {...props} />}
        >
            <Drawer.Screen name="Inicio" component={HomeScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;