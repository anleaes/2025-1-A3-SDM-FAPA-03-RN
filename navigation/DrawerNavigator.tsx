import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import TheaterScreen, { Theater } from '../screens/TheaterScreen';
import CreateTheaterScreen from '../screens/CreateTheaterScreen';
import EditTheaterScreen from '../screens/EditTheaterScreen';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '@/screens/MovieScreen';
import CreateMovieScreen from '@/screens/CreateMovieScreen';


export type DrawerParamList = {
    Home: undefined;
    Theaters: undefined;
    CreateTheater: undefined;
    EditTheater: { theater: Theater };
    Movies: undefined;
    CreateMovie: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerActiveTintColor: '#FCA311',
                drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
                drawerStyle: { backgroundColor: '#fff', width: 250 },
                headerStyle: { backgroundColor: '#FCA311' },
                headerTintColor: '#fff',
            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                    title: 'Boas vindas✨',
                }}
            />
            <Drawer.Screen
                name="Theaters"
                component={TheaterScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="videocam-outline" size={size} color={color} />,
                    title: 'Cinemas',
                }}
            />
            <Drawer.Screen
                name="CreateTheater"
                component={CreateTheaterScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Cadastrar Cinema' }}
            />
            <Drawer.Screen
                name="EditTheater"
                component={EditTheaterScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Cinema' }}
            />
            <Drawer.Screen
                name="Movies"
                component={MovieScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="film-outline" size={size} color={color} />,
                    title: 'Filmes',
                }}
            />
            <Drawer.Screen
                name="CreateMovie"
                component={CreateMovieScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Cadastrar Filme' }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;