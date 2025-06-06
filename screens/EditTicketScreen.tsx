import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';
import { Client } from './ClientScreen';

type Props = DrawerScreenProps<DrawerParamList, 'EditTicket'>;

const EditTicketScreen = ({ route, navigation }: Props) => {
    const { ticket } = route.params;
    const [client, setClient] = useState(ticket.clientDetail.id);
    const [clientList, setClientList] = useState<Client[]>([]);
    const [rating, setRating] = useState<'L' | '10' | '12' | '14' | '16' | '18'>(ticket.rating);
    const [totalPrice, setTotalPrice] = useState(ticket.totalPrice);
    const [paymentMethod, setPaymentMethod] = useState<'boleto' | 'cartao' | 'pix'>(ticket.paymentMethod);
    const [status, setStatus] = useState<'pendente' | 'pago' | 'cancelado'>(ticket.status);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchClientsList = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/clientes/');
        const data = await response.json();
        setClientList(data);
        setLoading(false);
    };

    useEffect(() => {
        setClient(ticket.clientDetail.id);
        setRating(ticket.rating);
        setTotalPrice(ticket.totalPrice);
        setPaymentMethod(ticket.paymentMethod);
        setStatus(ticket.status);
        fetchClientsList();
    }, [ticket])

    const handleSave = async () => {
        setSaving(true);
        const res = await fetch(`http://localhost:8000/ingressos/${ticket.id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client, rating, totalPrice, paymentMethod, status }),
        });
        navigation.navigate('Tickets');
        setSaving(false);
    };

    return (
        <View style={styles.container}>
            <div style={styles.pickerHolder}>
                <Text style={styles.label}>Cliente</Text>
                {loading ? (
                    <ActivityIndicator size="small" color="#FCA311" />
                ) : (
                    <Picker
                        selectedValue={client}
                        onValueChange={(itemValue) => setClient(itemValue)}
                        style={styles.picker}
                    >
                        {clientList.map((client) => (
                            <Picker.Item label={client.name} value={client.id} />
                        ))}
                    </Picker>
                )}
            </div>
            <div style={styles.pickerHolder}>
                <Text style={styles.label}>Classificação</Text>
                <Picker
                    selectedValue={rating}
                    onValueChange={(itemValue) => setRating(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Livre (todas as idades)" value="L" />
                    <Picker.Item label="10 Anos" value="10" />
                    <Picker.Item label="12 Anos" value="12" />
                    <Picker.Item label="14 Anos" value="14" />
                    <Picker.Item label="16 Anos" value="16" />
                    <Picker.Item label="18 Anos" value="18" />
                </Picker>
            </div>
            <div style={styles.pickerHolder}>
                <Text style={styles.label}>Status da compra</Text>
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Pendente" value="pendente" />
                    <Picker.Item label="Pago" value="pago" />
                    <Picker.Item label="Cancelado" value="cancelado" />
                </Picker>
            </div>
            <div style={styles.pickerHolder}>
                <Text style={styles.label}>Método de pagamento</Text>
                <Picker
                    selectedValue={paymentMethod}
                    onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Boleto" value="boleto" />
                    <Picker.Item label="Cartão" value="cartao" />
                    <Picker.Item label="Pix" value="pix" />
                </Picker>
            </div>
            <Text style={styles.label}>Valor Total</Text>
            <TextInput
                value={totalPrice.toString()}
                keyboardType='numeric'
                onChangeText={(text) => {
                    const parsed = parseInt(text, 10);
                    setTotalPrice(isNaN(parsed) ? 0 : parsed);
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
                <TouchableOpacity onPress={() => navigation.navigate('Tickets')} style={{
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

export default EditTicketScreen;