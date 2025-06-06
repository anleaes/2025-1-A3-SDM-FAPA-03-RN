import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Switch, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';

type Props = DrawerScreenProps<DrawerParamList, 'EditGender'>;

const EditGenderScreen = ({ route, navigation }: Props) => {
    const { gender } = route.params;
    const [name, setName] = useState(gender.name);
    const [description, setDescription] = useState(gender.description);
    const [isActive, setIsActive] = useState(gender.isActive);
    const [popularity, setPopularity] = useState<'B' | 'M' | 'A'>(gender.popularity);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setName(gender.name);
        setDescription(gender.description);
        setIsActive(gender.isActive);
        setPopularity(gender.popularity);
    }, [gender]);

    const handleSave = async () => {
        setSaving(true);
        const res = await fetch(
            `http://localhost:8000/gêneros/${gender.id}/`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, isActive, popularity }),
            }
        );
        navigation.navigate('Genders');
        setSaving(false);
    };

    const toggleSwitch = () => setIsActive(previousState => !previousState);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Text style={styles.label}>Descrição</Text>
            <TextInput value={description} onChangeText={setDescription} style={styles.input} multiline />
            <Text style={styles.label}>Gênero ativo</Text>
            <Text style={styles.label}>Popularidade</Text>
            <div style={styles.pickerHolder}>
                <Picker
                    selectedValue={popularity}
                    onValueChange={(itemValue) => setPopularity(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Baixa" value="B" />
                    <Picker.Item label="Média" value="M" />
                    <Picker.Item label="Alta" value="A" />
                </Picker>
            </div>
            <div style={styles.switch}>
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
                <TouchableOpacity onPress={() => navigation.navigate('Genders')} style={{
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

export default EditGenderScreen;