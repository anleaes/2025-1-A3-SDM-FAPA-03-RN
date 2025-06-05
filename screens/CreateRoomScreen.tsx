import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { use, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';

type Props = DrawerScreenProps<DrawerParamList, 'CreateRoom'>;

const CreateRoomScreen = ({ navigation }: Props) => {

    const [number, setNumber] = useState('');
    const [accessibility, setAccessibility] = useState(false);
    const [type, setType] = useState<'2D' | '3D' | 'IMAX' | 'VIP'>('2D');
    const [capacity, setCapacity] = useState('');
    const [saving, setSaving] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setNumber('');
            setAccessibility(false);
            setType('2D');
            setCapacity('');
        }, [])
    );

    const handleSave = async () => {
        setSaving(true);
        const res = await fetch('http://localhost:8000/salas/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number, accessibility, type, capacity }),
        });
        navigation.navigate('Rooms');
        setSaving(false);
    };

    const toggleSwitch = () => setAccessibility(previousState => !previousState);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Sala</Text>
            <Text style={styles.label}>Número</Text>
            <TextInput
                value={number}
                cc-number
                onChangeText={setNumber}
                style={styles.input}
            />
            <Text style={styles.label}>Capacidade</Text>
            <TextInput
                value={capacity}
                onChangeText={setCapacity}
                cc-number
                style={styles.input}
            />
            <div style={styles.pickerHolder}>
                <Text style={styles.label}>Tipo da sala</Text>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue) => setType(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="2D" value="2D" />
                    <Picker.Item label="3D" value="3D" />
                    <Picker.Item label="IMAX" value="IMAX" />
                    <Picker.Item label="VIP" value="VIP" />
                </Picker>
            </div>
            <div style={styles.switch}>
            <Text style={styles.label}>Acessibilidade</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#14213D' }}
                thumbColor={accessibility ? '#FCA311' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={accessibility}
                style={{ marginTop: 11 }}
            />
            </div>

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
                <TouchableOpacity onPress={() => navigation.navigate('Rooms')} style={{
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
    switch: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
});

export default CreateRoomScreen;