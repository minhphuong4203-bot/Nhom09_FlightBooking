import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FlightSearching from './FlightSearching';

const OneWaySearching = ({ navigation, selectedTab }) => {
    if (selectedTab !== 'One-way') return null;

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleSwap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    const handleSearch = () => {
        console.log("Searching flights from:", from, "to:", to);
        // Optionally navigate to a results screen
        // navigation.navigate('SearchResults', { from, to });
    };

    return (
        <FlightSearching navigation={navigation} defaultTab={selectedTab}>
            <View style={styles.searchContainer}>
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

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search flights</Text>
                </TouchableOpacity>
            </View>
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
    airplaneImg: {
        width: 20,
        height: 20,
        marginLeft: 6,
        marginRight: 12,
    },
    swapContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    swapBackground: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        padding: 8,
        backgroundColor: '#f3f4f6',
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

export default OneWaySearching;