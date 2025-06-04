import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import TheaterScreen, { Theater } from '../screens/TheaterScreen';
import CreateTheaterScreen from '../screens/CreateTheaterScreen';
import EditTheaterScreen from '../screens/EditTheaterScreen';
import HomeScreen from '../screens/HomeScreen';


export type DrawerParamList = {
  Home: undefined;
  Theaters: undefined;
  CreateTheater: undefined; 
  EditTheater: { theater: Theater };
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
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Boas vindas✨',
        }}
      />
      <Drawer.Screen
        name="Theaters"
        component={TheaterScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="camera-outline" size={size} color={color} />,
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
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;