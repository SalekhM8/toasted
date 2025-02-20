import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';  // Added useRoute
import { planService } from '../services/planService';
import { DayPlan } from '../types/plan.types';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [todaysPlan, setTodaysPlan] = useState<DayPlan | null>(null);
  const [activeTab, setActiveTab] = useState<'Diet' | 'Training'>('Diet');
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  
  // Get initial plan from navigation params
  const initialPlan = route.params?.initialPlan;

  useEffect(() => {
    // If we have an initial plan from LoadingScreen, use it
    if (initialPlan) {
      setTodaysPlan(initialPlan);
      setLoading(false);
    } else {
      fetchTodaysPlan();
    }
  }, [initialPlan]);

  // Only fetch on tab focus if we don't have a plan
  useFocusEffect(
    useCallback(() => {
      if (!todaysPlan) {
        fetchTodaysPlan();
      }
    }, [])
  );

  const fetchTodaysPlan = async () => {
    try {
      const response = await planService.getTodaysPlan();
      setTodaysPlan(response);
    } catch (error) {
      console.error('Error fetching today\'s plan:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of your HomeScreen code remains the same...

  const handleCompleteWorkout = async () => {
    try {
      await planService.completeWorkout(new Date());
      fetchTodaysPlan();
    } catch (error) {
      console.error('Error completing workout:', error);
    }
  };

  const handleCompleteMeal = async (mealNumber: number) => {
    try {
      await planService.completeMeal(new Date(), mealNumber);
      fetchTodaysPlan();
    } catch (error) {
      console.error('Error completing meal:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FF0000" />
        </View>
      </SafeAreaView>
    );
  }

  if (!todaysPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>No plan selected</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PlanSelection')}
          >
            <Text style={styles.buttonText}>Choose Your Plan</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>toasted</Text>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.username}></Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Diet' && styles.activeTab]}
          onPress={() => setActiveTab('Diet')}
        >
          <Text style={[styles.tabText, activeTab === 'Diet' && styles.activeTabText]}>
            Diet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Training' && styles.activeTab]}
          onPress={() => setActiveTab('Training')}
        >
          <Text style={[styles.tabText, activeTab === 'Training' && styles.activeTabText]}>
            Training
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
  {activeTab === 'Diet' ? (
    <View style={styles.section}>
      <View style={styles.sectionContent}>
        {todaysPlan.meals && todaysPlan.meals.length > 0 ? (
          todaysPlan.meals.map((meal, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{meal.name}</Text>
                <TouchableOpacity
                  style={[
                    styles.button,
                    todaysPlan.progress.completedMeals.some(
                      m => m.mealNumber === index + 1
                    ) && styles.completedButton
                  ]}
                  onPress={() => handleCompleteMeal(index + 1)}
                >
                  <Text style={styles.buttonText}>
                    {todaysPlan.progress.completedMeals.some(
                      m => m.mealNumber === index + 1
                    )
                      ? 'Completed'
                      : 'Mark Complete'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.cardText}>Calories: {meal.calories}</Text>
              <Text style={styles.cardText}>Protein: {meal.protein}g</Text>
              <Text style={styles.cardText}>Carbs: {meal.carbs}g</Text>
              <Text style={styles.cardText}>Fats: {meal.fats}g</Text>
              
              {meal.notes && (
                <Text style={styles.notes}>Note: {meal.notes}</Text>
              )}

              <View style={styles.ingredientsSection}>
                <Text style={styles.subTitle}>Ingredients:</Text>
                {meal.ingredients.map((ingredient, i) => (
                  <Text key={i} style={styles.listItem}>• {ingredient}</Text>
                ))}
              </View>

              <View style={styles.instructionsSection}>
                <Text style={styles.subTitle}>Instructions:</Text>
                {meal.instructions.map((instruction, i) => (
                  <Text key={i} style={styles.listItem}>{i + 1}. {instruction}</Text>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={[styles.emptyStateText, {fontStyle: 'italic'}]}>
              You did not select a Diet plan!
            </Text>
          </View>
        )}
      </View>
    </View>
  ) : (
    <View style={styles.section}>
      {todaysPlan.workout ? (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              {todaysPlan.workout.focus}
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                todaysPlan.progress.completedWorkouts.length > 0 && styles.completedButton
              ]}
              onPress={handleCompleteWorkout}
            >
              <Text style={styles.buttonText}>
                {todaysPlan.progress.completedWorkouts.length > 0
                  ? 'Completed'
                  : 'Mark Complete'}
              </Text>
            </TouchableOpacity>
          </View>
          {todaysPlan.workout.exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseCard}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseDetails}>
                {exercise.sets} sets × {exercise.reps}
              </Text>
              {exercise.notes && (
                <Text style={styles.notes}>Note: {exercise.notes}</Text>
              )}
              {exercise.cues && exercise.cues.length > 0 && (
                <View style={styles.cuesSection}>
                  <Text style={styles.subTitle}>Form Cues:</Text>
                  {exercise.cues.map((cue, i) => (
                    <Text key={i} style={styles.listItem}>• {cue}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={[styles.emptyStateText, {fontStyle: 'italic'}]}>
            You did not select a Training plan!
          </Text>
        </View>
      )}
    </View>
  )}
</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF0000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#FF0000',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    flex: 1,
  },
  sectionContent: {
    flex: 1,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    flexWrap: 'wrap',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexShrink: 0,
    minWidth: 120,
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  exerciseCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginBottom: 2,
  },
  ingredientsSection: {
    marginTop: 12,
  },
  instructionsSection: {
    marginTop: 12,
  },
  cuesSection: {
    marginTop: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  }
});

export default HomeScreen;