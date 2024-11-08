import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const TravelOptions = ({ visible, onClose, onSelect, tripType }) => {
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [cabinClass, setCabinClass] = useState('Economy');

    const handleIncrement = (type) => {
        switch (type) {
            case 'adults':
                setAdults(adults + 1);
                break;
            case 'children':
                setChildren(children + 1);
                break;
            case 'infants':
                setInfants(infants + 1);
                break;
        }
    };

    const handleDecrement = (type) => {
        switch (type) {
            case 'adults':
                setAdults(adults > 0 ? adults - 1 : 0);
                break;
            case 'children':
                setChildren(children > 0 ? children - 1 : 0);
                break;
            case 'infants':
                setInfants(infants > 0 ? infants - 1 : 0);
                break;
        }
    };

    const handleDone = () => {
        const data = {
            adults,
            children,
            infants,
            cabinClass,
        };
        onSelect(data);  // Call the onSelect callback with the data
        onClose();       // Close the modal
    };

    const getFooterText = () => {
        if (tripType === 'one-way') {
            return 'One Way';
        } else if (tripType === 'round-trip') {
            return 'Round Trip';
        }
        return 'Multi City';
    };

    return (
        <Modal style={styles.container} visible={visible} >
            <View style={styles.subContainer}>
                <View style={styles.backgroundContainer} />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Options</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.sectionTitle}>Traveller</Text>
                    <View style={styles.optionsContainer}>
                        <View style={styles.optionItem}>
                            <View style={styles.travellerItem}>
                                <Text style={styles.label}>Adults</Text>
                                <Text style={styles.subLabel}>12+ years</Text>
                            </View>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity style={styles.counterButton} onPress={() => handleDecrement('adults')}>
                                    <Text style={styles.counterButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.counterValue}>{adults}</Text>
                                <TouchableOpacity style={styles.counterButton} onPress={() => handleIncrement('adults')}>
                                    <Text style={styles.counterButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.optionItem}>
                            <View style={styles.travellerItem}>
                                <Text style={styles.label}>Children</Text>
                                <Text style={styles.subLabel}>2-12 years</Text>
                            </View>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity style={styles.counterButton} onPress={() => handleDecrement('children')}>
                                    <Text style={styles.counterButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.counterValue}>{children}</Text>
                                <TouchableOpacity style={styles.counterButton} onPress={() => handleIncrement('children')}>
                                    <Text style={styles.counterButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.optionItem}>
                            <View style={styles.travellerItem}>
                                <Text style={styles.label}>Infants</Text>
                                <Text style={styles.subLabel}>Under 2 years</Text>
                            </View>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity style={styles.counterButton} onPress={() => handleDecrement('infants')}>
                                    <Text style={styles.counterButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.counterValue}>{infants}</Text>
                                <TouchableOpacity style={styles.counterButton} onPress={() => handleIncrement('infants')}>
                                    <Text style={styles.counterButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <Text style={[styles.sectionTitle, { marginTop: 48 }]}>Cabin Class</Text>
                    <View style={styles.cabinClassContainer}>
                        {['Economy', 'Premium Economy', 'Business', 'First'].map((classOption) => (
                            <TouchableOpacity
                                key={classOption}
                                style={[
                                    styles.cabinClassOption,
                                    classOption === cabinClass && styles.selectedCabinClass,
                                ]}
                                onPress={() => setCabinClass(classOption)}
                            >
                                <Text style={styles.cabinClassText}>{classOption}</Text>
                                {classOption === cabinClass && <Text style={styles.tickMark}>✓</Text>}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.roundTripText}>{getFooterText()}</Text>
                    <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                        <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundContainer: {
        height: 80, // Chiều cao khoảng trống mờ
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Màu nền mờ
    },
    headerContainer: {
        position: 'relative',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 30,
    },
    headerTitle: {
        position: 'absolute',
        left: "46%",
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        right: 16,
        padding: 8,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subContainer: {
        flex: 1,
        marginTop: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 16,
        paddingHorizontal: 16,
        color: '#323842',
        // marginTop: 40,
    },
    optionsContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f3f4f6',
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#f3f4f6',
    },
    label: {
        fontSize: 16,
        fontWeight: '400'
    },
    subLabel: {
        fontSize: 12,
        color: '#888',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 200,
        // padding: 10,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    counterButtonText: {
        fontSize: 24,
        color: '#000',
    },
    counterValue: {
        fontSize: 18,
        marginHorizontal: 8,
    },
    cabinClassContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f3f4f6',
        paddingHorizontal: 0,

    },
    cabinClassOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#f3f4f6',
        width: '100%',
    },
    cabinClassText: {
        fontSize: 16,
        marginLeft: 16,
    },
    selectedCabinClass: {
        fontWeight: 'bold',
    },
    tickMark: {
        fontSize: 16,
        color: '#000',
        marginRight: 32,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#f5f5f5',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderColor: '#f3f4f6',
        bottom: 40,
    },
    roundTripText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    doneButton: {
        backgroundColor: '#00bdd6',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: 160,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TravelOptions;
