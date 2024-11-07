import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LocationPickerModal = ({ visible, onClose, onSelect, locations, title, from, to, onSwap, selectedInput }) => {
    const renderLocationItem = ({ item }) => (
        <View>
            <TouchableOpacity style={styles.locationItem} onPress={() => onSelect(item.city)}>
                <Text style={styles.locationCity}>{item.city}</Text>
                <Text style={styles.locationDescription}>{item.description}</Text>
            </TouchableOpacity>
            {item.airports && (
                <FlatList
                    data={item.airports}
                    renderItem={({ item: airport }) => (
                        <TouchableOpacity
                            style={styles.airportItem}
                            onPress={() => onSelect(airport.code)}
                        >
                            <Text style={styles.airportName}>{airport.name}</Text>
                            <Text style={styles.airportCode}>{airport.code}</Text>
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
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{title}</Text>

                <View style={styles.fromToContainer}>
                    <TouchableOpacity style={styles.searchInputContainer} onPress={() => selectedInput === 'from' && null}>
                        <TextInput
                            style={styles.fromToInput}
                            placeholder="From"
                            value={from}
                            onChangeText={(text) => onSelect(text)}
                            autoFocus={selectedInput === 'from'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.swapContainer} onPress={onSwap}>
                        <Icon name="swap-vertical" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchInputContainer} onPress={() => selectedInput === 'to' && null}>
                        <TextInput
                            style={styles.fromToInput}
                            placeholder="To"
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
                <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
                    <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    fromToContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        height: 54,
        paddingHorizontal: 12,
        backgroundColor: '#f3f4f6',
        marginHorizontal: 5,
    },
    fromToInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    swapContainer: {
        padding: 10,
        backgroundColor: '#00bdd6',
        borderRadius: 25,
    },
    locationItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    locationCity: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    locationDescription: {
        fontSize: 14,
        color: '#555',
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
    },
    airportCode: {
        fontSize: 12,
        color: '#666',
    },
    modalCloseButton: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#00bdd6',
        borderRadius: 8,
        marginTop: 20,
    },
    modalCloseButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default LocationPickerModal;