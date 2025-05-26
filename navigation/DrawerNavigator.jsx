import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuDrawer from '../components/MenuDrawer';
import StackNavigator from './StackNavigator';
import AboutUs from '../screens/AboutUs';
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
                drawerType: 'slide',
                overlayColor: 'rgba(0, 0, 0, 0.5)',
                swipeEdgeWidth: Platform.OS === 'ios' ? 20 : 40,
            }}
            drawerContent={(props) => <MenuDrawer {...props} />}
        >
            <Drawer.Screen
                name="Inicio"
                component={StackNavigator}
            />
            <Drawer.Screen
                name="Acerca de nosotros"
                component={AboutUs}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;