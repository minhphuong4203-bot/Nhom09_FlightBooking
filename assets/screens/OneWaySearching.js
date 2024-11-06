import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FlightSearching from './FlightSearching';

const OneWaySearching = ({ navigation }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleSwap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    const handleSearch = () => {
        // Logic kiểm tra và điều hướng khi nhấn nút tìm kiếm
        if (from && to) {
            navigation.navigate('SearchResults', { from, to });
        } else {
            alert("Please fill in both 'From' and 'To' fields.");
        }
    };

    return (
        <FlightSearching navigation={navigation} defaultTab="One-way">
            <ScrollView style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Image source={require('../images/Icon/airplane.png')} style={styles.airplaneImg} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="From"
                        placeholderTextColor="#9095a0"
                        value={from}
                        onChangeText={setFrom}
                    />
                </View>
                {/* Swap Icon with Background */}
                <TouchableOpacity onPress={handleSwap} style={styles.swapContainer}>
                    <View style={styles.swapBackground}>
                        <Icon name="swap-vertical" size={24} color="#000" />
                    </View>
                </TouchableOpacity>
                <View style={styles.searchInputContainer}>
                    <Image source={require('../images/Icon/arrivals.png')} style={styles.airplaneImg} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="To"
                        placeholderTextColor="#9095a0"
                        value={to}
                        onChangeText={setTo}
                    />
                </View>
                <View style={styles.dateContainer}>
                    <View style={styles.dateItem}>
                        <Icon name="calendar" size={16} color="#9095a0" style={styles.dateIcon} />
                        <Text style={styles.dateLabel}>Select Date</Text>
                    </View>
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

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search flights</Text>
                </TouchableOpacity>
            </ScrollView>
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
    },
    swapContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 32, // Điều chỉnh vị trí
        left: '90%', // Điều chỉnh vị trí
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