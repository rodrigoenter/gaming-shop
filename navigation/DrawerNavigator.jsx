import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuDrawer from '../components/MenuDrawer';
import ItemListCategory from '../screens/ItemListCategory';
import StackNavigator from './StackNavigator';
import { Colors } from '../components/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: Colors.background,
                    width: '75%',
                },
                drawerType: Platform.OS === 'ios' ? 'slide' : 'front',
                overlayColor: Platform.select({
                    ios: 'rgba(0, 0, 0, 0.3)',
                    android: 'rgba(0, 0, 0, 0.5)',
                }),
                swipeEdgeWidth: Platform.OS === 'ios' ? 20 : 40,
                swipeEnabled: true,
            }}
            drawerContent={(props) => <MenuDrawer {...props} />}
        >
            <Drawer.Screen
                name="Inicio"
                component={StackNavigator}
                options={{ swipeEnabled: false }}
            />
            <Drawer.Screen
                name="Productos"
                component={ItemListCategory}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;