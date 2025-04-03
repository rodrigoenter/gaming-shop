import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import MenuDrawer from "../components/MenuDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: { backgroundColor: "#fff", width: "75%" },
                drawerType: "slide",
                overlayColor: "rgba(0, 0, 0, 0.5)",
            }}
            drawerContent={(props) => <MenuDrawer {...props} />}
        >
            <Drawer.Screen name="Inicio" component={HomeScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;