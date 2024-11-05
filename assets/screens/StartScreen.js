import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
    {
        id: 1,
        name: 'London',
        price: 'from $111.00 to $222.00',
        image: require('../images/Location/London.jpg')
    },
    {
        id: 2,
        name: 'Paris',
        price: 'from $222.00 to $333.00',
        image: require('../images/Location/Paris.jpg')
    },
    {
        id: 3,
        name: 'Venice',
        price: 'from $333.00 to $444.00',
        image: require('../images/Location/venice.jpg')
    },
    {
        id: 4,
        name: 'China',
        price: 'from $444.00 to $555.00',
        image: require('../images/Location/GreatWall_China.jpg')
    }
];

const StartScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');

    const filteredDestinations = data.filter(destination =>
        destination.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleDestinationPress = (destination) => {
        navigation.navigate('DestinationDetails', { destination });
    };

    const handleSearchPress = () => {
        navigation.navigate('RoundTripSearching', { selectedTab: 'Round-trip' });
    };

    const renderDestinationItem = ({ item }) => (
        <TouchableOpacity style={styles.destinationItem} onPress={() => handleDestinationPress(item)}>
            <Image source={item.image} style={styles.destinationImage} />
            <Text style={styles.destinationName}>{item.name}</Text>
            <Text style={styles.destinationPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <View style={styles.airplaneIconContainer}>
                        <Icon name="airplane" size={26} color="#ffffff" />
                    </View>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Explore flight</Text>
                        <Text style={styles.headerSubtitle}>Welcome to flight booking</Text>
                    </View>
                    <TouchableOpacity style={styles.headerUserIcon}>
                        <Text style={styles.headerUserText}>A</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
                    <View style={styles.searchInputContainer}>
                        <Icon name="search" size={16} color="#9095a0" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Find a flight"
                            placeholderTextColor="#9095a0"
                            value={searchText}
                            onChangeText={setSearchText}
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="search"
                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>The best cities for you</Text>
                <FlatList
                    data={filteredDestinations}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderDestinationItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.destinationList}
                />
                <View style={styles.exploredestinationsContainer}>
                    <Text style={styles.sectionTitle}>Explore Destinations</Text>
                    <View style={styles.exploredestinationsImageContainer}>
                        <Image source={require('../images/Flight/Flighing.png')} style={styles.exploredestinationsImage} />
                    </View>
                </View>
            </View>
            <View style={styles.bottomNavigation}>
                <TouchableOpacity style={styles.bottomNavigationItem}>
                    <Icon name="home" size={24} color="#9ca1aa" />
                    <Text style={styles.bottomNavigationLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavigationItem}>
                    <Icon name="globe" size={24} color="#9ca1aa" />
                    <Text style={styles.bottomNavigationLabel}>Explore</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavigationItem}>
                    <Icon name="person" size={24} color="#9ca1aa" />
                    <Text style={styles.bottomNavigationLabel}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 56,
        marginBottom: 16,
    },
    airplaneIconContainer: {
        backgroundColor: '#00bdd6',
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        marginLeft: -100,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'gray',
    },
    headerUserIcon: {
        width: 50,
        height: 50,
        backgroundColor: '#4069e5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    headerUserText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
    },
    searchContainer: {
        marginBottom: 26,
        marginTop: 32,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 12,
        backgroundColor: 'transparent',
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    searchIcon: {
        marginRight: 8,
        fontSize: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    destinationList: {
        paddingVertical: 12,
    },
    destinationItem: {
        width: 200,
        marginRight: 16,
    },
    destinationImage: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        marginBottom: 8,
    },
    destinationName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    destinationPrice: {
        color: '#9ca1aa',
    },
    exploredestinationsContainer: {
        marginVertical: 24,
    },
    exploredestinationsImageContainer: {
        position: 'relative',
    },
    exploredestinationsImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    bottomNavigationItem: {
        alignItems: 'center',
    },
    bottomNavigationLabel: {
        fontSize: 12,
        color: '#9ca1aa',
        marginTop: 4,
    },
});

export default StartScreen;