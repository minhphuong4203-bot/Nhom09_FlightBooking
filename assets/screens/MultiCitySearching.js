import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FlightSearching from './FlightSearching';

const MultiCitySearching = ({ navigation }) => {
    const defaultFlights = [
        { from: '', to: '', date: 'Fri, Jul 14' },
        { from: '', to: '', date: 'Fri, Jul 14' },
    ];
    const [flights, setFlights] = useState(defaultFlights);

    const addFlight = () => {
        setFlights([...flights, { from: '', to: '', date: 'Fri, Jul 14' }]);
    };

    const removeFlight = (index) => {
        const newFlights = [...flights];
        newFlights.splice(index, 1);
        setFlights(newFlights);
    };

    const updateFlight = (index, field, value) => {
        const newFlights = [...flights];
        newFlights[index][field] = value;
        setFlights(newFlights);
    };

    return (
        <FlightSearching navigation={navigation} defaultTab="Multi-city">
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    {flights.map((flight, index) => (
                        <View key={index} style={styles.flightContainer}>
                            <Text style={styles.flightTitle}>Flight {index + 1}</Text>
                            <View style={styles.flightRowContainer}>
                                <View style={styles.flightInputContainer}>
                                    <Image source={require('../images/Icon/airplane.png')} style={styles.airplaneImg} />
                                    <TextInput
                                        style={styles.flightInput}
                                        placeholder="From"
                                        placeholderTextColor="#9095a0"
                                        value={flight.from}
                                        onChangeText={(text) => updateFlight(index, 'from', text)}
                                    />
                                </View>
                                <View style={styles.flightInputContainer}>
                                    <Image source={require('../images/Icon/arrivals.png')} style={styles.airplaneImg} />
                                    <TextInput
                                        style={styles.flightInput}
                                        placeholder="To"
                                        placeholderTextColor="#9095a0"
                                        value={flight.to}
                                        onChangeText={(text) => updateFlight(index, 'to', text)}
                                    />
                                </View>
                            </View>
                            <View style={styles.dateContainer}>
                                <View style={styles.dateItem}>
                                    <Icon name="calendar" size={16} color="#9095a0" style={styles.dateIcon} />
                                    <Text style={styles.dateLabel}>{flight.date}</Text>
                                </View>
                                {index > 0 && (
                                    <TouchableOpacity onPress={() => removeFlight(index)}>
                                        <Icon name="trash" size={18} color="#ff4d4d" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity style={[styles.addFlightButton, { borderColor: '#00bdd6', borderWidth: 1 }]} onPress={addFlight}>
                        <Text style={[styles.addFlightText, { color: '#00bdd6' }]}>Add flight</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.travelerContainer}>
                        <View style={styles.travelerContent}>
                            <Icon name="person" size={16} color="#9095a0" style={styles.travelerIcon} />
                            <Text style={styles.travelerLabel}>Traveller</Text>
                            <Text style={styles.dotSeparator}> • </Text>
                            <Icon name="airplane" size={16} color="#9095a0" style={styles.travelerIcon} />
                            <Text style={styles.travelerLabel}>Economy</Text>
                        </View>
                        <Icon name="chevron-down" size={16} color="#9095a0" style={{ marginLeft: 180 }} />
                    </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Search flights</Text>
                </TouchableOpacity>
            </View>
        </FlightSearching>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 80,
    },
    scrollViewContainer: {
        paddingBottom: 100, // Để tránh che khuất bởi nút tìm kiếm
    },
    flightContainer: {
        marginVertical: 8,
    },
    flightTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    flightRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flightInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        height: 54,
        paddingHorizontal: 12,
        backgroundColor: '#f3f4f6',
        marginVertical: 0,
        width: '48%',
    },
    flightInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    airplaneImg: {
        width: 20,
        height: 20,
        marginLeft: 6,
        marginRight: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: '100%',
        height: 54,
        backgroundColor: '#f3f4f6',
    },
    dateIcon: {
        marginRight: 8,
        fontWeight: 'bold',
    },
    dateLabel: {
        fontSize: 16,
        color: '#9095a0',
    },
    addFlightButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    addFlightText: {
        fontSize: 16,
        marginLeft: 8,
    },
    travelerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        height: 54,
        paddingHorizontal: 12,
        marginVertical: 28,
    },
    travelerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    travelerIcon: {
        marginRight: 4,
        marginLeft: 6,
    },
    travelerLabel: {
        fontSize: 14,
        color: '#767a81',
    },
    searchButton: {
        backgroundColor: '#00bdd6',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MultiCitySearching;