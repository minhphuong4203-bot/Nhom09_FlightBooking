import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SummaryScreen = ({ navigation, route }) => {
    const {
        passengerInformation,
        selectedBaggage,
        checkedBag,
        travelProtection,
        selectedSeat,
        paymentMethod,
    } = route.params;

    const handleBookingComplete = async () => {
        try {
            await axios.post('/api/bookings', {
                passengerInformation,
                selectedBaggage,
                checkedBag,
                travelProtection,
                selectedSeat,
                paymentMethod,
            });
            navigation.navigate('Home');
        } catch (error) {
            console.log('Error saving booking:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.successContainer}>
                <Text style={styles.title}>Booking successful</Text>
                <Text style={styles.message}>
                    Your flight booking has been completed. You can view the details below.
                </Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.sectionTitle}>Flight Details</Text>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>From:</Text>
                    <Text style={styles.detailValue}>LCY</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>To:</Text>
                    <Text style={styles.detailValue}>JFK</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Seat:</Text>
                    <Text style={styles.detailValue}>{selectedSeat}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Baggage:</Text>
                    <Text style={styles.detailValue}>
                        {selectedBaggage === 'cabin'
                            ? 'Personal item only'
                            : selectedBaggage === 'checked'
                                ? '1 checked bag (Max weight 22.1 lbs)'
                                : 'No checked bag'}
                    </Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Travel Protection:</Text>
                    <Text style={styles.detailValue}>
                        {travelProtection ? '1 checked bag (Max weight 22.1 lbs)' : 'No insurance'}
                    </Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Payment Method:</Text>
                    <Text style={styles.detailValue}>{paymentMethod}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalText}>${811.56} 1 adult</Text>
                <TouchableOpacity style={styles.doneButton} onPress={handleBookingComplete}>
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    successContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    detailsContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    doneButton: {
        backgroundColor: '#00b2b2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    doneButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SummaryScreen;