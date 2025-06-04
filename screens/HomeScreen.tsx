import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => (
    <View style={styles.container}>
        <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/705/705062.png' }}
            style={styles.logo}
            resizeMode="contain"
        />
        <Text style={styles.title}>CineDK</Text>
        <Text style={styles.subtitle}>
            Aqui você pode gerenciar sessões, filmes e muito mais!
        </Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.openDrawer()} 
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#FCA311',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FCA311',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 16,
        color: '#636466',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#14213D',
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    buttonText: {
        color: '#FCA311',
        fontWeight: '700',
        fontSize: 18,
    },
});

export default HomeScreen;