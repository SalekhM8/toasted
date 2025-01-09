import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { planService } from '../../services/planService';

interface Exercise {
  name: string;
  sets: number;
  reps: string | number;
  notes?: string;
  cues?: string[];
}

interface DayWorkout {
  focus: string;
  exercises: Exercise[];
}

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string[];
  notes?: string;
}

interface DayPlan {
  date: string;
  workout: DayWorkout | null;
  meals: Meal[];
}

const ScheduleScreen = () => {
  const [weekPlan, setWeekPlan] = useState<DayPlan[] | null>(null);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});

  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!loading) {
        fetchWeekPlan();
      }
    }, [loading])
  );

  const fetchWeekPlan = async () => {
    try {
      setLoading(true);
      const response = await planService.getWeekPlan();
      setWeekPlan(response);
    } catch (error) {
      console.error('Error fetching week plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (index: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!weekPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {weekPlan.map((day, index) => (
          <View key={index} style={styles.dayCard}>
            <TouchableOpacity
              style={styles.dayHeader}
              onPress={() => toggleDay(index)}
            >
              <Text style={styles.dayTitle}>
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
              </Text>
              <Text style={styles.expandIcon}>
                {expandedDays[index] ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>

            {expandedDays[index] && (
              <>
                {day.workout && (
                  <View style={styles.workoutSection}>
                    <Text style={styles.sectionTitle}>Workout</Text>
                    {day.workout.exercises.map((exercise, i) => (
                      <View key={i} style={styles.exercise}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Text style={styles.exerciseDetails}>
                          {exercise.sets} × {exercise.reps}
                        </Text>
                        {exercise.notes && (
                          <Text style={styles.notes}>Note: {exercise.notes}</Text>
                        )}
                        {exercise.cues && exercise.cues.length > 0 && (
                          <View style={styles.cuesSection}>
                            <Text style={styles.subTitle}>Form Cues:</Text>
                            {exercise.cues.map((cue, cueIndex) => (
                              <Text key={cueIndex} style={styles.listItem}>• {cue}</Text>
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.mealsSection}>
                  <Text style={styles.sectionTitle}>Meals</Text>
                  {day.meals.map((meal, i) => (
                    <View key={i} style={styles.meal}>
                      <Text style={styles.mealName}>{meal.name}</Text>
                      <View style={styles.macros}>
                        <Text style={styles.macroText}>Calories: {meal.calories}</Text>
                        <Text style={styles.macroText}>Protein: {meal.protein}g</Text>
                        <Text style={styles.macroText}>Carbs: {meal.carbs}g</Text>
                        <Text style={styles.macroText}>Fats: {meal.fats}g</Text>
                      </View>

                      <View style={styles.ingredientsSection}>
                        <Text style={styles.subTitle}>Ingredients:</Text>
                        {meal.ingredients.map((ingredient, ingIndex) => (
                          <Text key={ingIndex} style={styles.listItem}>• {ingredient}</Text>
                        ))}
                      </View>

                      <View style={styles.instructionsSection}>
                        <Text style={styles.subTitle}>Instructions:</Text>
                        {meal.instructions.map((instruction, instIndex) => (
                          <Text key={instIndex} style={styles.listItem}>
                            {instIndex + 1}. {instruction}
                          </Text>
                        ))}
                      </View>

                      {meal.notes && (
                        <View style={styles.notesSection}>
                          <Text style={styles.subTitle}>Notes:</Text>
                          <Text style={styles.notes}>{meal.notes}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        ))}
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    overflow: 'hidden',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandIcon: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  workoutSection: {
    padding: 16,
    marginBottom: 8,
  },
  mealsSection: {
    padding: 16,
  },
  exercise: {
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
  meal: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  macros: {
    marginBottom: 12,
  },
  macroText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 8,
  },
  listItem: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginBottom: 2,
  },
  notes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  cuesSection: {
    marginTop: 8,
  },
  ingredientsSection: {
    marginTop: 12,
  },
  instructionsSection: {
    marginTop: 12,
  },
  notesSection: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  }
});

export default ScheduleScreen;