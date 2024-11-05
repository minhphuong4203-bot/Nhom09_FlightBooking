import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FlightSearching = ({ navigation, children, defaultTab }) => {
    const [selectedTab, setSelectedTab] = useState(defaultTab || 'One-way');

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    useEffect(() => {
        // Set the selected tab based on the prop when the component mounts
        setSelectedTab(defaultTab);
    }, [defaultTab]);

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