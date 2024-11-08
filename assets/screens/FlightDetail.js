import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FlightDetails = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Flight details</Text>
                <Icon name="heart-outline" size={24} color="#000" />
                <Icon name="share-outline" size={24} color="#000" />
            </View>

            {/* Trip Info */}
            <View style={styles.tripInfo}>
                <Text style={styles.tripTitle}>Your trip to New York</Text>
                <Text style={styles.tripSubtitle}>from London</Text>
                <Text style={styles.dateText}>Fri, Jul 14 - Sun, Jul 17</Text>
                <Text style={styles.detailsText}>1 traveller • Economy • Round-trip</Text>
            </View>

            {/* Flight Details Card */}
            <View style={styles.flightCard}>
                <View style={styles.flightSegment}>
                    <Text style={styles.segmentTitle}>London - New York City</Text>
                    <Text style={styles.airlineInfo}>SkyHaven FD695</Text>
                    <Text style={styles.timeText}>6:30 AM - 2:00 PM</Text>
                    <Text style={styles.stopText}>1 stop • 7h 30m</Text>
                    <Text style={styles.infoText}>28" seat pitch, Light meal</Text>
                    <Text style={styles.infoText}>Chance of Wifi, No power outlet</Text>
                    <Text style={styles.infoText}>No entertainment</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.moreInfoText}>More info</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.flightCard}>
                <View style={styles.flightSegment}>
                    <Text style={styles.segmentTitle}>New York City - London</Text>
                    <Text style={styles.airlineInfo}>EcoWings FD695</Text>
                    <Text style={styles.timeText}>10:00 PM - 10:15 AM</Text>
                    <Text style={styles.stopText}>Direct • 9h 30m</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.moreInfoText}>More info</Text>
                </TouchableOpacity>
            </View>

            {/* Included Baggage */}
            <View style={styles.baggageSection}>
                <Text style={styles.sectionTitle}>Included baggage</Text>
                <Text style={styles.infoText}>1 personal item - Must go under the seat in front of you</Text>
                <Text style={styles.includedText}>Included</Text>
            </View>

            {/* Extra Baggage */}
            <View style={styles.baggageSection}>
                <Text style={styles.sectionTitle}>Extra baggage</Text>
                <Text style={styles.extraBaggageText}>Carry-on - From $11.99</Text>
                <Text style={styles.extraBaggageText}>Checked bag - From $19.99</Text>
            </View>

            {/* Total Price and Select Button */}
            <View style={styles.footer}>
                <Text style={styles.totalPrice}>$806</Text>
                <Text style={styles.totalPriceText}>Total price</Text>
                <TouchableOpacity style={styles.selectButton}>
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
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 4,
    },
    stopText: {
        fontSize: 14,
        color: '#666',
    },
    infoText: {
        fontSize: 12,
        color: '#999',
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
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    selectText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FlightDetails;
