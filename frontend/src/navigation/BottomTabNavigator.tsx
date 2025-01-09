import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';  // This works everywhere!
import HomeScreen from '../screens/HomeScreen';
import ScheduleStackNavigator from './ScheduleStackNavigator';
import TrackerScreen from '../screens/TrackerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { BottomTabParamList } from '../types/navigation.types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={TrackerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;