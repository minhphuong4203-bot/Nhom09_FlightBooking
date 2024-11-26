import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PaymentScreen = ({ navigation, route }) => {
    const { flightData, passengerInfo, selectedBaggage, selectedSeat } = route.params;
    const [paymentMethod, setPaymentMethod] = useState('MasterCard **** 9876');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Calculate total price based on services
        const seatPrice = selectedSeat?.price || 0;
        const baggagePrice = selectedBaggage?.price || 0;
        const basePrice = flightData?.price || 0;

        const total = (basePrice + seatPrice + baggagePrice) ;
        setTotalPrice(total);
    }, [flightData, selectedSeat, selectedBaggage, passengerInfo]);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleCheckout = () => {
        navigation.navigate('Summary', {
            flightData,
            passengerInfo,
            selectedBaggage,
            selectedSeat,
            paymentMethod,
            totalPrice,
        });
    };

    return (
      <View style={styles.container}>
          <Text style={styles.title}>Payment</Text>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment method</Text>
              <View style={styles.paymentMethodContainer}>
                  <Text style={styles.paymentMethod}>{paymentMethod}</Text>
                  <TouchableOpacity onPress={() => handlePaymentMethodChange('new card')}>
                      <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.addPaymentMethod}
                onPress={() => handlePaymentMethodChange('new card')}
              >
                  <Text style={styles.addPaymentMethodText}>+ New card</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Traveller details</Text>
              <View style={styles.travelerDetailsContainer}>
                  <Text style={styles.travelerName}>Pedro Moreno</Text>
                  <Text style={styles.travelerInfo}>Adult · Male</Text>
              </View>
          </View>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact details</Text>
              <View style={styles.contactDetailsContainer}>
                  <Text style={styles.contactDetail}>pedromareno@gmail.com</Text>
                  <Text style={styles.contactDetail}>(208) 567-8209</Text>
              </View>
          </View>
          <View style={styles.footer}>
              <View style={styles.priceBreakdown}>
                  <Text style={styles.totalText}>
                      ${totalPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.priceDetail}>
                      Flight: ${flightData?.price || 0}
                  </Text>
                  <Text style={styles.priceDetail}>
                      Seat: ${selectedSeat?.price || 0}
                  </Text>
                  <Text style={styles.priceDetail}>
                      Baggage: ${selectedBaggage?.price || 0}
                  </Text>
              </View>
              <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
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
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    paymentMethodContainer: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    paymentMethod: {
        fontSize: 14,
        color: '#333',
    },
    editText: {
        fontSize: 14,
        color: '#00b2b2',
    },
    addPaymentMethod: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 8,
    },
    addPaymentMethodText: {
        fontSize: 14,
        color: '#00b2b2',
    },
    travelerDetailsContainer: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    travelerName: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    travelerInfo: {
        fontSize: 14,
        color: '#666',
    },
    contactDetailsContainer: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    contactDetail: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    footer: {
        marginTop: 24,
    },
    priceBreakdown: {
        marginBottom: 16,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    priceDetail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    checkoutButton: {
        backgroundColor: '#00b2b2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PaymentScreen;
