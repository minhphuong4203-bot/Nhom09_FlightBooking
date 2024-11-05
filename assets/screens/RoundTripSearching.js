import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image,Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FlightSearching from './FlightSearching';

const RoundTripSearching = ({ navigation, route }) => {
    const { selectedTab } = route.params; // Get selected tab from params

    return (
        <FlightSearching navigation={navigation} defaultTab={selectedTab}>
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Image source={require('../images/Icon/airplane.png')} style={styles.airplaneImg} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="From"
                        placeholderTextColor="#9095a0"
                    />
                </View>
                <View style={styles.searchInputContainer}>
                    <Image source={require('../images/Icon/arrivals.png')} style={styles.airplaneImg} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="To"
                        placeholderTextColor="#9095a0"
                    />
                </View>
                <View style={styles.dateContainer}>
                    <View style={styles.dateItem}>
                        <Icon name="calendar" size={16} color="#9095a0" style={styles.dateIcon} />
                        <Text style={styles.dateLabel}>Fri, Jul 14</Text>
                    </View>
                    <View style={styles.dateItem}>
                        <Icon name="calendar" size={16} color="#9095a0" style={styles.dateIcon} />
                        <Text style={styles.dateLabel}>Fri, Jul 14</Text>
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
            </View>

            <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search flights</Text>
            </TouchableOpacity>
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
        color: '#9095a0',
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