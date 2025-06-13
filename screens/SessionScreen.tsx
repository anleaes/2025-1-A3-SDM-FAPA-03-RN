import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Theater } from './TheaterScreen';
import { Movie } from './MovieScreen';
import { Room } from './RoomScreen';

type Props = DrawerScreenProps<DrawerParamList, 'Sessions'>;

export type Session = {
    id: number;
    theaterDetail: Theater
    movieDetail: Movie
    roomDetail: Room
    price: number
    language: 'DUB' | 'LEG' | 'ORI';
};

const SessionScreen = ({ navigation }: Props) => {

    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSessions = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/sessões/');
        const data = await response.json();
        setSessions(data);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchSessions();
        }, [])
    );

    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:8000/sessões/${id}/`, {
            method: 'DELETE',
        });
        setSessions(prev => prev.filter(s => s.id !== id));
    };

    const languageMap = {
        DUB: 'Dublado',
        LEG: 'Legendado',
        ORI: 'Original',
    }

    const renderItem = ({ item }: { item: Session }) => (
        <View style={styles.card}>
            <Text style={styles.status}>Sala {item.roomDetail.number}</Text>
            <Text style={styles.description}>Cinema: {item.theaterDetail.name}</Text>
            <Text style={styles.description}>Filme: {item.movieDetail.title}</Text>
            <Text style={styles.description}>Áudio: {languageMap[item.language]}</Text>
            <Text style={styles.description}>Preço: R${item.price}</Text>
            <div style={styles.button}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditSession', { session: item })}
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
            <Text style={styles.title}>Sessões</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FCA311" />
            ) : (
                <FlatList
                    data={sessions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateSession')}
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
    status: {
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

export default SessionScreen;