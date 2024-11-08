import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SeatScreen = ({ navigation, route }) => {
    const { passengerInformation, selectedBaggage, checkedBag, travelProtection } = route.params;
    const [selectedSeat, setSelectedSeat] = useState('LCY - JFK');

    const handleSeatSelection = (seat) => {
        setSelectedSeat(seat);
    };

    const handleNextStep = () => {
        navigation.navigate('Summary', {
            passengerInformation,
            selectedBaggage,
            checkedBag,
            travelProtection,
            selectedSeat,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seat</Text>
            <View style={styles.flightContainer}>
                <Text style={styles.flightTitle}>Flight to New York</Text>
                <TouchableOpacity
                    style={[
                        styles.seatOption,
                        selectedSeat === 'LCY - JFK' && styles.selectedOption,
                    ]}
                    onPress={() => handleSeatSelection('LCY - JFK')}
                >
                    <Text style={styles.seatText}>LCY - JFK</Text>
                    <Text style={styles.seatText}>Seats from $5</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.flightContainer}>
                <Text style={styles.flightTitle}>Flight to London</Text>
                <TouchableOpacity
                    style={[
                        styles.seatOption,
                        selectedSeat === 'LCY - JFK' && styles.selectedOption,
                    ]}
                    onPress={() => handleSeatSelection('LCY - JFK')}
                >
                    <Text style={styles.seatText}>LCY - JFK</Text>
                    <Text style={styles.seatText}>Seats from $4.59</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalText}>${806} 1 adult</Text>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Next</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    flightContainer: {
        marginBottom: 24,
    },
    flightTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    seatOption: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 8,
    },
    selectedOption: {
        backgroundColor: '#00b2b2',
    },
    seatText: {
        fontSize: 14,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#00b2b2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    nextButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SeatScreen;import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SeatScreen = ({ navigation, route }) => {
    const { passengerInformation, selectedBaggage, checkedBag, travelProtection } = route.params;
    const [selectedSeat, setSelectedSeat] = useState('LCY - JFK');

    const handleSeatSelection = (seat) => {
        setSelectedSeat(seat);
    };

    const handleNextStep = () => {
        navigation.navigate('Summary', {
            passengerInformation,
            selectedBaggage,
            checkedBag,
            travelProtection,
            selectedSeat,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seat</Text>
            <View style={styles.flightContainer}>
                <Text style={styles.flightTitle}>Flight to New York</Text>
                <TouchableOpacity
                    style={[
                        styles.seatOption,
                        selectedSeat === 'LCY - JFK' && styles.selectedOption,
                    ]}
                    onPress={() => handleSeatSelection('LCY - JFK')}
                >
                    <Text style={styles.seatText}>LCY - JFK</Text>
                    <Text style={styles.seatText}>Seats from $5</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.flightContainer}>
                <Text style={styles.flightTitle}>Flight to London</Text>
                <TouchableOpacity
                    style={[
                        styles.seatOption,
                        selectedSeat === 'LCY - JFK' && styles.selectedOption,
                    ]}
                    onPress={() => handleSeatSelection('LCY - JFK')}
                >
                    <Text style={styles.seatText}>LCY - JFK</Text>
                    <Text style={styles.seatText}>Seats from $4.59</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalText}>${806} 1 adult</Text>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Next</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    flightContainer: {
        marginBottom: 24,
    },
    flightTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    seatOption: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 8,
    },
    selectedOption: {
        backgroundColor: '#00b2b2',
    },
    seatText: {
        fontSize: 14,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#00b2b2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    nextButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SeatScreen;