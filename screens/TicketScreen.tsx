import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Client } from './ClientScreen';

type Props = DrawerScreenProps<DrawerParamList, 'Tickets'>;

export type Ticket = {
    id: number;
    clientDetail: Client
    rating: 'L' | '10' | '12' | '14' | '16' | '18';
    totalPrice: number
    paymentMethod: 'boleto' | 'cartao' | 'pix';
    status: 'pendente' | 'pago' | 'cancelado';
};

const TicketScreen = ({ navigation }: Props) => {

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTickets = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/ingressos/');
        const data = await response.json();
        setTickets(data);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchTickets();
        }, [])
    );

    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:8000/ingressos/${id}/`, {
            method: 'DELETE',
        });
        setTickets(prev => prev.filter(t => t.id !== id));
    };

    const ratingMap = {
        L: 'Livre (todas as idades)',
        10: '10 Anos',
        12: '12 Anos',
        14: '14 Anos',
        16: '16 Anos',
        18: '18 Anos',
    }

    const renderItem = ({ item }: { item: Ticket }) => (
        <View style={styles.card}>
            <Text style={styles.status}>Pagamento - {item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
            <Text style={styles.description}>Cliente: {item.clientDetail.name}</Text>
            <Text style={styles.description}>Classificação: {ratingMap[item.rating]}</Text>
            <Text style={styles.description}>Pagamento via: {item.paymentMethod}</Text>
            <Text style={styles.description}>Total: R${item.totalPrice}</Text>
            <div style={styles.button}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditTicket', { ticket: item })}
                >
                    <Ionicons name="pencil" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                >
                    <Ionicons name="trash" size={24} color="#fff" />
                </TouchableOpacity>
            </div>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingressos</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FCA311" />
            ) : (
                <FlatList
                    data={tickets}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateTicket')}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#14213D',
        alignSelf: 'center',
    },
    card: {
        backgroundColor: '#E5E5E5',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    status: {
        fontSize: 18,
        fontWeight: '600',
        color: '#14213D',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    switch: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        display: 'flex',
        gap: 4,
    },
    editButton: {
        backgroundColor: '#FCA311',
        padding: 8,
        borderRadius: 6,
        marginRight: 8,
    },
    editText: {
        color: '#fff',
        fontWeight: '500'
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        backgroundColor: '#14213D',
        borderRadius: 28,
        padding: 14,
        elevation: 4,
    },
    deleteButton: {
        backgroundColor: '#a00f0f',
        padding: 8,
        borderRadius: 6,
        marginRight: 8,
    },
    row: {
        flexDirection: 'row',
        marginTop: 8,
        alignSelf: 'flex-end'
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 10,
        bottom: 14,
        gap: 8,
    }
});

export default TicketScreen;