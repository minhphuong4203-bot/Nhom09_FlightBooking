import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const BaggageScreen = ({ navigation, route }) => {
    const { passengerInformation } = route.params;
    const [selectedBaggage, setSelectedBaggage] = useState('cabin');
    const [checkedBag, setCheckedBag] = useState(false);
    const [travelProtection, setTravelProtection] = useState(false);

    const handleBaggageSelection = (type) => setSelectedBaggage(type);

    const handleCheckedBagSelection = () => setCheckedBag(!checkedBag);

    const handleTravelProtectionSelection = () => setTravelProtection(!travelProtection);

    const handleNextStep = () => {
        navigation.navigate('Summary', {
            passengerInformation, selectedBaggage, checkedBag, travelProtection
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Baggage</Text>

            {/* Cabin Bags Section */}
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Cabin bags</Text>
                <TouchableOpacity
                    style={[styles.optionButton, selectedBaggage === 'cabin' && styles.selectedOption]}
                    onPress={() => handleBaggageSelection('cabin')}
                >
                    <Text style={styles.optionText}>Personal item only</Text>
                </TouchableOpacity>
            </View>

            {/* Checked Bags Section */}
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Checked bags</Text>
                <TouchableOpacity
                    style={[styles.optionButton, selectedBaggage === 'checked' && styles.selectedOption]}
                    onPress={() => handleBaggageSelection('checked')}
                >
                    <Text style={styles.optionText}>1 checked bag (Max weight 22.1 lbs) from $19.99</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionButton, selectedBaggage === 'no-checked' && styles.selectedOption]}
                    onPress={() => handleBaggageSelection('no-checked')}
                >
                    <Text style={styles.optionText}>No checked bag $00.00</Text>
                </TouchableOpacity>
            </View>

            {/* Travel Protection Section */}
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Travel protection</Text>
                <TouchableOpacity
                    style={[styles.optionButton, travelProtection && styles.selectedOption]}
                    onPress={handleTravelProtectionSelection}
                >
                    <Text style={styles.optionText}>1 checked bag (Max weight 22.1 lbs) from $19.99</Text>
                </TouchableOpacity>
                <View style={styles.extraOptions}>
                    <Text style={styles.extraOptionText}>Laboris exercitation Lorem anim pariatur</Text>
                    <Text style={styles.extraOptionText}>Duis aute irure dolor in reprehenderit in voluptate</Text>
                    <Text style={styles.extraOptionText}>Incididunt amet cupidatat elit enim amet labore</Text>
                    <Text style={styles.extraOptionText}>Magna eu mollit veniam ipsum in dolore anim</Text>
                </View>
                <TouchableOpacity
                    style={[styles.optionButton, !travelProtection && styles.selectedOption]}
                    onPress={handleTravelProtectionSelection}
                >
                    <Text style={styles.optionText}>No insurance $00.00</Text>
                </TouchableOpacity>
            </View>

            {/* Next Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    optionContainer: {
        marginBottom: 24,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
    },
    optionButton: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
    },
    selectedOption: {
        backgroundColor: '#00bdd6',
    },
    optionText: {
        fontSize: 14,
        color: '#333',
    },
    extraOptions: {
        marginTop: 10,
    },
    extraOptionText: {
        fontSize: 12,
        color: '#666',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 16,
    },
    nextButton: {
        backgroundColor: '#00bdd6',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    nextButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default BaggageScreen;