import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PaymentScreen = ({ navigation, route }) => {
    const { passengerInformation, selectedBaggage, checkedBag, travelProtection, selectedSeat } = route.params;
    const [paymentMethod, setPaymentMethod] = useState('MasterCard **** 9876');

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleCheckout = () => {
        navigation.navigate('Summary', {
            passengerInformation,
            selectedBaggage,
            checkedBag,
            travelProtection,
            selectedSeat,
            paymentMethod,
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
                <Text style={styles.totalText}>${811.56} 1 adult</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#00b2b2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    checkoutButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PaymentScreen;import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PaymentScreen = ({ navigation, route }) => {
    const { passengerInformation, selectedBaggage, checkedBag, travelProtection, selectedSeat } = route.params;
    const [paymentMethod, setPaymentMethod] = useState('MasterCard **** 9876');

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleCheckout = () => {
        navigation.navigate('Summary', {
            passengerInformation,
            selectedBaggage,
            checkedBag,
            travelProtection,
            selectedSeat,
            paymentMethod,
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
                <Text style={styles.totalText}>${811.56} 1 adult</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#00b2b2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    checkoutButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PaymentScreen;