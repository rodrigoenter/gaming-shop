import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../components/colors';
import { TouchableOpacity } from 'react-native';
import Home from '../screens/Home';
import Favoritos from '../screens/Favoritos';
import Ordenes from '../screens/Ordenes';
import Previews from '../screens/Previews';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Carrito from '../screens/Carrito';
import Detail from '../screens/Detail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DefaultStack = ({ initialComponent }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={initialComponent} />
        <Stack.Screen name="Carrito" component={Carrito} />
        <Stack.Screen name="Detalle" component={Detail} />
    </Stack.Navigator>
);

const BottomTabs = () => (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: Colors.secondary,
            tabBarInactiveTintColor: Colors.primary,
            tabBarButton: (props) => (
                <TouchableOpacity
                    {...props}
                    activeOpacity={1}
                    style={[props.style, { overflow: 'hidden' }]}
                />
            ),
            tabBarIcon: ({ color, size }) => {
                let iconName;
                switch (route.name) {
                    case 'Home':
                        iconName = 'home-outline';
                        break;
                    case 'Favoritos':
                        iconName = 'heart-outline';
                        break;
                    case 'Ordenes':
                        iconName = 'receipt-outline';
                        break;
                    case 'Previews':
                        return <Feather name="video" size={size} color={color} />;
                    default:
                        return null;
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: {
                height: 60,
                paddingBottom: 8,
                elevation: 0,
                shadowOpacity: 0,
                borderTopWidth: 0.5,
                borderTopColor: Colors.inactive,
            }
        })}
    >
        <Tab.Screen name="Home" children={() => <DefaultStack initialComponent={Home} />} />
        <Tab.Screen name="Favoritos" children={() => <DefaultStack initialComponent={Favoritos} />} />
        <Tab.Screen name="Ordenes" children={() => <DefaultStack initialComponent={Ordenes} />} />
        <Tab.Screen name="Previews" children={() => <DefaultStack initialComponent={Previews} />} />
    </Tab.Navigator>
);

export default BottomTabs;
