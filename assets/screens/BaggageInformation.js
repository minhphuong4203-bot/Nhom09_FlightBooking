import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BaggageInformationScreen = ({ navigation, route }) => {
    const { flightData, passengerInfo } = route.params;
    const [selectedBaggage, setSelectedBaggage] = useState(null);

    const baggageOptions = [
        { id: 1, weight: '20kg', price: 30, description: 'Standard Checked Baggage' },
        { id: 2, weight: '25kg', price: 45, description: 'Extra Checked Baggage' },
        { id: 3, weight: '30kg', price: 60, description: 'Premium Checked Baggage' },
    ];

    const handleContinue = () => {
        navigation.navigate('SeatInformation', {
            flightData,
            passengerInfo,
            selectedBaggage
        });
    };

    return (
      <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Baggage Selection</Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
              <Icon name="person-circle-outline" size={32} color="#ccc" />
              <Icon name="briefcase-outline" size={32} color="#00bdd6" />
              <Icon name="car-outline" size={32} color="#ccc" />
              <Icon name="card-outline" size={32} color="#ccc" />
          </View>

          <View style={styles.baggageContainer}>
              <Text style={styles.sectionTitle}>Choose Your Baggage Allowance</Text>

              {baggageOptions.map((baggage) => (
                <TouchableOpacity
                  key={baggage.id}
                  style={[
                      styles.baggageOption,
                      selectedBaggage?.id === baggage.id && styles.selectedBaggage
                  ]}
                  onPress={() => setSelectedBaggage(baggage)}
                >
                    <View style={styles.baggageInfo}>
                        <Text style={styles.weightText}>{baggage.weight}</Text>
                        <Text style={styles.descriptionText}>{baggage.description}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>${baggage.price}</Text>
                        {selectedBaggage?.id === baggage.id && (
                          <Icon name="checkmark-circle" size={24} color="#00b2b2" />
                        )}
                    </View>
                </TouchableOpacity>
              ))}

              <View style={styles.infoBox}>
                  <Icon name="information-circle-outline" size={24} color="#666" />
                  <Text style={styles.infoText}>
                      All passengers are entitled to one piece of hand luggage (7kg max) free of charge
                  </Text>
              </View>
          </View>

          <TouchableOpacity
            style={[
                styles.continueButton,
                !selectedBaggage && styles.disabledButton
            ]}
            onPress={handleContinue}
            disabled={!selectedBaggage}
          >
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
    baggageContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    baggageOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 15,
    },
    selectedBaggage: {
        borderColor: '#00b2b2',
        backgroundColor: '#f0ffff',
    },
    baggageInfo: {
        flex: 1,
    },
    weightText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00b2b2',
        marginRight: 10,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
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
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default BaggageInformationScreen;
