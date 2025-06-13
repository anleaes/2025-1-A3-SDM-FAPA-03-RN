import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { act, useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Rooms'>;

export type Room = {
    id: number;
    number: number;
    type: '2D' | '3D' | 'IMAX' | 'VIP';
    accessibility: boolean;
    capacity: number;
};

const RoomScreen = ({ navigation }: Props) => {

    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/salas/');
        const data = await response.json();
        setRooms(data);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchRooms();
        }, [])
    );

    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:8000/salas/${id}/`, {
            method: 'DELETE',
        });
        setRooms(prev => prev.filter(r => r.id !== id));
    };

    const renderItem = ({ item }: { item: Room }) => (
        <View style={styles.card}>
            <Text style={styles.number}>{item.number}</Text>
            <Text style={styles.description}>{item.type}</Text>
            <Text style={styles.switch}>
                Acessibilidade:
                <Switch
                    trackColor={{ false: '#767577', true: '#14213D' }}
                    thumbColor={item.accessibility ? '#FCA311' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    value={item.accessibility}
                    disabled
                />
            </Text>
            <Text style={styles.description}>Capacidade total: {item.capacity}</Text>
            <div style={styles.button}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditRoom', { room: item })}
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
            <Text style={styles.title}>Salas</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FCA311" />
            ) : (
                <FlatList
                    data={rooms}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateRoom')}
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
    number: {
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

export default RoomScreen;