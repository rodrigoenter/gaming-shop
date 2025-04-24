import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import Carrito from "../screens/Carrito";
import Detail from "../screens/Detail";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={BottomTabs} />
            <Stack.Screen name="Carrito" component={Carrito} />
            <Stack.Screen name="Detalle" component={Detail} />
        </Stack.Navigator>
    );
};

export default StackNavigator;