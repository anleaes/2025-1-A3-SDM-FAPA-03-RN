import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import TheaterScreen, { Theater } from '../screens/TheaterScreen';
import CreateTheaterScreen from '../screens/CreateTheaterScreen';
import EditTheaterScreen from '../screens/EditTheaterScreen';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen, { Movie } from '@/screens/MovieScreen';
import CreateMovieScreen from '@/screens/CreateMovieScreen';
import GenderScreen, { Gender } from '@/screens/GenderScreen';
import CreateGenderScreen from '@/screens/CreateGenderScreen';
import EditGenderScreen from '@/screens/EditGenderScreen';
import RoomScreen from '@/screens/RoomScreen';
import CreateRoomScreen from '@/screens/CreateRoomScreen';


export type DrawerParamList = {
    Home: undefined;
    Theaters: undefined;
    CreateTheater: undefined;
    EditTheater: { theater: Theater };
    Movies: undefined;
    CreateMovie: undefined;
    Genders: undefined;
    CreateGender: undefined;
    EditGender: { gender: Gender };
    Rooms: undefined;
    CreateRoom: undefined;
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
            <Drawer.Screen
                name="Genders"
                component={GenderScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="planet-outline" size={size} color={color} />,
                    title: 'Gêneros',
                }}
            />
            <Drawer.Screen
                name="CreateGender"
                component={CreateGenderScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Cadastrar Gênero' }}
            />
            <Drawer.Screen
                name="EditGender"
                component={EditGenderScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Gênero' }}
            />
            <Drawer.Screen
                name="Rooms"
                component={RoomScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="pricetag-outline" size={size} color={color} />,
                    title: 'Salas',
                }}
            />
            <Drawer.Screen
                name="CreateRoom"
                component={CreateRoomScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Cadastrar Sala' }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;