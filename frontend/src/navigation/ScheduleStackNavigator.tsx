// src/navigation/ScheduleStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import { ScheduleStackParamList } from '../types/schedule.types';

const Stack = createStackNavigator<ScheduleStackParamList>();

const ScheduleStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
    </Stack.Navigator>
  );
};

export default ScheduleStackNavigator;