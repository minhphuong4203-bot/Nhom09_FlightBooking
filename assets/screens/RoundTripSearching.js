import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SortFilterModal from './SortFilterModal';
import FlightDetails from './FlightDetail';

const FlightResult = ({ flight, navigation }) => (
    <TouchableOpacity
        style={styles.resultContainer}
        onPress={() => navigation.navigate('FlightDetail', { flightData: flight })} // Correct screen name
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

const FlightResults = ({ route, navigation }) => {
    const sampleFlightData = [
        {
            id: '1',
            departureTime: '08:00 AM',
            arrivalTime: '10:00 AM',
            airline: 'Airline A',
            from: 'JFK',
            to: 'LAX',
            duration: '6h 0m',
            stops: 'Direct',
            price: '$300',
        },
        {
            id: '2',
            departureTime: '09:00 AM',
            arrivalTime: '11:30 AM',
            airline: 'Airline B',
            from: 'JFK',
            to: 'LAX',
            duration: '5h 30m',
            stops: '1 stop',
            price: '$250',
        },
        {
            id: '3',
            departureTime: '10:00 AM',
            arrivalTime: '12:00 PM',
            airline: 'Airline C',
            from: 'JFK',
            to: 'LAX',
            duration: '6h 0m',
            stops: 'Direct',
            price: '$280',
        },
    ];

    const flightData = (route && route.params && route.params.flightData) || sampleFlightData;
    const [isSortFilterVisible, setSortFilterVisible] = useState(false);
    const [filteredFlightData, setFilteredFlightData] = useState(flightData);

    const handleApplyFilters = (filters) => {
        const { sortOption, stopOption, selectedAirlines } = filters;

        let filteredData = flightData.filter((flight) => {
            const matchesStops =
                stopOption === 'Any stops' ||
                (stopOption === '1 stop or nonstop' && (flight.stops === '1 stop' || flight.stops === 'Direct')) ||
                (stopOption === 'Nonstop only' && flight.stops === 'Direct');

            const matchesAirline = selectedAirlines.size === 0 || selectedAirlines.has(flight.airline);
            return matchesStops && matchesAirline;
        });

        if (sortOption === 'Cheapest') {
            filteredData.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        } else if (sortOption === 'Fastest') {
            filteredData.sort((a, b) => {
                const [hoursA, minutesA] = a.duration.split('h ').map(part => parseInt(part));
                const [hoursB, minutesB] = b.duration.split('h ').map(part => parseInt(part));
                return (hoursA * 60 + minutesA) - (hoursB * 60 + minutesB);
            });
        }

        setFilteredFlightData(filteredData);
        setSortFilterVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topButtonsContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={24} color="#fff" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.sortFilterButton}
                    onPress={() => setSortFilterVisible(true)}
                >
                    <Text style={styles.sortFilterButtonText}>Sort & Filter</Text>
                    <Icon name="funnel-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredFlightData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <FlightResult flight={item} navigation={navigation} />}
            />

            <SortFilterModal
                visible={isSortFilterVisible}
                onClose={() => setSortFilterVisible(false)}
                onApply={handleApplyFilters}
            />
        </View>
    );

};

// Styles remain the same
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    topButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 10,
    },
    backButton: {
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
    sortFilterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00bdd6',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
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
});



export default FlightResults;
