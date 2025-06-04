import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateMovie'>;

const CreateMovieScreen = ({ navigation }: Props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [poster, setPoster] = useState('');
    // todo decobrir como tratar relações many to many no react native
    const [genders, setGenders] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setTitle('');
            setDescription('');
            setPoster('');
            setDuration('');
        }, [])
    );

    const handleSave = async () => {
        setSaving(true);
        const res = await fetch('http://localhost:8000/filmes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, duration }),
        });
        navigation.navigate('Movies');
        setSaving(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Filme</Text>
            <Text style={styles.label}>Título</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <Text style={styles.label}>Descrição</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
            />
            <Text style={styles.label}>Duração</Text>
            <TextInput
                value={duration}
                onChangeText={setDuration}
                style={styles.input}
                keyboardType="numeric"
            />
            {/*todo --> quando o app tiver finalizado descobrir como fazer upload do file */}
            <Text style={styles.label}>Poster</Text>
            <TextInput
                value={poster}
                onChangeText={setPoster}
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
                <TouchableOpacity onPress={() => navigation.navigate('Movies')} style={{
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
});

export default CreateMovieScreen;