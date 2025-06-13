import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Ticket } from './TicketScreen';
import { Session } from './SessionScreen';

type Props = DrawerScreenProps<DrawerParamList, 'SessionTickets'>;

export type SessionTicket = {
    id: number;
    ticketDetail: Ticket
    sessionDetail: Session
    type: 'inteira' | 'meia' | 'cortesia';
    dateOfPurchase: string;
};

const SessionTicketScreen = ({ navigation }: Props) => {

    const [sessionTickets, setSessionTickets] = useState<SessionTicket[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSessionTickets = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/ingressos-da-sessão/');
        const data = await response.json();
        setSessionTickets(data);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchSessionTickets();
        }, [])
    );

    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:8000/ingressos-da-sessão/${id}/`, {
            method: 'DELETE',
        });
        setSessionTickets(prev => prev.filter(st => st.id !== id));
    };

    const typeMap = {
        inteira: 'Entrada Inteira',
        meia: 'Meia Entrada',
        cortesia: 'Entrada Cortesia',
    }

    const formatDateString = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const renderItem = ({ item }: { item: SessionTicket }) => (
        <View style={styles.card}>
            <Text style={styles.status}>Sessão {item.sessionDetail.id}</Text>
            <Text style={styles.description}>Filme: {item.sessionDetail.movieDetail.title}</Text>
            <Text style={styles.description}>Ingresso Nº{item.ticketDetail.id}</Text>
            <Text style={styles.description}>Data de compra: {formatDateString(item.dateOfPurchase)}</Text>
            <Text style={styles.description}>Tipo: {typeMap[item.type]}</Text>
            <div style={styles.button}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditSessionTicket', { sessionTicket: item })}
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
            <Text style={styles.title}>Ingressos da Sessão</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FCA311" />
            ) : (
                <FlatList
                    data={sessionTickets}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateSessionTicket')}
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

export default SessionTicketScreen;