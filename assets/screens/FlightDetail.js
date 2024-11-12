import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FlightDetails = ({ navigation, route }) => {
    const { flightData } = route.params;

    const handleSelect = () => {
        navigation.navigate('PassengerInformation', { flightData });
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Flight details</Text>
                <View style={styles.headerIcons}>
                    <Icon name="heart-outline" size={24} color="#000" style={styles.iconSpacing} />
                    <Icon name="share-outline" size={24} color="#000" />
                </View>
            </View>

            {/* Trip Info */}
            <View style={styles.tripInfo}>
                <Text style={styles.tripTitle}>Your trip to {flightData.trip.destination}</Text>
                <Text style={styles.tripSubtitle}>from {flightData.trip.origin}</Text>
                <Text style={styles.dateText}>{flightData.trip.dates}</Text>
                <Text style={styles.detailsText}>{flightData.trip.travellers}</Text>
            </View>

            {/* Flight Details */}
            {flightData.flights.map((flight, index) => (
                <View key={index} style={styles.flightCard}>
                    <View style={styles.flightSegment}>
                        <Text style={styles.segmentTitle}>{flight.segment}</Text>
                        <Text style={styles.airlineInfo}>{flight.airline}</Text>
                        <Text style={styles.timeText}>{flight.time}</Text>
                        <Text style={styles.stopText}>{flight.stops}</Text>
                        {flight.details.map((detail, idx) => (
                            <Text key={idx} style={styles.infoText}>{detail}</Text>
                        ))}
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.moreInfoText}>More info</Text>
                    </TouchableOpacity>
                </View>
            ))}

            {/* Included Baggage */}
            <View style={styles.baggageSection}>
                <Text style={styles.sectionTitle}>Included baggage</Text>
                <Text style={styles.infoText}>{flightData.baggage.included}</Text>
                <Text style={styles.includedText}>Included</Text>
            </View>

            {/* Extra Baggage */}
            <View style={styles.baggageSection}>
                <Text style={styles.sectionTitle}>Extra baggage</Text>
                {flightData.baggage.extra.map((item, idx) => (
                    <Text key={idx} style={styles.extraBaggageText}>
                        {item.type} - {item.price}
                    </Text>
                ))}
            </View>

            {/* Total Price and Select Button */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.totalPrice}>${flightData.totalPrice}</Text>
                    <Text style={styles.totalPriceText}>Total price</Text>
                </View>
                <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
                    <Text style={styles.selectText}>Select</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconSpacing: {
        marginRight: 16,
    },
    tripInfo: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tripTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tripSubtitle: {
        fontSize: 16,
        color: '#666',
        marginVertical: 4,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    detailsText: {
        fontSize: 14,
        color: '#666',
    },
    flightCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    flightSegment: {
        marginBottom: 8,
    },
    segmentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    airlineInfo: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 4,
    },
    stopText: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    infoText: {
        fontSize: 12,
        color: '#999',
        marginVertical: 2,
    },
    moreInfoText: {
        color: '#00bdd6',
        fontSize: 14,
        fontWeight: 'bold',
    },
    baggageSection: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    includedText: {
        fontSize: 14,
        color: '#00bdd6',
    },
    extraBaggageText: {
        fontSize: 14,
        color: '#333',
        marginVertical: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalPriceText: {
        fontSize: 14,
        color: '#666',
    },
    selectButton: {
        backgroundColor: '#00bdd6',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    selectText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FlightDetails;
