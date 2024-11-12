import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SortFilterModal from './SortFilterModal'; // Import SortFilterModal component
import FlightDetail from './FlightDetail';

// Sample data for flights
const flightData = [
    { id: '1', departureTime: '6:30 AM', arrivalTime: '2:00 PM', from: 'LCY', to: 'JFK', airline: 'SkyHaven', duration: '7h 30m', stops: '1 stop', price: '$806' },
    { id: '2', departureTime: '3:15 PM', arrivalTime: '6:05 PM', from: 'LCY', to: 'JFK', airline: 'CC Air', duration: '7h 50m', stops: 'Direct', price: '$964' },
    { id: '3', departureTime: '3:15 PM', arrivalTime: '7:50 PM', from: 'LCY', to: 'JFK', airline: 'EcoWings', duration: '7h 30m', stops: 'Direct', price: '$964' },
    // Add more flights as needed
];

// Component to display each flight result
const FlightResult = ({ flight, navigation }) => (
    <TouchableOpacity
        style={styles.resultContainer}
        onPress={() => navigation.navigate('FlightDetail', { flightData: flight })}
    >
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
    </TouchableOpacity>
);

// Main component to render the flight search results
const FlightResults = ({ navigation }) => {
    const [isSortFilterVisible, setSortFilterVisible] = useState(false);
    const [filteredFlightData, setFilteredFlightData] = useState(flightData);

    const handleApplyFilters = (filters) => {
        const { sortOption, stopOption, selectedAirlines } = filters;

        // Filter based on stops and selected airlines
        let filteredData = flightData.filter((flight) => {
            const matchesStops =
                stopOption === 'Any stops' ||
                (stopOption === '1 stop or nonstop' && (flight.stops === '1 stop' || flight.stops === 'Direct')) ||
                (stopOption === 'Nonstop only' && flight.stops === 'Direct');
            
            const matchesAirline = selectedAirlines.size === 0 || selectedAirlines.has(flight.airline);
            return matchesStops && matchesAirline;
        });

        // Sort the filtered data based on the sort option
        if (sortOption === 'Cheapest') {
            filteredData.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        } else if (sortOption === 'Fastest') {
            filteredData.sort((a, b) => {
                const [hoursA, minutesA] = a.duration.split('h ').map(part => parseInt(part));
                const [hoursB, minutesB] = b.duration.split('h ').map(part => parseInt(part));
                return (hoursA * 60 + minutesA) - (hoursB * 60 + minutesB);
            });
        }

        // Update the state with the filtered and sorted data
        setFilteredFlightData(filteredData);
        setSortFilterVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Sort & Filter Button */}
            <TouchableOpacity
                style={styles.sortFilterButton}
                onPress={() => setSortFilterVisible(true)}
            >
                <Text style={styles.sortFilterButtonText}>Sort & Filter</Text>
                <Icon name="funnel-outline" size={20} color="#fff" />
            </TouchableOpacity>

            {/* Search Results List */}
            <FlatList
                data={filteredFlightData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <FlightResult flight={item} navigation={navigation} />}
            />

            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={24} color="#fff" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            {/* SortFilterModal */}
            <SortFilterModal
                visible={isSortFilterVisible}
                onClose={() => setSortFilterVisible(false)}
                onApply={handleApplyFilters}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    sortFilterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00bdd6',
        padding: 10,
        borderRadius: 8,
        margin: 16,
    },
    sortFilterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
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
