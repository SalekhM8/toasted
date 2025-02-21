import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  // Add this import
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TrackerScreen from '../screens/TrackerScreen';
import PlanSelectionScreen from '../screens/PlanSelectionScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#FF0000',
      tabBarInactiveTintColor: 'gray'
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        )
      }}
    />
    <Tab.Screen
      name="Schedule"
      component={ScheduleScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" size={size} color={color} />
        )
      }}
    />
    <Tab.Screen
      name="Tracker"
      component={TrackerScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="stats-chart" size={size} color={color} />
        )
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        )
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="MainTabs"  // Add this line
  >
    <Stack.Screen
      name="PlanSelection"
      component={PlanSelectionScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MainTabs"
      component={MainTabs}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppNavigator;