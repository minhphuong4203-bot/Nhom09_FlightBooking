import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartPage from './assets/screens/StartPage';
// import FlightBookingScreen from './assets/screens/FlightBooking';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartPage">
          <Stack.Screen
          name="StartPage"
          component={StartPage}
            options={{ headerShown: false }}
          />
        {/* <Stack.Screen
          name="FlightBooking"
          component={FlightBookingScreen}
          options={{ headerShown: false }}
        /> */}
        </Stack.Navigator>
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
