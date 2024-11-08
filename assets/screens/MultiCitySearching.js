import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FlightSearching from './FlightSearching';
import LocationPickerModal from './LocationPickerModal'; // Import modal
import DatePicker from './DateSelectionModel'; // Import your date picker

const locations = [
    { id: '1', city: 'New York', description: 'NYC, USA', airports: [{ name: 'JFK Airport', distance: '30 km', code: 'JFK' }] },
    { id: '2', city: 'Los Angeles', description: 'LA, USA', airports: [{ name: 'LAX Airport', distance: '20 km', code: 'LAX' }] },

    { id: '3', city: 'Ontario, Canada', description: 'City in Ontario, Canada', airports: [{ name: 'London Airport', distance: '30 km to destination', code: 'YXU' }] },

    // Thêm địa điểm khác tại đây
];

const MultiCitySearching = ({ navigation }) => {
    const defaultFlights = [
        { from: '', to: '', date: new Date() },
        { from: '', to: '', date: new Date() },
    ];
    const [flights, setFlights] = useState(defaultFlights);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
    const [locationType, setLocationType] = useState(null);
    const [datePickerVisible, setDatePickerVisible] = useState(false);

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

    const openLocationPicker = (index, type) => {
        setSelectedFlightIndex(index);
        setLocationType(type);
        setModalVisible(true);
    };

    const handleLocationSelect = (location) => {
        if (locationType === 'from') {
            updateFlight(selectedFlightIndex, 'from', location);
        } else {
            updateFlight(selectedFlightIndex, 'to', location);
        }
        setModalVisible(false);
    };

    const handleDateSelect = (date) => {
        updateFlight(selectedFlightIndex, 'date', date);
        setDatePickerVisible(false);
    };


    return (
        <FlightSearching navigation={navigation} defaultTab="Multi-city">
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    {flights.map((flight, index) => (
                        <View key={index} style={styles.flightContainer}>
                            <Text style={styles.flightTitle}>Flight {index + 1}</Text>
                            <View style={styles.flightRowContainer}>
                                <TouchableOpacity style={styles.flightInputContainer} onPress={() => openLocationPicker(index, 'from')}>
                                    <Image source={require('../images/Icon/airplane.png')} style={styles.airplaneImg} />
                                    <TextInput
                                        style={[styles.flightInput, flight.from ? styles.selectedInputText : styles.placeholderText]}
                                        placeholder="From"
                                        placeholderTextColor="#9095a0"
                                        value={flight.from}
                                        editable={false} // Không cho phép nhập trực tiếp
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flightInputContainer} onPress={() => openLocationPicker(index, 'to')}>
                                    <Image source={require('../images/Icon/arrivals.png')} style={styles.airplaneImg} />
                                    <TextInput
                                        style={[styles.flightInput, flight.to ? styles.selectedInputText : styles.placeholderText]}
                                        placeholder="To"
                                        placeholderTextColor="#9095a0"
                                        value={flight.to}
                                        editable={false} // Không cho phép nhập trực tiếp
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dateContainer}>
                                <TouchableOpacity style={styles.dateItem} onPress={() => {
                                    setSelectedFlightIndex(index);
                                    setDatePickerVisible(true);
                                }}>
                                    <Icon name="calendar" size={16} color="#9095a0" style={styles.dateIcon} />
                                    <Text style={styles.dateLabel}>{flight.date.toDateString()}</Text>
                                </TouchableOpacity>
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

                {/* Modal để chọn địa điểm */}
                <LocationPickerModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelect={handleLocationSelect}
                    locations={locations}
                    title="Select Location"
                    from={flights[selectedFlightIndex]?.from} // Truyền giá trị "from"
                    to={flights[selectedFlightIndex]?.to} // Truyền giá trị "to"
                    onSwap={() => {
                        const temp = flights[selectedFlightIndex]?.from;
                        updateFlight(selectedFlightIndex, 'from', flights[selectedFlightIndex]?.to);
                        updateFlight(selectedFlightIndex, 'to', temp);
                    }}
                    selectedInput={locationType} // Truyền loại địa điểm đã chọn
                />

                <DatePicker
                    visible={datePickerVisible}
                    onClose={() => setDatePickerVisible(false)}
                    onSelect={handleDateSelect}
                    departureDate={flights[selectedFlightIndex]?.date}
                />
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
    selectedInputText: {
        color: '#000', // Màu chữ khi đã chọn
    },
    placeholderText: {
        color: '#9095a0', // Màu chữ khi chưa chọn
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