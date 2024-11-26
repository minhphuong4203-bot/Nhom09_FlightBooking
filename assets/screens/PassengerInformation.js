import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PassengerInformationScreen = ({ navigation, route }) => {
    const { flightData } = route.params;
    const [passengerInfo, setPassengerInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        nationality: '',
        passportNumber: ''
    });

    const handleContinue = () => {
        navigation.navigate('BaggageInformation', {
            flightData,
            passengerInfo
        });
    };

    return (
      <ScrollView style={styles.container}>
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

          <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    value={passengerInfo.firstName}
                    onChangeText={(text) => setPassengerInfo({...passengerInfo, firstName: text})}
                    placeholder="Enter first name"
                  />
              </View>

              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    value={passengerInfo.lastName}
                    onChangeText={(text) => setPassengerInfo({...passengerInfo, lastName: text})}
                    placeholder="Enter last name"
                  />
              </View>

              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={passengerInfo.email}
                    onChangeText={(text) => setPassengerInfo({...passengerInfo, email: text})}
                    placeholder="Enter email"
                    keyboardType="email-address"
                  />
              </View>

              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone</Text>
                  <TextInput
                    style={styles.input}
                    value={passengerInfo.phone}
                    onChangeText={(text) => setPassengerInfo({...passengerInfo, phone: text})}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                  />
              </View>

              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <TextInput
                    style={styles.input}
                    value={passengerInfo.dateOfBirth}
                    onChangeText={(text) => setPassengerInfo({...passengerInfo, dateOfBirth: text})}
                    placeholder="YYYY-MM-DD"
                  />
              </View>

              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nationality</Text>
                  <TextInput
                    style={styles.input}
                    value={passengerInfo.nationality}
                    onChangeText={(text) => setPassengerInfo({...passengerInfo, nationality: text})}
                    placeholder="Enter nationality"
                  />
              </View>

              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Passport Number</Text>
                  <TextInput
                    style={styles.input}
                    value={passengerInfo.passportNumber}
                    onChangeText={(text) => setPassengerInfo({...passengerInfo, passportNumber: text})}
                    placeholder="Enter passport number"
                  />
              </View>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
              <Icon name="arrow-forward" size={24} color="#fff" />
          </TouchableOpacity>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    formContainer: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    continueButton: {
        flexDirection: 'row',
        backgroundColor: '#00b2b2',
        margin: 20,
        padding: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default PassengerInformationScreen;
