import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import Home from '../screens/Home';
import Favoritos from '../screens/Favoritos';
import Ordenes from '../screens/Ordenes';
import Previews from '../screens/Previews';
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
            tabBarActiveTintColor: '#a40a9b',
            tabBarInactiveTintColor: '#2912a7',
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
                        return <Ionicons name={iconName} size={size} color={color} />;
                    case 'Favoritos':
                        iconName = 'heart-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    case 'Ordenes':
                        iconName = 'receipt-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    case 'Previews':
                        return <Feather name="video" size={size} color={color} />;
                    default:
                        return null;
                }
            },
            tabBarStyle: {
                height: 60,
                paddingBottom: 8,
                elevation: 0,
                shadowOpacity: 0,
                borderTopWidth: 0.5,
                borderTopColor: '#ccc',
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