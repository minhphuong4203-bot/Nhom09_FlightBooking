import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FlightSearching = ({ navigation, children, defaultTab }) => {
    const [selectedTab, setSelectedTab] = useState(defaultTab || 'One-way');

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
        // Điều hướng đến màn hình tương ứng với tab được chọn
        if (tab === 'Round-trip') {
            navigation.navigate('RoundTripSearching');
        } else if (tab === 'One-way') {
            navigation.navigate('OneWaySearching');
        } else if (tab === 'Multi-city') {
            navigation.navigate('MultiCitySearching');
        }
    };

    useEffect(() => {
        if (defaultTab) {
            setSelectedTab(defaultTab); // Cập nhật lại tab khi defaultTab thay đổi
        }
    }, [defaultTab]);

    // Lắng nghe khi quay lại màn hình
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSelectedTab(defaultTab || 'One-way'); // Đặt lại selectedTab khi màn hình được hiển thị
        });

        return unsubscribe; // Hủy đăng ký khi component bị unmount
    }, [navigation, defaultTab]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <Icon name="filter" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabItem, selectedTab === 'Round-trip' && styles.activeTab]}
                    onPress={() => handleTabPress('Round-trip')}
                >
                    <Text style={[styles.tabText, selectedTab === 'Round-trip' && styles.activeTabText]}>Round-trip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabItem, selectedTab === 'One-way' && styles.activeTab]}
                    onPress={() => handleTabPress('One-way')}
                >
                    <Text style={[styles.tabText, selectedTab === 'One-way' && styles.activeTabText]}>One-way</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabItem, selectedTab === 'Multi-city' && styles.activeTab]}
                    onPress={() => handleTabPress('Multi-city')}
                >
                    <Text style={[styles.tabText, selectedTab === 'Multi-city' && styles.activeTabText]}>Multi-city</Text>
                </TouchableOpacity>
            </View>

            {children}
        </View>
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
});

export default FlightSearching;