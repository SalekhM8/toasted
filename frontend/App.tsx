import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import AppNavigator from './src/navigation/AppNavigator';
import { RootStackParamList } from './src/types/navigation.types';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_live_51Qdg5tDsna1PpUqNMmG2yLXRrlOCrUVlfXPgFydH8z2x15aOfgH63xH0mx7HlTyp5BS7XJqRyhIOtw0Qdlx5F0ec00zF4pMsOk"
    >
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="MainTabs" component={AppNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </StripeProvider>
  );
}