import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateTheater'>;

const CreateTheaterScreen = ({ navigation }: Props) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [saving, setSaving] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setName('');
            setAddress('');
            setOpeningHours('');
            setContactNumber('');
        }, [])
    );

    const handleSave = async () => {
        setSaving(true);
        const res = await fetch('http://localhost:8000/cinemas/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, address, openingHours, contactNumber }),
        });
        navigation.navigate('Theaters');
        setSaving(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Cinema</Text>
            <Text style={styles.label}>Nome</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Text style={styles.label}>Endereço</Text>
            <TextInput
                value={address}
                onChangeText={setAddress}
                style={styles.input}
            />
            <Text style={styles.label}>Horário de funcionamento</Text>
            <TextInput
                value={openingHours}
                onChangeText={setOpeningHours}
                style={styles.input}
            />
            <Text style={styles.label}>Número de contato</Text>
            <TextInput
                value={contactNumber}
                onChangeText={setContactNumber}
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
                <TouchableOpacity onPress={() => navigation.navigate('Theaters')} style={{
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

export default CreateTheaterScreen;