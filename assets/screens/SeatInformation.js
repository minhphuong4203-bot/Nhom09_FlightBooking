import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SeatScreen = ({ navigation, route }) => {
    const { flightData, passengerInfo, selectedBaggage } = route.params;
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentSeat, setCurrentSeat] = useState(null);

    // Mock data cho sơ đồ ghế
    const generateSeatMap = () => {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
        const columns = 30;
        const seatMap = [];

        for (let i = 1; i <= columns; i++) {
            const row = rows.map(letter => ({
                id: `${letter}${i}`,
                number: `${letter}${i}`,
                isOccupied: Math.random() > 0.7,
                seatClass: i <= 5 ? 'Business' : 'Economy',
                price: i <= 5 ? 200 : 100,
                features: i <= 5
                  ? ['Extra legroom', 'Premium meal', 'Priority boarding']
                  : ['Standard legroom', 'Regular meal']
            }));
            seatMap.push(row);
        }
        return seatMap;
    };

    // Sử dụng useMemo để tạo seatMap một lần duy nhất
    const seatMap = useMemo(() => generateSeatMap(), []);

    const handleSeatSelection = (seat) => {
        if (!seat.isOccupied) {
            setCurrentSeat(seat);
            setModalVisible(true);
        }
    };

    const confirmSeatSelection = () => {
        setSelectedSeat(currentSeat);
        setModalVisible(false);
    };

    const handleContinue = () => {
        if (!selectedSeat) {
            Alert.alert('Error', 'Please select a seat');
            return;
        }

        navigation.navigate('PaymentScreen', {
            flightData,
            passengerInfo,
            selectedSeat,
            selectedBaggage
        });
    };

    return (
      <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Select Your Seat</Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
              <Icon name="person-circle-outline" size={32} color="#ccc" />
              <Icon name="briefcase-outline" size={32} color="#ccc" />
              <Icon name="car-outline" size={32} color="#00bdd6" />
              <Icon name="card-outline" size={32} color="#ccc" />
          </View>

          {/* Seat Map */}
          <ScrollView style={styles.scrollView}>
              <View style={styles.seatMap}>
                  {seatMap.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.seatRow}>
                        {row.map((seat) => (
                          <TouchableOpacity
                            key={seat.id}
                            style={[
                                styles.seat,
                                seat.isOccupied && styles.occupiedSeat,
                                selectedSeat?.id === seat.id && styles.selectedSeat
                            ]}
                            disabled={seat.isOccupied}
                            onPress={() => handleSeatSelection(seat)}
                          >
                              <Text style={styles.seatText}>{seat.number}</Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  ))}
              </View>
          </ScrollView>

          {/* Legend */}
          <View style={styles.legend}>
              <View style={styles.legendItem}>
                  <View style={[styles.legendBox, styles.available]} />
                  <Text>Available</Text>
              </View>
              <View style={styles.legendItem}>
                  <View style={[styles.legendBox, styles.occupied]} />
                  <Text>Occupied</Text>
              </View>
              <View style={styles.legendItem}>
                  <View style={[styles.legendBox, styles.selected]} />
                  <Text>Selected</Text>
              </View>
          </View>

          {/* Modal */}
          {modalVisible && currentSeat && (
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Seat Details</Text>
                    <Text style={styles.modalSubtitle}>Seat {currentSeat.number}</Text>

                    <View style={styles.modalDetails}>
                        <Text style={styles.modalText}>Class: {currentSeat.seatClass}</Text>
                        <Text style={styles.modalText}>Price: ${currentSeat.price}</Text>
                        <Text style={styles.modalText}>
                            Features: {currentSeat.features.join(', ')}
                        </Text>
                    </View>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                          style={[styles.modalButton, styles.backButton]}
                          onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.modalButton, styles.confirmButton]}
                          onPress={confirmSeatSelection}
                        >
                            <Text style={styles.modalButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
              <Text style={styles.seatInfo}>
                  Selected Seat: {selectedSeat ? selectedSeat.number : 'None'}
              </Text>
              <TouchableOpacity
                style={[styles.continueButton, !selectedSeat && styles.disabledButton]}
                onPress={handleContinue}
                disabled={!selectedSeat}
              >
                  <Text style={styles.buttonText}>Continue</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        marginLeft: 16,
        fontSize: 20,
        fontWeight: 'bold',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    scrollView: {
        flex: 1,
    },
    seatMap: {
        padding: 20,
    },
    seatRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    seat: {
        width: 40,
        height: 40,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderWidth: 1,
        borderColor: '#bdbdbd',
    },
    selectedSeat: {
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
    },
    occupiedSeat: {
        backgroundColor: '#ff0000',
        borderColor: '#d32f2f',
    },
    seatText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendBox: {
        width: 20,
        height: 20,
        marginRight: 5,
        borderRadius: 3,
        borderWidth: 1,
    },
    available: {
        backgroundColor: '#e0e0e0',
        borderColor: '#bdbdbd',
    },
    occupied: {
        backgroundColor: '#ff0000',
        borderColor: '#d32f2f',
    },
    selected: {
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 18,
        marginBottom: 16,
    },
    modalDetails: {
        marginBottom: 20,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 8,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: '#757575',
    },
    confirmButton: {
        backgroundColor: '#00b2b2',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    seatInfo: {
        fontSize: 16,
        marginBottom: 10,
    },
    continueButton: {
        backgroundColor: '#00b2b2',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SeatScreen;
