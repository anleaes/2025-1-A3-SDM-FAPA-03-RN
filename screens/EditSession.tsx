import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';
import { Theater } from './TheaterScreen';
import { Movie } from './MovieScreen';
import { Room } from './RoomScreen';

type Props = DrawerScreenProps<DrawerParamList, 'EditSession'>;

const EditSessionScreen = ({ route, navigation }: Props) => {
    const { session } = route.params;

    const [theater, setTheater] = useState(session.theaterDetail.id);
    const [movie, setMovie] = useState(session.movieDetail.id);
    const [room, setRoom] = useState(session.roomDetail.id);
    const [price, setPrice] = useState(session.price);
    const [language, setLanguage] = useState<'DUB' | 'LEG' | 'ORI'>(session.language);
    const [theaterList, setTheaterList] = useState<Theater[]>([]);
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [roomList, setRoomList] = useState<Room[]>([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchTheatersList = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/cinemas/');
        const data = await response.json();
        setTheaterList(data);
        setLoading(false);
    };

    const fetchMoviesList = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/filmes/');
        const data = await response.json();
        setMovieList(data);
        setLoading(false);
    };

    const fetchRoomsList = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/salas/');
        const data = await response.json();
        setRoomList(data);
        setLoading(false);
    };


    useEffect(() => {
        setTheater(session.theaterDetail.id);
        setMovie(session.movieDetail.id);
        setRoom(session.roomDetail.id);
        setPrice(session.price);
        setLanguage(session.language);
        fetchTheatersList();
        fetchMoviesList();
        fetchRoomsList();
    }, [session])

    const handleSave = async () => {
        setSaving(true);
        const res = await fetch(`http://localhost:8000/sessões/${session.id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ theater, movie, room, price, language }),
        });
        navigation.navigate('Sessions');
        setSaving(false);
    };

    return (
        <View style={styles.container}>
            <div style={styles.pickerHolder}>
                <Text style={styles.label}>Cinema</Text>
                {loading ? (
                    <ActivityIndicator size="small" color="#FCA311" />
                ) : (
                    <Picker
                        selectedValue={theater}
                        onValueChange={(itemValue) => setTheater(itemValue)}
                        style={styles.picker}
                    >
                        {theaterList.map((theater) => (
                            <Picker.Item label={theater.name} value={theater.id} />
                        ))}
                    </Picker>)}
            </div>
            <div style={styles.pickerHolder}>
                <Text style={styles.label}>Filme</Text>
                {loading ? (
                    <ActivityIndicator size="small" color="#FCA311" />
                ) : (
                    <Picker
                        selectedValue={movie}
                        onValueChange={(itemValue) => setMovie(itemValue)}
                        style={styles.picker}
                    >
                        {movieList.map((movie) => (
                            <Picker.Item label={movie.title} value={movie.id} />
                        ))}
                    </Picker>)}
            </div>
            <div style={styles.pickerHolder}>
                <Text style={styles.label}>Sala</Text>
                {loading ? (
                    <ActivityIndicator size="small" color="#FCA311" />
                ) : (
                    <Picker
                        selectedValue={room}
                        onValueChange={(itemValue) => setRoom(itemValue)}
                        style={styles.picker}
                    >
                        {roomList.map((room) => (
                            <Picker.Item label={room.number.toString()} value={room.id} />
                        ))}
                    </Picker>)}
            </div>
            <div style={styles.pickerHolder}>
                <Text style={styles.label}>Áudio</Text>
                <Picker
                    selectedValue={language}
                    onValueChange={(itemValue) => setLanguage(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Dublado" value="DUB" />
                    <Picker.Item label="Legendado" value="LEG" />
                    <Picker.Item label="Original" value="ORI" />
                </Picker>
            </div>
            <Text style={styles.label}>Preço</Text>
            <TextInput
                value={price.toString()}
                keyboardType='numeric'
                onChangeText={(text) => {
                    const parsed = parseInt(text, 10);
                    setPrice(isNaN(parsed) ? 0 : parsed);
                }}
                style={styles.input}
            />

            <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 16, alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={handleSave}
                    style={{
                        backgroundColor: '#FCA311',
                        padding: 8,
                        borderRadius: 6,
                    }}
                >
                    {saving ?
                        <ActivityIndicator size="small" color="#ffffff" /> :
                        <Text style={{ color: '#fff', fontWeight: '500', alignSelf: 'center' }}>SALVAR</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Sessions')} style={{
                    backgroundColor: '#14213D',
                    padding: 8,
                    borderRadius: 6,
                }}>
                    <Text style={{ color: '#fff', fontWeight: '500', alignSelf: 'center' }}>VOLTAR</Text>
                </TouchableOpacity>
            </div>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        alignSelf: 'center',
        color: '#14213D',
    },
    label: {
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 4
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    },
    pickerHolder: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,

        alignSelf: 'center'
    },
    picker: {
        width: 343,
        height: 38.5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
});

export default EditSessionScreen;