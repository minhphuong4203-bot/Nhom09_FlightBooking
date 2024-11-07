import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LocationPickerModal = ({ visible, onClose, onSelect, locations, title, from, to, onSwap, selectedInput }) => {
    const [expandedLocations, setExpandedLocations] = useState([]);

    const toggleLocationExpansion = (locationId) => {
        if (expandedLocations.includes(locationId)) {
            setExpandedLocations(expandedLocations.filter((id) => id !== locationId));
        } else {
            setExpandedLocations([...expandedLocations, locationId]);
        }
    };

    const renderLocationItem = ({ item }) => (
        <View>
            <TouchableOpacity style={styles.locationItem} onPress={() => toggleLocationExpansion(item.id)}>
                <Image source={require('../images/Icon/location.png')} style={styles.locationIcon} />
                <View>
                    <Text style={styles.locationCity}>{item.city}</Text>
                    <Text style={styles.locationDescription}>{item.description}</Text>
                </View>
                <Icon name={expandedLocations.includes(item.id) ? 'chevron-up' : 'chevron-down'} size={20} color="#000" style={{ position: 'absolute', right: 0 }} />
            </TouchableOpacity>
            {expandedLocations.includes(item.id) && item.airports && (
                <FlatList
                    data={item.airports}
                    renderItem={({ item: airport }) => (
                        <TouchableOpacity
                            style={styles.airportItem}
                            onPress={() => onSelect(airport.code)}
                        >

                        <View style={{flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}}>
                            <Icon name="airplane" size={20} color="#000" />
                            <View style={{marginLeft:-50}}>
                            <Text style={styles.airportName}>{airport.name}</Text>
                            <Text style={styles.airportDistance}>{airport.distance}</Text>
                            </View>
                            <Text style={styles.airportCode}>{airport.code}</Text>
                        </View>

                        </TouchableOpacity>
                    )}
                    keyExtractor={(airport) => airport.code}
                />
            )}
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.modalBackground}>
                <View style={styles.subModalContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Icon name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.fromToContainer}>
                        <TouchableOpacity style={styles.searchInputContainer} onPress={() => selectedInput === 'from' && null}>
                            <Image source={require('../images/Icon/airplane.png')} style={styles.airplaneImg} />
                            <TextInput
                                style={styles.fromToInput}
                                placeholder="From"
                                placeholderTextColor="#9095a0"
                                value={from}
                                onChangeText={(text) => onSelect(text)}
                                autoFocus={selectedInput === 'from'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.swapContainer} onPress={onSwap}>
                            <Icon name="swap-vertical" size={24} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.searchInputContainer} onPress={() => selectedInput === 'to' && null}>
                            <Image source={require('../images/Icon/arrivals.png')} style={styles.airplaneImg} />
                            <TextInput
                                style={styles.fromToInput}
                                placeholder="To"
                                placeholderTextColor="#9095a0"
                                value={to}
                                onChangeText={(text) => onSelect(text)}
                                autoFocus={selectedInput === 'to'}
                            />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={locations}
                        renderItem={renderLocationItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subModalContainer: {
        width: '100%', // Full width of the screen
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 30, // Margin from the top
        padding: 20,
        flex: 1, // Allow the modal to fill the available space
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
        marginBottom: 40,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        position: 'absolute',
        left: '36%',
    },
    closeBtn: {
        position: 'absolute',
        right: 0,
    },
    fromToContainer: {
        marginBottom: 20,
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
        marginBottom: 2, // Space between inputs
    },
    fromToInput: {
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
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 30,
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
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    locationIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
    },
    locationCity: {
        fontSize: 16,
        fontWeight: '700',
    },
    locationDescription: {
        fontSize: 14,
        color: '#a8acb5',

    },
    airportItem: {
        paddingLeft: 20,
        paddingVertical: 8,
        backgroundColor: '#f7f7f7',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    airportName: {
        fontSize: 14,
        color: '#333',
        fontWeight:'700'
    },
    airportDistance:{
        fontSize: 14,
        color: '#a8acb5',

    },
    airportCode: {
        fontSize: 16,
        color: '#000',
        fontWeight: '700',
    },
});

export default LocationPickerModal;