import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Sample data for flights
const flightData = [
    {
        id: '1',
        departureTime: '6:30 AM',
        arrivalTime: '2:00 PM',
        from: 'LCY',
        to: 'JFK',
        airline: 'SkyHaven',
        duration: '7h 30m',
        stops: '1 stop',
        price: '$806',
    },
    {
        id: '2',
        departureTime: '3:15 PM',
        arrivalTime: '6:05 PM',
        from: 'LCY',
        to: 'JFK',
        airline: 'CC Air',
        duration: '7h 50m',
        stops: 'Direct',
        price: '$964',
    },
    {
        id: '3',
        departureTime: '3:15 PM',
        arrivalTime: '7:50 PM',
        from: 'LCY',
        to: 'JFK',
        airline: 'EcoWings',
        duration: '7h 30m',
        stops: 'Direct',
        price: '$964',
    },
    // Add more flights as needed
];

// Component to display each flight result
const FlightResult = ({ flight }) => (
    <View style={styles.resultContainer}>
        <View style={styles.flightInfo}>
            <Text style={styles.timeText}>{flight.departureTime} - {flight.arrivalTime}</Text>
            <Text style={styles.airlineText}>{flight.airline}</Text>
        </View>
        <View style={styles.routeInfo}>
            <Text style={styles.airportCode}>{flight.from}</Text>
            <Icon name="arrow-forward" size={16} color="#000" />
            <Text style={styles.airportCode}>{flight.to}</Text>
        </View>
        <View style={styles.details}>
            <Text style={styles.durationText}>{flight.duration}</Text>
            <Text style={styles.stopsText}>{flight.stops}</Text>
        </View>
        <Text style={styles.priceText}>{flight.price}</Text>
    </View>
);

// Main component to render the flight search results
const FlightResults = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={flightData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <FlightResult flight={item} />}
            />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={24} color="#fff" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    resultContainer: {
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    flightInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
    },
    airlineText: {
        fontSize: 14,
        color: '#767a81',
    },
    routeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    airportCode: {
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 4,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    durationText: {
        fontSize: 14,
        color: '#767a81',
    },
    stopsText: {
        fontSize: 14,
        color: '#767a81',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00bdd6',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#00bdd6',
        borderRadius: 20,
    },
    backText: {
        color: '#fff',
        marginLeft: 4,
    },
});

export default FlightResults;
