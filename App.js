import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import StartScreen from './assets/screens/StartScreen';
import RoundTripSearching from './assets/screens/RoundTripSearching';
import OneWaySearching from './assets/screens/OneWaySearching';
import MultiCitySearching from './assets/screens/MultiCitySearching';

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
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
