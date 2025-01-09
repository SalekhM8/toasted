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
      publishableKey="pk_test_51Qdg5tDsna1PpUqNWd4NNDVOKxMicf2wqmaiFjH8UmvdiHGiFQGJJ2JIQKdb8MLoccqrUhvMERbSI5gJcQSHk91A00pyRL5vQk"
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