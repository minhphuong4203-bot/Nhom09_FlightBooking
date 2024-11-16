import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const PassengerInformation = ({ navigation, route }) => {
    const { flightData } = route.params; // Dữ liệu chuyến bay từ FlightDetails
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleNext = () => {
        const passengerData = {
            firstName,
            lastName,
            gender,
            email,
            phone,
        };
        navigation.navigate('PaymentScreen', { flightData, passengerData });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Traveller information</Text>
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
                <Icon name="person-circle-outline" size={32} color="#00bdd6" />
                <Icon name="briefcase-outline" size={32} color="#ccc" />
                <Icon name="car-outline" size={32} color="#ccc" />
                <Icon name="card-outline" size={32} color="#ccc" />
            </View>

            {/* Traveller Info */}
            <Text style={styles.sectionTitle}>Traveller: 1 adult</Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="First name"
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    placeholder="Last name"
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select option" value="" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>
            </View>

            {/* Contact Details */}
            <Text style={styles.sectionTitle}>Contact details</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Your email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={styles.phoneInputContainer}>
                    <Text style={styles.phonePrefix}>+07</Text>
                    <TextInput
                        placeholder="Phone number"
                        style={styles.phoneInput}
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.totalPrice}>${flightData.totalPrice}</Text>
                    <Text style={styles.adultText}>1 adult</Text>
                </View>
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginRight: 32,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
    },
    phonePrefix: {
        marginRight: 8,
        fontSize: 16,
        color: '#666',
    },
    phoneInput: {
        flex: 1,
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    adultText: {
        fontSize: 14,
        color: '#666',
    },
    nextButton: {
        backgroundColor: '#00bdd6',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PassengerInformation;