import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BaggageScreen = ({ navigation, route }) => {
    const { passengerInformation } = route.params;
    const [selectedBaggage, setSelectedBaggage] = useState('cabin');
    const [checkedBag, setCheckedBag] = useState(false);
    const [travelProtection, setTravelProtection] = useState(false);

    const handleBaggageSelection = (type) => {
        setSelectedBaggage(type);
    };

    const handleCheckedBagSelection = () => {
        setCheckedBag(!checkedBag);
    };

    const handleTravelProtectionSelection = () => {
        setTravelProtection(!travelProtection);
    };

    const handleNextStep = () => {
        navigation.navigate('Summary', {
            passengerInformation,
            selectedBaggage,
            checkedBag,
            travelProtection,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Baggage</Text>
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Cabin bags</Text>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        selectedBaggage === 'cabin' && styles.selectedOption,
                    ]}
                    onPress={() => handleBaggageSelection('cabin')}
                >
                    <Text style={styles.optionText}>Personal item only</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Checked bags</Text>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        selectedBaggage === 'checked' && styles.selectedOption,
                    ]}
                    onPress={() => handleBaggageSelection('checked')}
                >
                    <Text style={styles.optionText}>1 checked bag (Max weight 22.1 lbs) from $19.99</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        selectedBaggage === 'no-checked' && styles.selectedOption,
                    ]}
                    onPress={() => handleBaggageSelection('no-checked')}
                >
                    <Text style={styles.optionText}>No checked bag $00.00</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Travel protection</Text>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        travelProtection && styles.selectedOption,
                    ]}
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
                    style={[
                        styles.optionButton,
                        !travelProtection && styles.selectedOption,
                    ]}
                    onPress={handleTravelProtectionSelection}
                >
                    <Text style={styles.optionText}>No insurance $00.00</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalText}>${806} 1 adult</Text>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    optionContainer: {
        marginBottom: 24,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    optionButton: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 8,
    },
    selectedOption: {
        backgroundColor: '#00b2b2',
    },
    optionText: {
        fontSize: 14,
        color: '#333',
    },
    extraOptions: {
        marginVertical: 12,
    },
    extraOptionText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#00b2b2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    nextButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default BaggageScreen;