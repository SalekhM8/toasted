import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';
import { planService } from '../../services/planService';
import { RootStackParamList } from '../../types/navigation.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token, user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Ensure we don't have an infinite redirect loop
  useEffect(() => {
    const checkRedirectHistory = async () => {
      try {
        const redirectHistory = await AsyncStorage.getItem('redirectHistory');
        if (redirectHistory) {
          const history = JSON.parse(redirectHistory);
          const now = new Date().getTime();
          
          // If we've redirected more than 3 times in the last 5 seconds, show error
          if (history.length > 3 && (now - history[0]) < 5000) {
            setError('Redirect loop detected. Please try again later.');
            return true;
          }
          
          // Add current timestamp to history
          history.push(now);
          // Keep only the last 10 redirects
          const updatedHistory = history.slice(-10);
          await AsyncStorage.setItem('redirectHistory', JSON.stringify(updatedHistory));
        } else {
          // Initialize redirect history
          await AsyncStorage.setItem('redirectHistory', JSON.stringify([new Date().getTime()]));
        }
        return false;
      } catch (e) {
        console.error('Error checking redirect history:', e);
        return false;
      }
    };

    checkRedirectHistory();
  }, []);

  useEffect(() => {
    // Only try a maximum of 2 times to avoid infinite loops
    if (retryCount > 2) {
      setError('Too many attempts. Please try again later.');
      return;
    }

    const checkUserStatus = async () => {
      // Don't proceed if already showing an error
      if (error) return;
      
      // Handle loading state from auth
      if (loading) {
        console.log('Auth is still loading, waiting...');
        return;
      }

      // STEP 1: Check if user is authenticated
      if (!token || !user) {
        console.log('No authentication found, redirecting to Login');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
        return;
      }

      // STEP 2: User is authenticated, check for plans
      try {
        console.log('User authenticated, checking for plans...');
        const todaysPlan = await planService.getTodaysPlan();
        
        // Verify plan exists and has content
        const hasActivePlan = todaysPlan && (todaysPlan.workout || todaysPlan.meals?.length > 0);
        
        if (hasActivePlan) {
          console.log('User has active plans, going to Home screen');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ 
                name: 'MainTabs',
                params: { 
                  screen: 'Home',
                  params: {
                    initialPlan: todaysPlan // Pass the full plan with progress
                  }
                }
              }],
            })
          );
        } else {
          // User is authenticated but has no plans - send to plan selection
          console.log('User has no active plans, going to Plan Selection');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'PlanSelection' }],
            })
          );
        }
      } catch (error: any) {
        console.error('Plan check failed:', error.message);
        setRetryCount(prev => prev + 1);
        setError(`Error checking plans: ${error.message}`);
      }
    };

    // Set a timer to avoid immediate retry that might cause loops
    const timer = setTimeout(() => {
      checkUserStatus();
    }, 500);

    return () => clearTimeout(timer);
  }, [loading, token, user, navigation, retryCount, error]);

  // When all else fails, let the user manually navigate 
  const goToLogin = () => {
    AsyncStorage.removeItem('redirectHistory');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={goToLogin}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF0000" />
      <Text style={styles.loadingText}>Loading your fitness journey...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default LoadingScreen;