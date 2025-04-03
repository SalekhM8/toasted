import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/screens/auth/LoginScreen';
import LoadingScreen from './src/screens/common/LoadingScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import PlanSelectionScreen from './src/screens/PlanSelectionScreen';
import AppNavigator from './src/navigation/AppNavigator';
import { RootStackParamList } from './src/types/navigation.types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Loading"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Loading" component={LoadingScreen} />  
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="PlanSelection" component={PlanSelectionScreen} />
            <Stack.Screen name="MainTabs" component={AppNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});