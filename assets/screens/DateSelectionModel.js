import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, TouchableWithoutFeedback, Image } from 'react-native';

const DatePicker = () => {
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                    if (item.date.getTime() < selectedEndDate.getTime()) {
                        setSelectedStartDate(item.date);
                    } else {
                        setSelectedEndDate(item.date);
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

    return (
        <View style={styles.container}>
            <View style={styles.modalBackground}>
                <View style={styles.subContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Date</Text>
                        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                            <Text style={styles.closeText}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dateInputContainer}>
                        <View style={styles.inputContainer}>
                            <Image source={require('../images/Icon/airplane.png')} style={styles.airplaneImg} />
                            <TextInput
                                style={styles.dateInput}
                                value={formatDate(selectedStartDate)} // Here
                                placeholder="From"
                                editable={false} // Non-editable
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Image source={require('../images/Icon/arrivals.png')} style={styles.airplaneImg} />
                            <TextInput
                                style={styles.dateInput}
                                value={formatDate(selectedEndDate)} // Here
                                placeholder="To"
                                editable={false} // Non-editable
                            />
                        </View>
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
                        <Text style={styles.footerText}>Round Trip</Text>
                        <TouchableOpacity style={styles.doneButton} onPress={() => console.log('Done pressed')}>
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Modal
                visible={isModalVisible}
                transparent
                onRequestClose={() => setIsModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                    <View style={styles.modalBackground}>
                        <View style={[styles.modalContainer, { marginTop: 30 }]}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerText}>Date</Text>
                                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={{ position: 'absolute', right: 0 }}>
                                    <Text style={styles.closeText}>X</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.dateInputContainer}>
                                <View style={styles.inputContainer}>
                                    <Image source={require('../images/Icon/airplane.png')} style={styles.airplaneImg} />
                                    <TextInput
                                        style={styles.dateInput}
                                        value={formatDate(selectedStartDate)}
                                        placeholder="From"
                                        editable={false} // Non-editable
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Image source={require('../images/Icon/arrivals.png')} style={styles.airplaneImg} />
                                    <TextInput
                                        style={styles.dateInput}
                                        value={formatDate(selectedEndDate)}
                                        placeholder="To"
                                        editable={false} // Non-editable
                                    />
                                </View>
                            </View>

                            {renderMonths()}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
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