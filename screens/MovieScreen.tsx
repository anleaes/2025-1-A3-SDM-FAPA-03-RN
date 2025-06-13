import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Gender } from './GenderScreen';

type Props = DrawerScreenProps<DrawerParamList, 'Movies'>;

export type Movie = {
    id: number;
    title: string;
    description: string;
    poster: string;
    duration: number;
    gender: Gender[];
};

const MovieScreen = ({ navigation }: Props) => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMovies = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/filmes/');
        const data = await response.json();
        setMovies(data);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchMovies();
        }, [])
    );

    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:8000/filmes/${id}/`, {
            method: 'DELETE',
        });
        setMovies(prev => prev.filter(m => m.id !== id));
    };

    const renderItem = ({ item }: { item: Movie }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.title}</Text>
            <Image source={{ uri: item.poster }} style={{ width: 100, height: 100 }} />
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.description}>Gêneros: {item.gender.map((g) => g.name).join(', ')}</Text>
            <Text style={styles.description}>Duração: {item.duration}min</Text>
            <div style={styles.button}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                >
                    <Ionicons name="trash" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditMovie', { movie: item })}
                >
                    <Ionicons name="pencil" size={24} color="#fff" />
                </TouchableOpacity>
            </div>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Filmes</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FCA311" />
            ) : (
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateMovie')}
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
        gap: 8,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 20,
        top: 35,
    }
});

export default MovieScreen;