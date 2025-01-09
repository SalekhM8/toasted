// src/components/TrackerComponents/ProgressStats.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressStatsProps {
  completedWorkouts: number;
  completedMeals: number;
  streak: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ 
  completedWorkouts, 
  completedMeals, 
  streak 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{streak}</Text>
        <Text style={styles.statLabel}>Day Streak</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{completedWorkouts}</Text>
        <Text style={styles.statLabel}>Workouts</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{completedMeals}</Text>
        <Text style={styles.statLabel}>Meals</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#FFE8E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  }
});

export default ProgressStats;