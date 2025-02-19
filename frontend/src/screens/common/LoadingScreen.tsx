// src/screens/common/LoadingScreen.tsx
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
        if (token && user) {
          try {
            // Use your existing getTodaysPlan endpoint to check plan status
            const todaysPlan = await planService.getTodaysPlan();
            if (todaysPlan) {
              navigation.reset({
                index: 0,
                routes: [{ 
                  name: 'MainTabs',
                  params: { screen: 'Home' }
                }],
              });
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: 'PlanSelection' }],
              });
            }
          } catch (error) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'PlanSelection' }],
            });
          }
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
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