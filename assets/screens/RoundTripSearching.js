import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FlightSearching from './FlightSearching';
import LocationPickerModal from './LocationPickerModal';
import DatePicker from './DateSelectionModel'; // Import your DatePicker component

const locations = [
    { id: '1', city: 'London, United Kingdom', description: 'Capital of England', airports: [{ name: 'London City Airport', distance: '20 km to destination', code: 'LCY' }, { name: 'Heathrow Airport', code: 'LHR', distance: '13 km to destination' }] },
    { id: '2', city: 'Ontario, Canada', description: 'City in Ontario, Canada', airports: [{ name: 'London Airport', distance: '30 km to destination', code: 'YXU' }] },
];

const RoundTripSearching = ({ navigation, route }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState(null); // Start with null
    const [returnDate, setReturnDate] = useState(null); // Start with null

    const openLocationPicker = (inputType) => {
        setSelectedInput(inputType);
        setModalVisible(true);
    };

    const closeLocationPicker = () => {
        setModalVisible(false);
    };

    const handleLocationSelect = (location) => {
        if (selectedInput === 'from') {
            setFrom(location);
        } else if (selectedInput === 'to') {
            setTo(location);
        }
        closeLocationPicker();
    };

    const handleSwap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    const openDatePicker = () => {
        setDatePickerVisible(true);
    };

    const handleDateSelect = (newDepartureDate, newReturnDate) => {
        // If the user only selects one date, set the other to null
        setDepartureDate(newDepartureDate);
        if (newReturnDate) {
            setReturnDate(newReturnDate);
        }
        setDatePickerVisible(false);
    };

    const formatDate = (date) => {
        if (!date) return 'Select Date'; // Fallback if no date is selected
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <FlightSearching navigation={navigation} defaultTab="Round-trip">
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() => openLocationPicker('from')} style={styles.searchInputContainer}>
                    <Image source={require('../images/Icon/airplane.png')} style={styles.airplaneImg} />
                    <TextInput
                        style={[styles.searchInput, from ? styles.selectedInput : null]}
                        placeholder="From"
                        placeholderTextColor="#9095a0"
                        value={from}
                        editable={false}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.swapContainer} onPress={handleSwap}>
                    <Icon name="swap-vertical" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLocationPicker('to')} style={styles.searchInputContainer}>
                    <Image source={require('../images/Icon/arrivals.png')} style={styles.airplaneImg} />
                    <TextInput
                        style={[styles.searchInput, to ? styles.selectedInput : null]}
                        placeholder="To"
                        placeholderTextColor="#9095a0"
                        value={to}
                        editable={false}
                    />
                </TouchableOpacity>
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={openDatePicker} style={styles.dateItem}>
                        <Icon name="calendar" size={16} color="#9095a0" style={styles.dateIcon} />
                        <Text style={styles.dateLabel}>{formatDate(departureDate)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openDatePicker} style={styles.dateItem}>
                        <Icon name="calendar" size={16} color="#9095a0" style={styles.dateIcon} />
                        <Text style={styles.dateLabel}>{formatDate(returnDate)}</Text>
                    </TouchableOpacity>
                </View>

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
            </View>

            <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search flights</Text>
            </TouchableOpacity>

            <LocationPickerModal
                visible={isModalVisible}
                onClose={closeLocationPicker}
                onSelect={handleLocationSelect}
                locations={locations}
                title={`Where ${selectedInput === 'from' ? 'from?' : 'to?'}`}
                from={from}
                to={to}
                onSwap={handleSwap}
                selectedInput={selectedInput}
            />

            <DatePicker
                visible={isDatePickerVisible}
                onClose={() => setDatePickerVisible(false)}
                onSelect={handleDateSelect} // Updated function to handle both dates
                departureDate={departureDate}
                returnDate={returnDate}
            />
        </FlightSearching>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        padding: 16,
        paddingBottom: 80,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        height: 54,
        paddingHorizontal: 12,
        backgroundColor: '#f3f4f6',
        marginVertical: 2,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    selectedInput: {
        color: '#000',
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
        marginVertical: 8,
        marginTop: 16,
    },
    dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: '48%',
        height: 54,
        backgroundColor: '#f3f4f6',
    },
    dateIcon: {
        marginRight: 8,
        fontSize: 16,
    },
    dateLabel: {
        fontSize: 16,
        color: '#000',
    },
    travelerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        height: 54,
        paddingHorizontal: 12,
        backgroundColor: '#f3f4f6',
        marginVertical: 8,
        width: '110%',
        marginLeft: -16,
        marginTop: 20,
    },
    swapContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 48,
        left: '90%',
        marginLeft: -35,
        zIndex: 1,
        backgroundColor: '#f3f4f6',
        borderRadius: 25,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderColor: '#fff',
        borderWidth: 1,
    },
    travelerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    travelerIcon: {
        marginRight: 4,
        marginLeft: 6,
    },
    travelerLabel: {
        fontSize: 14,
        color: '#767a81',
    },
    dotSeparator: {
        fontSize: 14,
        color: '#9095a0',
        marginHorizontal: 4,
    },
    searchButton: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        backgroundColor: '#00bdd6',
        paddingVertical: 14,
        borderRadius: 8,
        width: '90%',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RoundTripSearching;