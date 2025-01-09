// src/components/ProfileComponents/StatsSection.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../../types/profile.types';

interface StatsSectionProps {
  user: User;
}

const StatsSection: React.FC<StatsSectionProps> = ({ user }) => (
  <View style={styles.statsContainer}>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{user.height || '-'}</Text>
      <Text style={styles.statLabel}>Height (cm)</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{user.weight || '-'}</Text>
      <Text style={styles.statLabel}>Weight (kg)</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{user.goalWeight || '-'}</Text>
      <Text style={styles.statLabel}>Goal (kg)</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  }
});

export default StatsSection;