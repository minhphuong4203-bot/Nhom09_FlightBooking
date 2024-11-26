import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const BookingCompleted = ({ route }) => {
    const navigation = useNavigation();
    const { flightData, passengerInfo, selectedSeat, selectedBaggage } = route.params;
    const [bookingDetails, setBookingDetails] = React.useState(null);

    console.log('flightData', flightData);
    console.log('route.params', route.params);

    const saveBookingToFirestore = useCallback(async () => {
        try {
            const bookingRef = firestore().collection('bookedTicket').doc();
            const bookingId = bookingRef.id;

            const bookingData = {
                bookingId,
                timestamp: firestore.FieldValue.serverTimestamp(),
                flightDetails: { ...flightData },
                passengerDetails: { ...passengerInfo },
                seatDetails: { ...selectedSeat },
                Baggage: { ...selectedBaggage },
                status: 'confirmed',
            };

            console.log('bookingData', bookingData);

            await bookingRef.set(bookingData);
            setBookingDetails(bookingData);
        } catch (error) {
            console.error('Error saving booking:', error);
            Alert.alert(
              'Error',
              'There was an error saving your booking. Please contact support.',
              [{ text: 'OK' }]
            );
        }
    }, [flightData, passengerInfo, selectedSeat, selectedBaggage]);

    useEffect(() => {
        saveBookingToFirestore();
    }, [saveBookingToFirestore]);

    const createPDF = async () => {
        try {
            const htmlContent = `
                <h1 style="text-align: center; color: #4CAF50;">Booking Confirmed</h1>
                <h3>Booking Reference: ${bookingDetails.bookingId}</h3>
                <p>Date: ${new Date().toLocaleDateString()}</p>
                <h3>Flight Details</h3>
                <p>${flightData.departureCode} → ${flightData.destinationCode}</p>
                <p>Date: ${flightData.date}</p>
                <p>Time: ${flightData.departureTime} - ${flightData.arrivalTime}</p>
                <p>Airline: ${flightData.airline}</p>
                <h3>Passenger Information</h3>
                <p>Name: ${passengerInfo.lastName} ${passengerInfo.firstName}</p>
                <p>Email: ${passengerInfo.email}</p>
                <p>Phone: ${passengerInfo.phone}</p>
                <h3>Seat Details</h3>
                <p>Seat: ${selectedSeat.number} (${selectedSeat.seatClass})</p>
                <h3>Baggage</h3>
                <p>${selectedBaggage.weight}kg - ${selectedBaggage.description}</p>
                <h3>Total Price</h3>
                <p>$${flightData.price + selectedSeat.price}</p>
            `;

            const options = {
                html: htmlContent,
                fileName: `Booking_${bookingDetails.bookingId}`,
                directory: 'Documents',
            };

            const file = await RNHTMLtoPDF.convert(options);
            Alert.alert('PDF Created', `File saved to: ${file.filePath}`);
        } catch (error) {
            console.error('Error creating PDF:', error);
            Alert.alert('Error', 'Failed to generate PDF. Please try again.');
        }
    };

    const handleBackToHome = () => {
        navigation.navigate('StartScreen');
    };

    return (
      <View style={styles.container}>
          <View style={styles.content}>
              <View style={styles.iconContainer}>
                  <Icon name="checkmark-circle" size={100} color="#4CAF50" />
              </View>

              <Text style={styles.title}>Booking Confirmed!</Text>
              <Text style={styles.message}>
                  Your flight booking has been successfully completed.
              </Text>

              {bookingDetails && (
                <View style={styles.bookingInfo}>
                    <Text style={styles.bookingId}>
                        Booking Reference: {bookingDetails.bookingId}
                    </Text>
                    <Text style={styles.bookingDate}>
                        Date: {new Date().toLocaleDateString()}
                    </Text>
                </View>
              )}

              <View style={styles.detailsContainer}>
                  <Text style={styles.detailTitle}>Flight Details:</Text>
                  <Text style={styles.detailText}>
                      {flightData.departureCode} → {flightData.destinationCode}
                  </Text>
                  <Text style={styles.detailText}>
                      Date: {flightData.date}
                  </Text>
                  <Text style={styles.detailText}>
                      Time: {flightData.departureTime} - {flightData.arrivalTime}
                  </Text>
                  <Text style={styles.detailText}>
                      Seat: {selectedSeat.number} ({selectedSeat.seatClass})
                  </Text>
                  <Text style={styles.detailText}>
                      Baggage: ${selectedBaggage.weight}kg - ${selectedBaggage.description}
                  </Text>
                  <Text style={styles.detailText}>
                      Passenger: {passengerInfo.lastName + '+ ' + passengerInfo.firstName}
                  </Text>
                  <Text style={styles.detailText}>
                      Total Price: ${flightData.price + selectedSeat.price}
                  </Text>
              </View>

              <TouchableOpacity
                style={styles.viewBookingButton}
                onPress={createPDF}
              >
                  <Text style={styles.buttonText}>Print Ticket</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.homeButton}
                onPress={handleBackToHome}
              >
                  <Text style={styles.homeButtonText}>Back to Home</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    bookingInfo: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
    },
    bookingId: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bookingDate: {
        fontSize: 16,
        color: '#666',
    },
    viewBookingButton: {
        backgroundColor: '#00b2b2',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '100%',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    homeButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '100%',
        borderWidth: 1,
        borderColor: '#00b2b2',
    },
    homeButtonText: {
        color: '#00b2b2',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    detailsContainer: {
        width: '100%',
        marginBottom: 30,
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
});

export default BookingCompleted;
