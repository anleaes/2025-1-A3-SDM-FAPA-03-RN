import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { act, useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Clients'>;

export type Client = {
    id: number;
    name: string;
    email: string;
    gender: 'M' | 'F' | 'O';
    isActive: boolean;
};

const ClientScreen = ({ navigation }: Props) => {

    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchClients = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/clientes/');
        const data = await response.json();
        setClients(data);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchClients();
        }, [])
    );

    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:8000/clientes/${id}/`, {
            method: 'DELETE',
        });
        setClients(prev => prev.filter(c => c.id !== id));
    };

    const genderMap = {
        M: 'Masculino',
        F: 'Feminino',
        O: 'Outro',
    }

    const renderItem = ({ item }: { item: Client }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.email}</Text>
            <Text style={styles.description}>Gênero: {genderMap[item.gender]}</Text>
            <Text style={styles.switch}>
                Cliente ativo:
                <Switch
                    trackColor={{ false: '#767577', true: '#14213D' }}
                    thumbColor={item.isActive ? '#FCA311' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    value={item.isActive}
                    disabled
                />
            </Text>
            <div style={styles.button}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditClient', { client: item })}
                >
                    <Ionicons name="pencil" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                >
                    <Ionicons name="trash" size={24} color="#fff" />
                </TouchableOpacity>
            </div>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clientes</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FCA311" />
            ) : (
                <FlatList
                    data={clients}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateClient')}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#14213D',
        alignSelf: 'center',
    },
    card: {
        backgroundColor: '#E5E5E5',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#14213D',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    switch: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        display: 'flex',
        gap: 4,
    },
    editButton: {
        backgroundColor: '#FCA311',
        padding: 8,
        borderRadius: 6,
        marginRight: 8,
    },
    editText: {
        color: '#fff',
        fontWeight: '500'
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        backgroundColor: '#14213D',
        borderRadius: 28,
        padding: 14,
        elevation: 4,
    },
    deleteButton: {
        backgroundColor: '#a00f0f',
        padding: 8,
        borderRadius: 6,
        marginRight: 8,
    },
    row: {
        flexDirection: 'row',
        marginTop: 8,
        alignSelf: 'flex-end'
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 10,
        bottom: 14,
        gap: 8,
    }
});

export default ClientScreen;