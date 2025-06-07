import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Platform, TextInput } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';
import { Ticket } from './TicketScreen';
import { Session } from './SessionScreen';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { formatDateToObject } from '@/utils/formateDate';

type Props = DrawerScreenProps<DrawerParamList, 'EditSessionTicket'>;

const EditSessionTicketScreen = ({ route, navigation }: Props) => {
    const { sessionTicket } = route.params;
    const [ticket, setTicket] = useState(sessionTicket.ticketDetail.id);
    const [session, setSession] = useState(sessionTicket.sessionDetail.id);
    const [type, setType] = useState<'inteira' | 'meia' | 'cortesia'>(sessionTicket.type);
    const [dateOfPurchase, setDateOfPurchase] = useState(sessionTicket.dateOfPurchase);
    const [ticketList, setTicketList] = useState<Ticket[]>([]);
    const [sessionList, setSessionList] = useState<Session[]>([]);
    const [date, setDate] = useState(new Date());
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const fetchTicketsList = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/ingressos/');
        const data = await response.json();
        setTicketList(data);
        setLoading(false);
    };

    const fetchSessionsList = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/sessões/');
        const data = await response.json();
        setSessionList(data);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            setTicket(sessionTicket.ticketDetail.id);
            setSession(sessionTicket.sessionDetail.id);
            setType(sessionTicket.type);
            setDateOfPurchase(sessionTicket.dateOfPurchase);
            fetchTicketsList();
            fetchSessionsList();
        }, [])
    );


    const handleSave = async () => {
        setSaving(true);
        const res = await fetch(`http://localhost:8000/ingressos-da-sessão/${sessionTicket.id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticket, session, type, dateOfPurchase }),
        });
        navigation.navigate('SessionTickets');
        setSaving(false);
    };

    const theme = {
        ...MD3LightTheme,
        colors: {
            ...MD3LightTheme.colors,
            primary: '#6200ee',
            background: '#f4f4f4',
            surface: '#ffffff',
            onSurface: '#333333',
        },
    };


    return (
        <PaperProvider theme={theme}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Registrar Ingresso da Sessão</Text>
                    <div style={styles.pickerHolder}>
                        <Text style={styles.label}>Ingresso</Text>
                        {loading ? (
                            <ActivityIndicator size="small" color="#FCA311" />
                        ) : (
                            <Picker
                                selectedValue={ticket}
                                onValueChange={(itemValue) => setTicket(itemValue)}
                                style={styles.picker}
                            >
                                {ticketList.map((ticket) => (
                                    <Picker.Item value={ticket.id.toString()} label={`Código - ${ticket.id}`} />
                                ))}
                            </Picker>)}
                    </div>
                    <div style={styles.pickerHolder}>
                        <Text style={styles.label}>Sessão</Text>
                        {loading ? (
                            <ActivityIndicator size="small" color="#FCA311" />
                        ) : (
                            <Picker
                                selectedValue={session}
                                onValueChange={(itemValue) => setSession(itemValue)}
                                style={styles.picker}
                            >
                                {sessionList.map((session) => (
                                    <Picker.Item value={session.id.toString()} label={`${session.movieDetail.title} - Sala ${session.roomDetail.number}`} />
                                ))}
                            </Picker>)}
                    </div>
                    <div style={styles.pickerHolder}>
                        <Text style={styles.label}>Tipo</Text>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue) => setType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Inteira" value="inteira" />
                            <Picker.Item label="Meia" value="meia" />
                            <Picker.Item label="Cortesia" value="cortesia" />
                        </Picker>
                    </div>
                    <Text style={styles.label}>Data de compra</Text>
                    <TouchableOpacity onPress={() => setShow(!show)}>
                        <TextInput
                            value={formatDateToObject(date).label}
                            style={styles.input}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <DatePickerModal
                        locale="pt"
                        mode='single'
                        visible={show}
                        onDismiss={() => setShow(false)}
                        date={date}
                        onConfirm={({ date }) => {
                            setShow(false);
                            setDate(date ?? new Date());
                            setDateOfPurchase(formatDateToObject(date ?? new Date()).value);
                        }}
                        saveLabel="Salvar" 
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
                        <TouchableOpacity onPress={() => navigation.navigate('SessionTickets')} style={{
                            backgroundColor: '#14213D',
                            padding: 8,
                            borderRadius: 6,
                        }}>
                            <Text style={{ color: '#fff', fontWeight: '500', alignSelf: 'center' }}>VOLTAR</Text>
                        </TouchableOpacity>
                    </div>
                </View>
            </SafeAreaView>
        </PaperProvider>
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

export default EditSessionTicketScreen;