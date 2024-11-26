import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FlightDetailScreen = ({ navigation, route }) => {
    const { flightData } = route.params;

    const handleContinue = () => {
        navigation.navigate('PassengerInformation', { flightData });
    };

    return (
      <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Flight Details</Text>
          </View>

          {/* Flight Card */}
          <View style={styles.flightCard}>
              <View style={styles.airlineInfo}>
                  <Image
                    source={{ uri: flightData.airlineIcon }}
                    style={styles.airlineIcon}
                  />
                  <Text style={styles.airlineName}>{flightData.airline}</Text>
              </View>

              <View style={styles.routeContainer}>
                  <View style={styles.locationInfo}>
                      <Text style={styles.cityCode}>{flightData.origin}</Text>
                      <Text style={styles.time}>{flightData.departureTime}</Text>
                  </View>

                  <View style={styles.flightPath}>
                      <View style={styles.dottedLine} />
                      <Icon name="airplane" size={24} color="#00b2b2" />
                      <View style={styles.dottedLine} />
                  </View>

                  <View style={styles.locationInfo}>
                      <Text style={styles.cityCode}>{flightData.destination}</Text>
                      <Text style={styles.time}>{flightData.arrivalTime}</Text>
                  </View>
              </View>

              <View style={styles.flightDetails}>
                  <View style={styles.detailItem}>
                      <Icon name="calendar-outline" size={20} color="#666" />
                      <Text style={styles.detailText}>{flightData.date}</Text>
                  </View>
                  <View style={styles.detailItem}>
                      <Icon name="time-outline" size={20} color="#666" />
                      <Text style={styles.detailText}>{flightData.duration}</Text>
                  </View>
                  <View style={styles.detailItem}>
                      <Icon name="briefcase-outline" size={20} color="#666" />
                      <Text style={styles.detailText}>20kg baggage</Text>
                  </View>
              </View>
          </View>

          {/* Price Breakdown */}
          <View style={styles.priceSection}>
              <Text style={styles.sectionTitle}>Price Details</Text>
              <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Base Fare</Text>
                  <Text style={styles.priceValue}>${flightData.baseFare}</Text>
              </View>
              <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Taxes & Fees</Text>
                  <Text style={styles.priceValue}>${flightData.taxes}</Text>
              </View>
              <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>${flightData.totalPrice}</Text>
              </View>
          </View>

          {/* Flight Policies */}
          <View style={styles.policySection}>
              <Text style={styles.sectionTitle}>Flight Policies</Text>
              <View style={styles.policyItem}>
                  <Icon name="refresh-outline" size={20} color="#666" />
                  <Text style={styles.policyText}>Free cancellation within 24 hours</Text>
              </View>
              <View style={styles.policyItem}>
                  <Icon name="calendar-outline" size={20} color="#666" />
                  <Text style={styles.policyText}>Date change fees apply</Text>
              </View>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue Booking</Text>
              <Icon name="arrow-forward" size={24} color="#fff" />
          </TouchableOpacity>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
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
    flightCard: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    airlineInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    airlineIcon: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    airlineName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    routeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationInfo: {
        alignItems: 'center',
    },
    cityCode: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    time: {
        fontSize: 16,
        color: '#666',
    },
    flightPath: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    dottedLine: {
        flex: 1,
        height: 1,
        borderStyle: 'dotted',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    flightDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        marginLeft: 8,
        color: '#666',
    },
    priceSection: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    priceLabel: {
        color: '#666',
    },
    priceValue: {
        fontWeight: '500',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
        marginTop: 12,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00b2b2',
    },
    policySection: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 12,
    },
    policyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    policyText: {
        marginLeft: 12,
        color: '#666',
    },
    continueButton: {
        flexDirection: 'row',
        backgroundColor: '#00b2b2',
        margin: 16,
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

export default FlightDetailScreen;
