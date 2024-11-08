import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DatePicker = ({ visible, onClose, onSelect, departureDate, returnDate, tripType }) => {
    const [selectedStartDate, setSelectedStartDate] = useState(departureDate || new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(returnDate || new Date());
    const [isSelectingStartDate, setIsSelectingStartDate] = useState(true); // Track which date is being selected

    const getDayOfWeek = (date) => (date.getDay() + 6) % 7;

    const getDates = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysCount = new Date(year, month + 1, 0).getDate();
        const firstDayOffset = getDayOfWeek(new Date(year, month, 1));
        const dates = [
            ...Array.from({ length: firstDayOffset }, (_, i) => ({
                date: new Date(year, month, i + 1 - firstDayOffset),
                isCurrentMonth: false,
            })),
            ...Array.from({ length: daysCount }, (_, i) => ({
                date: new Date(year, month, i + 1),
                isCurrentMonth: true,
            })),
            ...Array.from({ length: 42 - daysCount - firstDayOffset }, (_, i) => ({
                date: new Date(year, month + 1, i + 1),
                isCurrentMonth: false,
            })),
        ];
        return dates;
    };

    const formatDate = (date) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleDateInputPress = (isStartDate) => {
        setIsSelectingStartDate(isStartDate); // Track which input is selected
    };

    const renderDate = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.dateContainer,
                !item.isCurrentMonth ? styles.disabledDate : {},
                (item.isCurrentMonth && item.date.getTime() === selectedStartDate.getTime()) ||
                    (item.isCurrentMonth && item.date.getTime() === selectedEndDate.getTime())
                    ? styles.selectedDate
                    : null,
            ]}
            onPress={() => {
                if (item.isCurrentMonth) {
                    if (isSelectingStartDate) {
                        setSelectedStartDate(item.date); // Select start date
                    } else {
                        setSelectedEndDate(item.date); // Select end date
                    }
                }
            }}
        >
            <Text style={[styles.dateText, !item.isCurrentMonth ? styles.disabledText : {}]}>
                {item.date.getDate()}
            </Text>
        </TouchableOpacity>
    );

    const renderMonths = () => {
        const months = [
            new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth() - 1, 1),
            new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), 1),
            new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth() + 1, 1),
        ];
        return (
            <FlatList
                data={months}
                keyExtractor={(item) => item.getTime().toString()}
                renderItem={({ item }) => (
                    <View style={styles.monthContainer}>
                        <Text style={styles.monthText}>{`${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][item.getMonth()]} ${item.getFullYear()}`}</Text>
                        <FlatList
                            data={getDates(item)}
                            keyExtractor={(date) => date.date.toISOString()}
                            numColumns={7}
                            renderItem={renderDate}
                        />
                    </View>
                )}
            />
        );
    };

    const handleDonePress = () => {
        onSelect(selectedStartDate, selectedEndDate);
        onClose();
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
        <Modal visible={visible} transparent onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <View style={styles.subContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>Dates</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.closeText}>X</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.dateInputContainer}>
                            <TouchableOpacity onPress={() => handleDateInputPress(true)} style={styles.inputContainer}>
                                <Icon name="airplane-landing" size={24} color="#000" />
                                <TextInput
                                    style={styles.dateInput}
                                    value={formatDate(selectedStartDate)}
                                    placeholder="From"
                                    editable={false}
                                />
                            </TouchableOpacity>
                            {tripType === 'round-trip' && (
                                <TouchableOpacity onPress={() => handleDateInputPress(false)} style={styles.inputContainer}>
                                    <Icon name="airplane-takeoff" size={24} color="#000" />
                                    <TextInput
                                        style={styles.dateInput}
                                        value={selectedEndDate ? formatDate(selectedEndDate) : ''}
                                        placeholder="To"
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.weekdayHeader}>
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                                <View key={`${day}-${index}`} style={styles.weekdayHeaderItem}>
                                    <Text style={styles.weekdayHeaderText}>{day}</Text>
                                </View>
                            ))}
                        </View>

                        {renderMonths()}

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>{getFooterText()}</Text>
                            <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
                                <Text style={styles.doneButtonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        maxWidth: 400,
        maxHeight: 800,
        marginTop: 60,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        flex: 1,
        textAlign: 'center',
    },
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    airplaneImg: {
        width: 30,
        height: 30,
        position: 'absolute',
        marginLeft: 10,
        opacity: 0.5,
    },
    dateInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 24,
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 8,
        justifyContent: 'center',
    },
    dateInput: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        minHeight: 50,
        fontWeight: '700',
        fontSize: 16,
        color: '#000',
    },
    selectedInput: {
        borderColor: '#00BCD4', // Color for the selected input
    },
    defaultInput: {
        borderColor: '#ccc', // Default border color
    },
    weekdayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
        marginTop: 54,
        marginBottom: 48,
    },
    weekdayHeaderItem: {
        flex: 1,
        alignItems: 'center',
    },
    weekdayHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    dateInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 4,
        paddingLeft: 60,
        minHeight: 50,
        fontWeight: '700', // Set font weight to 700
        fontSize: 16, // Optional: set a font size for better visibility
        color: '#000', // Optional: set a color for better visibility
    },
    monthContainer: {
        alignItems: 'center',
        marginVertical: 8,
    },
    monthText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 18,
    },
    dateContainer: {
        width: '14.28%',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dateText: {
        fontSize: 16,
    },
    selectedDate: {
        backgroundColor: '#00BCD4',
        borderRadius: 25,
        color: 'white',
    },
    disabledDate: {
        borderRadius: 25,
    },
    disabledText: {
        color: '#9e9e9e',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '90%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    footerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    doneButton: {
        backgroundColor: '#00BCD4',
        borderRadius: 5,
        padding: 10,
        width: 130,
        height: 42,
        alignItems: 'center',
    },
    doneButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DatePicker;