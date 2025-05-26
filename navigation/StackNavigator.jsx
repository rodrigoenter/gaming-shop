import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import ItemListCategory from '../screens/ItemListCategory';
import Detail from "../screens/Detail";
import Carrito from "../screens/Carrito";
import Ordenes from "../screens/Ordenes";
import FinalizarOrden from "../screens/FinalizarOrden";
import DireccionEntrega from "../screens/DireccionEntrega";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeTabs"
        >
            <Stack.Screen name="HomeTabs" component={BottomTabs} />
            <Stack.Screen name="ItemListCategory" component={ItemListCategory} />
            <Stack.Screen name="Carrito" component={Carrito} />
            <Stack.Screen name="Ordenes" component={Ordenes} />
            <Stack.Screen name="FinalizarOrden" component={FinalizarOrden} />
            <Stack.Screen name="DireccionEntrega" component={DireccionEntrega} />
            <Stack.Screen
                name="Detail"
                component={Detail}
                options={({ route }) => ({
                    title: route.params?.product?.title || 'Detalle'
                })}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;