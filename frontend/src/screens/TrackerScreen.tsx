import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { progressService } from '../services/progressService';
import WeightChart from '../components/TrackerComponents/WeightChart';
import ProgressStats from '../components/TrackerComponents/ProgressStats';
import WeightInput from '../components/TrackerComponents/WeightInput';
import { Progress, ProgressData, WeightEntry } from '../types/tracker.types';

const TrackerScreen: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [progressData, setProgressData] = useState<ProgressData>({
    streak: 0,
    completedWorkouts: 0,
    completedMeals: 0,
    weights: []
  });

  const fetchProgress = useCallback(async () => {
    if (!user?._id) return;

    setIsLoading(true);
    try {
      const progress = await progressService.getProgress();
      setWeights(progress.weights || []);
      setProgressData({
        streak: progress.streak?.current || 0,
        completedWorkouts: progress.completedWorkouts?.length || 0,
        completedMeals: progress.completedMeals?.length || 0,
        weights: progress.weights || []
      });
    } catch (error) {
      console.error('Error fetching progress:', error);
      Alert.alert('Error', 'Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchProgress();
    }, [fetchProgress])
  );

  const handleWeightLogged = async () => {
    await fetchProgress();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF0000" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Progress Tracker</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weight Progress</Text>
          <WeightInput onWeightLogged={handleWeightLogged} />
          {weights.length > 0 ? (
            <View style={styles.chartContainer}>
              <WeightChart 
                data={weights}
                xAxisLabelFormatter={(dateStr: string) => {
                  const date = new Date(dateStr);
                  return date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit'
                  });
                }}
                xAxisLabelStyle={{
                  fontSize: 10,
                  angle: -45,
                  marginTop: 10
                }}
              />
            </View>
          ) : (
            <Text style={styles.emptyText}>No weight entries yet</Text>
          )}
        </View>

        <ProgressStats
          streak={progressData.streak}
          completedWorkouts={progressData.completedWorkouts}
          completedMeals={progressData.completedMeals}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#FF0000',
    textAlign: 'left',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FF0000',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  chartContainer: {
    marginTop: 16,
    marginBottom: 24,
    paddingBottom: 20,
  }
});

export default TrackerScreen;