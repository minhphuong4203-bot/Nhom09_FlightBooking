import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RoundTripSearching = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Flight</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <Icon name="filter" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
                    <Text style={[styles.tabText, styles.activeTabText]}>Round-trip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={styles.tabText}>One-way</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Text style={styles.tabText}>Multi-city</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Image source={require('../images/Icon/airplane.png')} style={styles.airplaneImg} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="From"
                        placeholderTextColor="#9095a0"
                    />
                </View>
                <View style={styles.searchInputContainer}>
                    <Image source={require('../images/Icon/arrivals.png')} style={styles.airplaneImg} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="To"
                        placeholderTextColor="#9095a0"
                    />
                </View>
                <View style={styles.dateContainer}>
                    <View style={styles.dateItem}>
                        <Icon name="calendar" size={16} color="#9095a0" style={styles.dateIcon} />
                        <Text style={styles.dateLabel}>Fri, Jul 14</Text>
                    </View>
                    <View style={styles.dateItem}>
                        <Icon name="calendar" size={16} color="#9095a0" style={styles.dateIcon} />
                        <Text style={styles.dateLabel}>Fri, Jul 14</Text>
                    </View>
                </View>

                {/* Ô chọn gộp chung cho Traveller và Economy với icon */}
                <TouchableOpacity style={styles.travelerContainer}>
                    <View style={styles.travelerContent}>
                        <Icon name="person" size={16} color="#9095a0" style={styles.travelerIcon} />
                        <Text style={styles.travelerLabel}>Traveller</Text>
                        <Text style={styles.dotSeparator}> • </Text>
                        <Icon name="airplane" size={16} color="#9095a0" style={styles.travelerIcon} />
                        <Text style={styles.travelerLabel}>Economy</Text>
                    </View>
                    <Icon name="chevron-down" size={16} color="#9095a0" style={{marginLeft: 180}} />
                </TouchableOpacity>
            </View>

            {/* Nút Search cố định ở cuối màn hình */}
            <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search flights</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 32,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 16,
    },
    tabItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginHorizontal: 4,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    tabText: {
        fontSize: 16,
        color: '#9095a0',
    },
    activeTabText: {
        color: '#000',
        fontWeight: 'bold',
    },
    searchContainer: {
        padding: 16,
        paddingBottom: 80, // Thêm khoảng trống để tránh bị che bởi nút Search
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        height: 54,
        paddingHorizontal: 12,
        backgroundColor: '#f3f4f6',
        marginVertical: 2,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    airplaneImg: {
        width: 20,
        height: 20,
        marginLeft: 6,
        marginRight: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        marginTop: 16,
    },
    dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: '48%',
        height: 54,
        backgroundColor: '#f3f4f6',
    },
    dateIcon: {
        marginRight: 8,
    },
    dateLabel: {
        fontSize: 14,
        color: '#9095a0',
    },
    travelerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        height: 54,
        paddingHorizontal: 12,
        backgroundColor: '#f3f4f6',
        marginVertical: 8,
        width: '110%',
        marginLeft: -16,
        marginTop: 20,
    },

    travelerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    travelerIcon: {
        marginRight: 4,
        marginLeft: 6,
    },
    travelerLabel: {
        fontSize: 14,
        color: '#767a81',

    },
    dotSeparator: {
        fontSize: 14,
        color: '#9095a0',
        marginHorizontal: 4,
    },
    searchButton: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        // right: 0,
        backgroundColor: '#00bdd6',
        paddingVertical: 14,
        borderRadius: 8,
        width: '90%',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RoundTripSearching;
