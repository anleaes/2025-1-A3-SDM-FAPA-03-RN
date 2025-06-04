import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditTheater'>;

const EditTheaterScreen = ({ route, navigation }: Props) => {
    const { theater } = route.params;
    const [name, setName] = useState(theater.name);
    const [address, setAddress] = useState(theater.address);
    const [openingHours, setOpeningHours] = useState(theater.openingHours);
    const [contactNumber, setContactNumber] = useState(theater.contactNumber);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setName(theater.name);
        setAddress(theater.address);
        setOpeningHours(theater.openingHours);
        setContactNumber(theater.contactNumber);
    }, [theater]);

    const handleSave = async () => {
        setSaving(true);
        const res = await fetch(
            `http://localhost:8000/cinemas/${theater.id}/`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, address, openingHours, contactNumber }),
            }
        );
        navigation.navigate('Theaters');
        setSaving(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Text style={styles.label}>Endereço</Text>
            <TextInput value={address} onChangeText={setAddress} style={styles.input} />
            <Text style={styles.label}>Horário de funcionamento</Text>
            <TextInput value={openingHours} onChangeText={setOpeningHours} style={styles.input} />
            <Text style={styles.label}>Número de contato</Text>
            <TextInput value={contactNumber} onChangeText={setContactNumber} style={styles.input} />
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
    label: {
        fontWeight: 'bold',
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

export default EditTheaterScreen;