import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';
import { planService } from '../../services/planService';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const { token, user, loading } = useAuth();

  React.useEffect(() => {
    const checkUserStatus = async () => {
      if (!loading) {
        // First check: Authentication
        if (!token || !user) {
          return navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }

        try {
          // Check for existing plans and progress
          const todaysPlan = await planService.getTodaysPlan();
          
          // Verify plan exists and has content
          const hasActivePlan = todaysPlan && (todaysPlan.workout || todaysPlan.meals?.length > 0);
          
          if (hasActivePlan) {
            // User has plans - send them to Home with their current progress
            navigation.reset({
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
            });
          } else {
            // Authenticated but no plans - send to plan selection
            navigation.reset({
              index: 0,
              routes: [{ name: 'PlanSelection' }],
            });
          }
        } catch (error) {
          // If error is 404 (no plan found), go to plan selection
          if (error.response?.status === 404) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'PlanSelection' }],
            });
          } else {
            // For other errors, default to login
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      }
    };

    checkUserStatus();
  }, [loading, token, user, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default LoadingScreen;