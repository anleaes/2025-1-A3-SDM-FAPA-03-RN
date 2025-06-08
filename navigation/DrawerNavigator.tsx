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
import RoomScreen, { Room } from '@/screens/RoomScreen';
import CreateRoomScreen from '@/screens/CreateRoomScreen';
import EditRoomScreen from '@/screens/EditRoomScreen';
import ClientScreen, { Client } from '@/screens/ClientScreen';
import CreateClientScreen from '@/screens/CreateClientScreen';
import EditClientScreen from '@/screens/EditClientScreen';
import TicketScreen, { Ticket } from '@/screens/TicketScreen';
import CreateTicketScreen from '@/screens/CreateTicketScreen';
import EditTicketScreen from '@/screens/EditTicketScreen';
import SessionScreen, { Session } from '@/screens/SessionScreen';
import CreateSessionScreen from '@/screens/CreateSession';
import EditSessionScreen from '@/screens/EditSession';
import SessionTicketScreen, { SessionTicket } from '@/screens/SessionTicketScreen';
import CreateSessionTicketScreen from '@/screens/CreateSessionTicketScreen';
import EditSessionTicketScreen from '@/screens/EditSessionTicketScreen';
import EditMovieScreen from '@/screens/EditMovieScreen';


export type DrawerParamList = {
    Home: undefined;
    Theaters: undefined;
    CreateTheater: undefined;
    EditTheater: { theater: Theater };
    Movies: undefined;
    CreateMovie: undefined;
    EditMovie: { movie: Movie };
    Genders: undefined;
    CreateGender: undefined;
    EditGender: { gender: Gender };
    Rooms: undefined;
    CreateRoom: undefined;
    EditRoom: { room: Room };
    Clients: undefined;
    CreateClient: undefined;
    EditClient: { client: Client };
    Tickets: undefined;
    CreateTicket: undefined;
    EditTicket: { ticket: Ticket };
    Sessions: undefined;
    CreateSession: undefined;
    EditSession: { session: Session }
    SessionTickets: undefined;
    CreateSessionTicket: undefined;
    EditSessionTicket: { sessionTicket: SessionTicket };
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
                name="EditMovie"
                component={EditMovieScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Filme' }}
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
            <Drawer.Screen
                name="EditRoom"
                component={EditRoomScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Sala' }}
            />
            <Drawer.Screen
                name="Clients"
                component={ClientScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
                    title: 'Clientes',
                }}
            />
            <Drawer.Screen
                name="CreateClient"
                component={CreateClientScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Cadastrar Cliente' }}
            />
            <Drawer.Screen
                name="EditClient"
                component={EditClientScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Cliente' }}
            />
            <Drawer.Screen
                name="Tickets"
                component={TicketScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="ticket-outline" size={size} color={color} />,
                    title: 'Ingressos',
                }}
            />
            <Drawer.Screen
                name="CreateTicket"
                component={CreateTicketScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Cadastrar Ingresso' }}
            />
            <Drawer.Screen
                name="EditTicket"
                component={EditTicketScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Ingresso' }}
            />
            <Drawer.Screen
                name="Sessions"
                component={SessionScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="calendar-clear-outline" size={size} color={color} />,
                    title: 'Sessões',
                }}
            />
            <Drawer.Screen
                name="CreateSession"
                component={CreateSessionScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Cadastrar Sessão' }}
            />
            <Drawer.Screen
                name="EditSession"
                component={EditSessionScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Sessão' }}
            />
            <Drawer.Screen
                name="SessionTickets"
                component={SessionTicketScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="documents-outline" size={size} color={color} />,
                    title: 'Ingressos da Sessão',
                }}
            />
            <Drawer.Screen
                name="CreateSessionTicket"
                component={CreateSessionTicketScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Cadastrar Ingresso da Sessão' }}
            />
            <Drawer.Screen
                name="EditSessionTicket"
                component={EditSessionTicketScreen}
                options={{ drawerItemStyle: { display: 'none' }, title: 'Editar Ingresso da Sessão' }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;