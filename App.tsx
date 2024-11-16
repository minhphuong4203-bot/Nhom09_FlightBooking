
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import StartScreen from './assets/screens/StartScreen';
import RoundTripSearching from './assets/screens/RoundTripSearching';
import OneWaySearching from './assets/screens/OneWaySearching';
import MultiCitySearching from './assets/screens/MultiCitySearching';
// import Options from './assets/screens/FilterOtherOptions';
import SearchResult from './assets/screens/SearchResult';
import  FlightDetail  from './assets/screens/FlightDetail';
import PassengerInformation from './assets/screens/PassengerInformation';
import PaymentInformation from './assets/screens/PaymentInformation';
import Summary from './assets/screens/BookingCompleted';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoundTripSearching"
          component={RoundTripSearching}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OneWaySearching"
          component={OneWaySearching}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MultiCitySearching"
          component={MultiCitySearching}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FlightDetail"
          component={FlightDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PassengerInformation"
          component={PassengerInformation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentInformation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
