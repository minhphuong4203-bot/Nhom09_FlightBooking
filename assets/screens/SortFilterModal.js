import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';

import { Checkbox } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

const airlinesList = ['SkyHaven', 'EcoWings', 'CC Air', 'Fendi Air']; // Sample airlines

const SortFilterModal = ({ visible, onClose, onApply }) => {
    const [sortOption, setSortOption] = useState('Best');
    const [stopOption, setStopOption] = useState('Any stops');
    const [selectedAirlines, setSelectedAirlines] = useState(new Set());

    const toggleAirlineSelection = (airline) => {
        setSelectedAirlines((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(airline)) {
                newSelected.delete(airline);
            } else {
                newSelected.add(airline);
            }
            return newSelected;
        });
    };

    const handleClearAll = () => {
        setSortOption('Best');
        setStopOption('Any stops');
        setSelectedAirlines(new Set());
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    {/* Sort By */}
                    <Text style={styles.sectionTitle}>Sort by</Text>
                    <TouchableOpacity style={styles.option} onPress={() => setSortOption('Best')}>
                        <Text style={styles.optionText}>Best</Text>
                        {sortOption === 'Best' && <Icon name="checkmark" size={16} color="#6200ee" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => setSortOption('Cheapest')}>
                        <Text style={styles.optionText}>Cheapest</Text>
                        {sortOption === 'Cheapest' && <Icon name="checkmark" size={16} color="#6200ee" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => setSortOption('Fastest')}>
                        <Text style={styles.optionText}>Fastest</Text>
                        {sortOption === 'Fastest' && <Icon name="checkmark" size={16} color="#6200ee" />}
                    </TouchableOpacity>

                    {/* Stops */}
                    <Text style={styles.sectionTitle}>Stops</Text>
                    <TouchableOpacity style={styles.option} onPress={() => setStopOption('Any stops')}>
                        <Text style={styles.optionText}>Any stops</Text>
                        {stopOption === 'Any stops' && <Icon name="checkmark" size={16} color="#6200ee" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => setStopOption('1 stop or nonstop')}>
                        <Text style={styles.optionText}>1 stop or nonstop</Text>
                        {stopOption === '1 stop or nonstop' && <Icon name="checkmark" size={16} color="#6200ee" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => setStopOption('Nonstop only')}>
                        <Text style={styles.optionText}>Nonstop only</Text>
                        {stopOption === 'Nonstop only' && <Icon name="checkmark" size={16} color="#6200ee" />}
                    </TouchableOpacity>

                    {/* Airlines */}
                    <Text style={styles.sectionTitle}>Airlines</Text>
                    {airlinesList.map((airline) => (
                        <TouchableOpacity
                            key={airline}
                            style={styles.option}
                            onPress={() => toggleAirlineSelection(airline)}
                        >
                            <Text style={styles.optionText}>{airline}</Text>
                            <Checkbox
                                status={selectedAirlines.has(airline) ? 'checked' : 'unchecked'}
                                // onPress={() => toggleAirlineSelection(airline)}
                            />
                            {/* {selectedAirlines.has(airline) && <Icon name="checkmark" size={16} color="#6200ee" />} */}

                        </TouchableOpacity>
                    ))}

                    {/* Clear All and Apply Buttons */}
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
                            <Text style={styles.clearText}>Clear all</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onApply({ sortOption, stopOption, selectedAirlines })} style={styles.applyButton}>
                            <Text style={styles.applyText}>Show Results</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    optionText: {
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    clearButton: {
        padding: 10,
    },
    clearText: {
        color: '#6200ee',
        fontSize: 16,
    },
    applyButton: {
        backgroundColor: '#00bdd6',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    applyText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SortFilterModal;
