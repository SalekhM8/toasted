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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { planService } from '../../services/planService';
import { Ionicons } from '@expo/vector-icons';
import MealActionModal from '../../components/meals/MealActionModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';

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
  _id?: string;
}

interface DayPlan {
  date: string;
  workout: DayWorkout | null;
  meals: Meal[];
}

// Define a type for the selected meal
interface SelectedMealInfo {
  meal: Meal;
  dayIndex: number;
  mealNumber: number;
  date: string;
}

type ScheduleScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ScheduleScreen = () => {
  const [weekPlan, setWeekPlan] = useState<DayPlan[] | null>(null);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<ScheduleScreenNavigationProp>();
  
  // Add states for meal actions
  const [mealActionModalVisible, setMealActionModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<SelectedMealInfo | null>(null);
  
  // Add state to track and highlight recently swapped meal
  const [recentlySwappedMeal, setRecentlySwappedMeal] = useState<{dayIndex: number, mealIndex: number} | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!loading) {
        // Check for navigation params to handle refresh and swapped meal info
        // Look through the routes to find the current params
        const currentRoute = navigation.getState().routes.find(r => 
          r.name === 'MainTabs' && 
          (r.params as any)?.screen === 'Schedule'
        );
        const params = (currentRoute?.params as any)?.params;
        
        // Check for meal updated flag first - this requires special treatment
        if (params && params.mealUpdated) {
          console.log(`Meal update detected for meal ID: ${params.mealUpdated}, forcing thorough refresh`);
          
          // Use strong refresh for meal updates to ensure data consistency
          setLoading(true);
          planService.strongRefresh()
            .then(() => fetchWeekPlan())
            .catch(error => {
              console.error('Strong refresh failed, falling back to normal refresh:', error);
              return fetchWeekPlan();
            })
            .finally(() => {
              // If we have a day index, expand that day
              if (typeof params.dayIndex === 'number') {
                setExpandedDays(prev => ({
                  ...prev,
                  [params.dayIndex]: true
                }));
              }
              
              // Clear the params after handling
              setTimeout(() => {
                navigation.setParams({
                  refresh: undefined,
                  forceRefresh: undefined,
                  swappedMealInfo: undefined,
                  dayIndex: undefined,
                  mealUpdated: undefined
                });
              }, 500);
            });
          
          return; // Skip regular refresh handling
        }
        
        // Regular refresh handling
        fetchWeekPlan();
        
        if (params && (params.refresh || params.forceRefresh)) {
          console.log('Schedule screen focused with refresh params:', params);
            
          // If we have swappedMealInfo, automatically expand the day that contains the swapped meal
          if (params.swappedMealInfo && typeof params.dayIndex === 'number') {
            setExpandedDays(prev => ({
              ...prev,
              [params.dayIndex]: true
            }));
              
            // Set the recently swapped meal for highlighting
            if (params.swappedMealInfo.mealNumber) {
              setRecentlySwappedMeal({
                dayIndex: params.dayIndex,
                mealIndex: params.swappedMealInfo.mealNumber - 1 // Convert to 0-based index
              });
                
              // Clear the highlight after 3 seconds
              setTimeout(() => {
                setRecentlySwappedMeal(null);
              }, 3000);
            }
              
            // Clear the params after handling
            setTimeout(() => {
              navigation.setParams({
                refresh: undefined,
                forceRefresh: undefined,
                swappedMealInfo: undefined,
                dayIndex: undefined
              });
            }, 500);
          }
        }
      }
    }, [loading, navigation])
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

  const navigateToShoppingList = () => {
    // @ts-ignore - Navigation typing issue
    navigation.navigate('ShoppingList');
  };
  
  // Add handlers for meal actions
  const handleMealEdit = (meal: Meal, dayIndex: number, mealIndex: number) => {
    if (weekPlan) {
      setSelectedMeal({ 
        meal, 
        date: weekPlan[dayIndex].date,
        mealNumber: mealIndex + 1,
        dayIndex
      });
      setMealActionModalVisible(true);
    }
  };
  
  const handleMealSwap = () => {
    setMealActionModalVisible(false);
    
    if (selectedMeal) {
      navigation.navigate('MealSwap', {
        originalMeal: selectedMeal.meal,
        date: selectedMeal.date,
        mealNumber: selectedMeal.mealNumber,
        referrer: 'Schedule',
        dayIndex: selectedMeal.dayIndex
      });
    }
  };

  // Handle editing meal ingredients
  const handleEditIngredients = () => {
    setMealActionModalVisible(false);
    
    if (selectedMeal) {
      // Navigate to the meal editor screen
      navigation.navigate('MealEditor', {
        meal: selectedMeal.meal,
        date: selectedMeal.date,
        mealNumber: selectedMeal.mealNumber,
        dayIndex: selectedMeal.dayIndex,
        referrer: 'Schedule'
      });
    }
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schedule</Text>
        <TouchableOpacity 
          style={styles.shoppingListButton}
          onPress={navigateToShoppingList}
        >
          <Ionicons name="cart-outline" size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {weekPlan.map((day, dayIndex) => (
          <View key={dayIndex} style={styles.dayCard}>
            <TouchableOpacity
              style={styles.dayHeader}
              onPress={() => toggleDay(dayIndex)}
            >
              <Text style={styles.dayTitle}>
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
              </Text>
              <Text style={styles.expandIcon}>
                {expandedDays[dayIndex] ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>

            {expandedDays[dayIndex] && (
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
                  {day.meals.map((meal, mealIndex) => (
                    <View 
                      key={mealIndex} 
                      style={[
                        styles.meal,
                        recentlySwappedMeal && 
                        recentlySwappedMeal.dayIndex === dayIndex && 
                        recentlySwappedMeal.mealIndex === mealIndex && 
                        styles.swappedMealCard
                      ]}
                    >
                      <View style={styles.mealHeader}>
                        <Text style={styles.mealName}>
                          {meal.name}
                          {recentlySwappedMeal && 
                           recentlySwappedMeal.dayIndex === dayIndex && 
                           recentlySwappedMeal.mealIndex === mealIndex && (
                            <Text style={styles.swappedBadge}> (New)</Text>
                          )}
                        </Text>
                        
                        {/* Add pencil icon for editing meals */}
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleMealEdit(meal, dayIndex, mealIndex)}
                        >
                          <Ionicons name="pencil" size={24} color="#444" />
                        </TouchableOpacity>
                      </View>
                      
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
      
      {/* Meal Action Modal */}
      {mealActionModalVisible && selectedMeal && (
        <MealActionModal
          visible={mealActionModalVisible}
          onClose={() => setMealActionModalVisible(false)}
          onSwap={handleMealSwap}
          onEditIngredients={handleEditIngredients}
          mealName={selectedMeal.meal.name}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  shoppingListButton: {
    padding: 8,
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mealsSection: {
    padding: 16,
  },
  exercise: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
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
    marginBottom: 4,
  },
  cuesSection: {
    marginTop: 8,
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
  meal: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  macros: {
    marginBottom: 8,
  },
  macroText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  ingredientsSection: {
    marginBottom: 8,
  },
  instructionsSection: {
    marginBottom: 8,
  },
  notesSection: {
    marginTop: 8,
  },
  actionButton: {
    padding: 4,
  },
  swappedMealCard: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  swappedBadge: {
    color: '#FF5722',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ScheduleScreen;