import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import DiagnosisScreen from '../screens/DiagnosisScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SecurityCheckScreen from '../screens/SecurityCheckScreen';

export type RootStackParamList = {
  Home: undefined;
  Diagnosis: undefined;
  Result: { score: number };
  History: undefined;
  CarrierStore: { url: string };
  SecurityCheck: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Diagnosis" component={DiagnosisScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="SecurityCheck" component={SecurityCheckScreen} options={{ headerShown: false }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}