import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { use, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';

type Props = DrawerScreenProps<DrawerParamList, 'CreateClient'>;

const CreateClientScreen = ({ navigation }: Props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [gender, setGender] = useState<'M' | 'F' | 'O'>('F');
    const [saving, setSaving] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setName('')
            setEmail('')
            setIsActive(false)
            setGender('F')
        }, [])
    );

    const handleSave = async () => {
        setSaving(true);
        const res = await fetch('http://localhost:8000/clientes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, isActive, gender }),
        });
        navigation.navigate('Clients');
        setSaving(false);
    };

    const toggleSwitch = () => setIsActive(previousState => !previousState);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Cliente</Text>
            <Text style={styles.label}>Nome</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput 
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <div style={styles.pickerHolder}>
                <Text style={styles.label}>Gênero</Text>
                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Masculino" value="M" />
                    <Picker.Item label="Feminino" value="F" />
                    <Picker.Item label="Outro" value="O" />
                </Picker>
            </div>
            <div style={styles.switch}>
            <Text style={styles.label}>Cliente ativo</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#14213D' }}
                thumbColor={isActive ? '#FCA311' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isActive}
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
                <TouchableOpacity onPress={() => navigation.navigate('Clients')} style={{
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

export default CreateClientScreen;