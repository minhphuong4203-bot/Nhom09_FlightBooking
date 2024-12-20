import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import SortFilterModal from './SortFilterModal';

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
            <Text style={styles.airportCode}>{flight.departureCode}</Text> {/* Hiển thị mã sân bay khởi hành */}
            <Icon name="arrow-forward" size={16} color="#000" />
            <Text style={styles.airportCode}>{flight.destinationCode}</Text> {/* Hiển thị mã sân bay đến */}
            <Text style={styles.airportCode}>, {flight.weather}</Text> {/* Hiển thị mã sân bay đến */}
        </View>
        <View style={styles.details}>
            <Text style={styles.durationText}>{flight.duration}</Text>
            <Text style={styles.stopsText}>{flight.stop}</Text>
        </View>
        <Text style={styles.priceText}>${flight.price}</Text>
    </TouchableOpacity>
);

const SearchResult = ({ navigation, route }) => {
    const { from, to, departureDate, returnDate, travelerData, type } = route.params;
    const [flightData, setFlightData] = useState([]);
    const [isSortFilterVisible, setSortFilterVisible] = useState(false);
    const [filteredFlightData, setFilteredFlightData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { flights } = route.params;

    // console.log('route.params:', route.params);
    // console.log('flights:', flights);

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const db = firestore();
                const flightRef = db.collection('flight');
                let query = flightRef;

                // Function to fetch flight data based on the query
                const getFlightData = async (query) => {
                    const snapshot = await query.get();
                    return await Promise.all(snapshot.docs.map(async (doc) => {
                        const flightData = doc.data();
                        const departureAirportId = flightData.departure.split('/').pop();
                        const destinationAirportId = flightData.destination.split('/').pop();
                        const departureCityId = flightData.departure.split('/').slice(-3, -2)[0];
                        const destinationCityId = flightData.destination.split('/').slice(-3, -2)[0];

                        // Fetch airport data
                        const departureCityDoc = await db.collection('city').doc(departureCityId).get();
                        const departureAirportDoc = await departureCityDoc.ref.collection('airport').doc(departureAirportId).get();
                        const departureAirportData = departureAirportDoc.data();

                        const destinationCityDoc = await db.collection('city').doc(destinationCityId).get();
                        const destinationAirportDoc = await destinationCityDoc.ref.collection('airport').doc(destinationAirportId).get();
                        const destinationAirportData = destinationAirportDoc.data();

                        return {
                            id: doc.id,
                            ...flightData,
                            departureCode: departureAirportData.code,
                            destinationCode: destinationAirportData.code,
                        };
                    }));
                };

                if (flights === undefined) {
                    // Build query for one-way or roundtrip flights
                    if (type === 'round-trip') {
                        query = query.where('type', '==', 'round-trip');
                    } else if (type === 'one-way') {
                        query = query.where('type', '==', 'one-way');
                    }
                    if (from) {
                        query = query.where('departure', '==', from);
                    }
                    if (to) {
                        query = query.where('destination', '==', to);
                    }
                    if (departureDate) {
                        const departureTimestamp = firestore.Timestamp.fromDate(new Date(departureDate));
                        query = query.where('from', '>=', departureTimestamp);
                    }
                    if (returnDate) {
                        const returnTimestamp = firestore.Timestamp.fromDate(new Date(returnDate));
                        query = query.where('to', '<=', returnTimestamp);
                    }

                    // Fetch data for one-way or roundtrip flights
                    const data = await getFlightData(query);
                    setFlightData(data);
                    setFilteredFlightData(data);
                } else {
                    // Handle multi-city flights
                    const multiCityPromises = flights.map(async (flight) => {
                        const flightQuery = flightRef
                            .where('departure', '==', flight.from)
                            .where('destination', '==', flight.to)
                            .where('type', '==', 'one-way');

                        if (flight.date) {
                            const flightDateTimestamp = firestore.Timestamp.fromDate(new Date(flight.date));
                            flightQuery.where('from', '>=', flightDateTimestamp);
                        }

                        return await getFlightData(flightQuery);
                    });

                    const multiCityResults = await Promise.all(multiCityPromises);
                    const flattenedResults = multiCityResults.flat();

                    setFlightData(flattenedResults);
                    setFilteredFlightData(flattenedResults);
                }
            } catch (error) {
                console.log('Error fetching flight data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlightData();
    }, [type, from, to, departureDate, returnDate, flights, travelerData]);

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

    const renderItem = ({ item, index }) => {
        // Convert Firestore timestamps to Date objects
        const departureTime = item.from ?
            new Date(item.from._seconds * 1000).toLocaleString() : 'N/A';
        const arrivalTime = item.to ?
            new Date(item.to._seconds * 1000).toLocaleString() : 'N/A';

        // console.log('Departure time:', departureTime);
        // console.log('Arrival time:', arrivalTime);

        return (
            <FlightResult
                key={`flight-${index}`}
                flight={{
                    ...item,
                    departureTime,
                    arrivalTime,
                }}
                navigation={navigation}
            />
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.sortFilterButton}
                onPress={() => setSortFilterVisible(true)}
            >
                <Text style={styles.sortFilterButtonText}>Sort & Filter</Text>
                <Icon name="funnel-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <FlatList
                data={filteredFlightData}
                keyExtractor={(flight) => flight.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.emptyText}>No flights found</Text>}
            />

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={24} color="#fff" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

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
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#767a81',
    },
});

export default SearchResult;