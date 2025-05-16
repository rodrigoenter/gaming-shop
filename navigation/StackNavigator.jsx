import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import Carrito from "../screens/Carrito";
import Detail from "../screens/Detail";
import AllProducts from "../screens/AllProducts";
import AboutUs from "../screens/AboutUs";
import Ordenes from "../screens/Ordenes";
import FinalizarOrden from "../screens/FinalizarOrden";
import DireccionEntrega from "../screens/DireccionEntrega";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={BottomTabs} />
            <Stack.Screen name="Carrito" component={Carrito} />
            <Stack.Screen name="Detalle" component={Detail} />
            <Stack.Screen name="AllProducts" component={AllProducts} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="Ordenes" component={Ordenes} />
            <Stack.Screen name="FinalizarOrden" component={FinalizarOrden} />
            <Stack.Screen name="DireccionEntrega" component={DireccionEntrega} />
        </Stack.Navigator>
    );
};

export default StackNavigator;