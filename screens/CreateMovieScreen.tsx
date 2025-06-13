import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Gender } from './GenderScreen';
import * as ImagePicker from 'expo-image-picker';

type Props = DrawerScreenProps<DrawerParamList, 'CreateMovie'>;

const CreateMovieScreen = ({ navigation }: Props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [poster, setPoster] = useState<File | undefined>(undefined);
    const [gender, setGender] = useState<number[]>([]);
    const [genders, setGenders] = useState<Gender[]>([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchGenders = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/gêneros/');
        const data = await response.json();
        setGenders(data);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            setTitle('');
            setDescription('');
            setPoster(undefined);
            setDuration('');
            setGender([]);
            fetchGenders();
        }, [])
    );

    const pickImage = async () => {
        try {
            //abre a galeria de imagens do dispositivo
            const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images', // aceita apenas arquivos de imagem
                quality: 1,           //qualidade da imagem (1 = máxima)
                base64: false,
            });

            //verifica se uma imagem realmente foi selecionada uma imagem
            if (!canceled && assets?.length > 0) {
                //pega imagem escolhida no primeiro item do array
                setPoster(assets[0].file);
            }
        } catch (error) {
            //erro (ex: permissão negada), disparado no console
            console.warn('Erro ao selecionar imagem:', error);
        }
    };

    const handleSave = async () => {
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('duration', duration);
        gender.forEach((id: number) => {
            formData.append('genderIds', id.toString());
        });

        if (poster) {
            formData.append('poster', poster);
        }

        setSaving(true);
        const res = await fetch('http://localhost:8000/filmes/', {
            method: 'POST',
            body: formData,
        });
        navigation.navigate('Movies');
        setSaving(false);
    };

    const toggleOption = (option: number) => {
        setGender((prevGender) =>
            prevGender.includes(option)
                ? prevGender.filter((item) => item !== option)
                : [...prevGender, option]
        );
    }

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
            <Text style={styles.label}>Gêneros</Text>
            {loading ? (
                <ActivityIndicator size="small" color="#FCA311" />
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
                    {genders.map((g) => (
                        <Checkbox.Item
                            key={g.id}
                            label={g.name}
                            status={gender.includes(g.id) ? 'checked' : 'unchecked'}
                            onPress={() => toggleOption(g.id)}
                        />
                    ))}
                </div>
            )}
            <Text style={styles.label}>Poster</Text>
            <TouchableOpacity onPress={pickImage}>
                <TextInput
                    value={!poster ? 'Selecione um arquivo' : 'Arquivo selecionado'}
                    style={styles.input}
                    editable={false}
                />
            </TouchableOpacity>

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