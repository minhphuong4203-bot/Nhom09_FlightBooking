import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FlightSearching from './FlightSearching';
import LocationPickerModal from './LocationPickerModal';
import DatePicker from './DateSelectionModel'; // Import your DatePicker component
import TravelOptions from './FilterOtherOptions';

// const locations = [
//     { id: '1', city: 'New York, USA', description: 'City in New York State', airports: [{ name: 'John F.Kennedy International Airport', distance: '20 km to destination', code: 'JFK' }, { name: 'LaGuardia Airport', code: 'EWR', distance: '11 km to destination' }] },
// ];

const OneWaySearching = ({ navigation }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [departCity, setDepartCity] = useState('');
    const [destiCity, setDestiCity] = useState('');

    const [isTravelOptionsVisible, setTravelOptionsVisible] = useState(false);
    const [travelerData, setTravelerData] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        cabinClass: 'Economy',
    });

    const openTravelOptions = () => {
        setTravelOptionsVisible(true);
    };

    const closeTravelOptions = () => {
        setTravelOptionsVisible(false);
    };

    const handleTravelOptionsSelect = (data) => {
        setTravelerData(data);
        closeTravelOptions();
    };
    const totalTravelers = travelerData.adults + travelerData.children + travelerData.infants;

    const openDatePicker = () => {
        setDatePickerVisible(true);
    };

    const handleDateSelect = (startDate, endDate) => {
        if (endDate) {
            // Round trip selected
            setDepartureDate(startDate);
            // Handle return date if needed
        } else {
            // One way selected
            setDepartureDate(startDate);
        }
    };

    const handleSearch = () => {
        const departureDateString = departureDate ?
            new Date(Date.UTC(departureDate.getUTCFullYear(), departureDate.getUTCMonth(), departureDate.getUTCDate() + 1)).toISOString() : null;

        console.log('departureDateString', departureDateString);

        navigation.navigate('SearchResult', {
            from: from,
            to: to,
            departureDate: departureDateString,
            travelerData: travelerData,
            type: 'one-way',
        });
    };

    const openLocationPicker = (inputType) => {
        setSelectedInput(inputType);
        setModalVisible(true);
    };

    const closeLocationPicker = () => {
        setModalVisible(false);
    };

    const handleLocationSelect = (location) => {
        if (selectedInput === 'from') {
            setFrom(location.path); // Set the full path for departure
            setDepartCity(location.city);
        } else if (selectedInput === 'to') {
            setTo(location.path); // Set the full path for destination
            setDestiCity(location.city);
        }
        closeLocationPicker();
    };

    const handleSwap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    const formatDate = (date) => {
        if (!date) return 'Select Date'; // Fallback if no date is selected
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <FlightSearching navigation={navigation} defaultTab="One-way">
            <ScrollView style={styles.searchContainer}>
                <TouchableOpacity onPress={() => openLocationPicker('from')} style={styles.searchInputContainer}>
                    <Image source={require('../images/Icon/airplane.png')} style={styles.airplaneImg} />
                    <TextInput
                        style={[styles.searchInput, from ? styles.selectedInput : null]} // Thay đổi kiểu dáng nếu có giá trị
                        placeholder="From"
                        placeholderTextColor="#9095a0"
                        value={from}
                        editable={false} // Disable editing directly
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSwap} style={styles.swapContainer}>
                    <View style={styles.swapBackground}>
                        <Icon name="swap-vertical" size={24} color="#000" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLocationPicker('to')} style={styles.searchInputContainer}>
                    <Image source={require('../images/Icon/arrivals.png')} style={styles.airplaneImg} />
                    <TextInput
                        style={[styles.searchInput, to ? styles.selectedInput : null]} // Thay đổi kiểu dáng nếu có giá trị
                        placeholder="To"
                        placeholderTextColor="#9095a0"
                        value={to}
                        editable={false} // Disable editing directly
                    />
                </TouchableOpacity>
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={openDatePicker} style={styles.dateItem}>
                        <Icon name="calendar" size={16} color="#9095a0" />
                        <Text style={styles.dateLabel}>{formatDate(departureDate)}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.travelerContainer} onPress={openTravelOptions}>
                    <View style={styles.travelerContent}>
                        <Icon name="person" size={16} color="#9095a0" style={styles.travelerIcon} />
                        <Text style={styles.travelerLabel}> {`Traveller: ${totalTravelers} Total`}</Text>
                        <Text style={styles.dotSeparator}> • </Text>
                        <Icon name="airplane" size={16} color="#9095a0" style={styles.travelerIcon} />
                        <Text style={styles.travelerLabel}>{travelerData.cabinClass}</Text>
                    </View>
                    <Icon name="chevron-down" size={16} color="#9095a0" style={{ position: 'absolute', right: 30 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search flights</Text>
                </TouchableOpacity>
            </ScrollView>

            <TravelOptions
                visible={isTravelOptionsVisible}
                onClose={closeTravelOptions}
                onSelect={handleTravelOptionsSelect}
                initialData={travelerData}
                tripType="one-way" // Specify trip type

            />
            <LocationPickerModal
                visible={isModalVisible}
                onClose={closeLocationPicker}
                onSelect={handleLocationSelect}
                title={`Where ${selectedInput === 'from' ? 'from?' : 'to?'}`}
                from={from}
                to={to}
                onSwap={handleSwap}
                selectedInput={selectedInput}
            />
            <DatePicker
                visible={datePickerVisible}
                onClose={() => setDatePickerVisible(false)}
                onSelect={handleDateSelect}
                departureDate={departureDate}
                tripType="one-way" // Specify trip type
            />
        </FlightSearching>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        padding: 16,
        paddingBottom: 80,
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
        color: '#000', // Màu chữ khi có giá trị
    },
    airplaneImg: {
        width: 20,
        height: 20,
        marginRight: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
        height: 54,
        width: '100%',
    },
    dateIcon: {
        marginRight: 8,
    },
    dateLabel: {
        fontSize: 16,
        color: '#9095a0',
        marginLeft: 10,
    },
    swapContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 32,
        left: '90%',
        marginLeft: -35,
        zIndex: 1,
    },
    swapBackground: {
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
    travelerContent: {
        position: 'absolute',
        left: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dotSeparator: {
        fontSize: 24,
        color: '#9095a0',
        marginHorizontal: 4,
        marginLeft: 6,
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
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 20,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default OneWaySearching;