import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
  Animated,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';  // Added RouteProp
import { planService } from '../services/planService';
import { DayPlan, Meal } from '../types/plan.types';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, BottomTabParamList } from '../types/navigation.types';
import { Ionicons } from '@expo/vector-icons';
import MealActionModal from '../components/meals/MealActionModal';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type HomeScreenRouteProp = RouteProp<BottomTabParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [todaysPlan, setTodaysPlan] = useState<DayPlan | null>(null);
  const [activeTab, setActiveTab] = useState<'Diet' | 'Training'>('Diet');
  const [loading, setLoading] = useState(true);
  const route = useRoute<HomeScreenRouteProp>();
  
  // New states for meal editing
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<{meal: Meal, index: number} | null>(null);
  const [mealActionModalVisible, setMealActionModalVisible] = useState(false);
  // Add a state to track and highlight recently swapped meal
  const [recentlySwappedMeal, setRecentlySwappedMeal] = useState<number | null>(null);
  
  // Refs to track screen focus and prevent double fetches
  const isMounted = useRef(true);
  const refreshPending = useRef(false);
  
  // Get initial plan from navigation params - now properly typed
  const initialPlan = route.params?.initialPlan;

  // Add states for toast notification
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    isMounted.current = true;
    
    // If we have an initial plan from LoadingScreen, use it
    if (initialPlan) {
      setTodaysPlan(initialPlan);
      setLoading(false);
    } else {
      fetchTodaysPlan();
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [initialPlan]);

  // Show toast notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    
    Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToastVisible(false);
    });
  };

  // Enhanced focus effect with better refresh handling
  useFocusEffect(
    useCallback(() => {
      console.log('Home screen focused, params:', route.params);
      
      // Create a unique ID for this focus event
      const focusId = Date.now();
      const currentFocusId = focusId;
      
      // Check if we have direct plan data from meal swap
      if (route.params?.directPlan) {
        console.log('Using direct plan data received after meal swap');
        setTodaysPlan(route.params.directPlan);
        
        // If we have swapped meal info, show a visual confirmation
        if (route.params?.swappedMealInfo) {
          const { mealNumber, newMealName, originalMealName } = route.params.swappedMealInfo;
          
          // Show toast notification
          showToast(`Meal swapped: ${newMealName} replaced ${originalMealName}`);
          
          // Set the recently swapped meal for highlighting
          setRecentlySwappedMeal(mealNumber - 1); // Convert to 0-based index
          
          // Clear the highlight after 3 seconds
          setTimeout(() => {
            if (isMounted.current) {
              setRecentlySwappedMeal(null);
            }
          }, 3000);
        }
        
        // Clear the direct plan and other navigation params to avoid reusing on next focus
        setTimeout(() => {
          if (isMounted.current) {
            navigation.setParams({
              directPlan: undefined,
              swappedMealInfo: undefined,
              refresh: undefined,
              forceRefresh: undefined
            });
          }
        }, 500);
        
        return; // Skip regular refresh logic when using direct plan
      }
      
      // Check if a meal was updated and needs special handling
      const mealUpdated = route.params?.mealUpdated;
      if (mealUpdated) {
        console.log(`Meal update detected for meal ID: ${mealUpdated}, forcing refresh`);
        // Force a thorough refresh
        setLoading(true);
        planService.invalidateCache().then(() => {
          fetchTodaysPlan(true);
        });
        
        // Clear the meal updated param to avoid repeated refreshes
        setTimeout(() => {
          if (isMounted.current) {
            navigation.setParams({ 
              mealUpdated: undefined,
              refresh: undefined,
              forceRefresh: undefined 
            });
          }
        }, 500);
        
        return;
      }
      
      // Unified refresh logic - handles both forceRefresh and regular refresh
      const shouldRefresh = route.params?.forceRefresh === true || 
                           route.params?.refresh === true || 
                           typeof route.params?.refresh === 'number';
      
      if (shouldRefresh) {
        console.log('Refresh requested, fetching fresh plan data');
        setLoading(true);
        
        const performRefresh = async () => {
          try {
            // For forceRefresh, do a thorough cache invalidation first
            if (route.params?.forceRefresh === true) {
              await planService.invalidateCache();
              await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            // Only fetch if this is still the current focus event
            if (isMounted.current && currentFocusId === focusId) {
              await fetchTodaysPlan(true);
            }
          } catch (error) {
            console.error('Error during refresh:', error);
          } finally {
            if (isMounted.current) {
              setLoading(false);
            }
          }
        };
        
        // Small delay to avoid race conditions
        setTimeout(() => {
          if (isMounted.current && currentFocusId === focusId) {
            performRefresh();
          }
        }, 100);
        
        // Clear the refresh params after handling them
        setTimeout(() => {
          if (isMounted.current) {
            navigation.setParams({ 
              refresh: undefined,
              forceRefresh: undefined
            });
          }
        }, 500);
      }
      
      return () => {
        // Reset refresh pending when screen loses focus
        refreshPending.current = false;
      };
    }, [route.params?.refresh, route.params?.forceRefresh, route.params?.directPlan, route.params?.mealUpdated])
  );

  const fetchTodaysPlan = async (forceRefresh = false) => {
    // Prevent duplicate fetch requests
    if (refreshPending.current) {
      console.log('Skipping duplicate fetch request - refresh already pending');
      return;
    }
    
    // Log fetch attempt with a request ID for tracing
    const requestId = Date.now();
    console.log(`Plan request started (ID: ${requestId})${forceRefresh ? ' FORCE REFRESH' : ''}`);
    
    // Mark refresh as pending and show loading state
    refreshPending.current = true;
    setLoading(true);
    
    try {
      // Fetch plan data
      const plan = await planService.getTodaysPlan(forceRefresh);
      
      // Only update state if the component is still mounted
      if (isMounted.current && plan) {
        console.log(`Plan fetched successfully (ID: ${requestId})`);
        
        console.log('HOME SCREEN - RENDERING with todaysPlan:', JSON.stringify({
          hasPlan: !!plan,
          mealCount: plan.meals?.length,
          firstMealType: typeof plan.meals?.[0],
          firstMealIsArray: Array.isArray(plan.meals?.[0]),
          firstMealName: plan.meals?.[0]?.name,
          dateType: typeof plan.date
        }));
        
        // Safely process the plan data to match DayPlan type
        try {
          // Ensure meals array exists and has the right structure
          const mealsWithInstructions = (plan.meals || []).map(meal => ({
            ...meal,
            instructions: meal.instructions || [],
            structuredIngredients: meal.structuredIngredients || []
          }));
          
          // Create a clean plan object with proper types
          const processedPlan = {
            // Handle date conversion - ensure it's a Date object
            date: typeof plan.date === 'string' ? new Date(plan.date) : plan.date,
            meals: mealsWithInstructions,
            workout: plan.workout || null,
            progress: {
              completedWorkouts: (plan.progress?.completedWorkouts || []).map(
                date => typeof date === 'string' ? new Date(date) : date
              ),
              completedMeals: (plan.progress?.completedMeals || []).map(
                meal => ({
                  ...meal,
                  date: typeof meal.date === 'string' ? new Date(meal.date) : meal.date
                })
              )
            }
          };
          
          // Set the processed plan data
          setTodaysPlan(processedPlan);
        } catch (error) {
          console.error(`Error processing plan data (ID: ${requestId}):`, error);
          setTodaysPlan(null);
        }
      } else if (isMounted.current) {
        console.log(`No plan data received (ID: ${requestId})`);
        setTodaysPlan(null);
      }
    } catch (error) {
      console.error(`Error fetching today's plan (ID: ${requestId}):`, error);
      
      if (isMounted.current) {
        setTodaysPlan(null);
        
        // Show error toast
        showToast(`Failed to load plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      // Update UI state if component is still mounted
      if (isMounted.current) {
        setLoading(false);
      }
      
      // Clear the refresh pending flag with a delay to prevent rapid consecutive fetches
      setTimeout(() => {
        if (isMounted.current) {
          refreshPending.current = false;
          console.log(`Request completed and refresh pending cleared (ID: ${requestId})`);
        }
      }, 500);
    }
  };

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
  
  // New handlers for meal editing
  const handleMealEdit = (meal: Meal, index: number) => {
    setSelectedMeal({ meal, index });
    setMealActionModalVisible(true);
  };
  
  const handleMealSwap = () => {
    setMealActionModalVisible(false);
    
    if (selectedMeal) {
      navigation.navigate('MealSwap', {
        originalMeal: selectedMeal.meal,
        date: new Date().toISOString(),
        mealNumber: selectedMeal.index + 1,
        referrer: 'Home'
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
        date: typeof todaysPlan?.date === 'object' 
          ? todaysPlan?.date.toISOString() 
          : todaysPlan?.date || new Date().toISOString(),
        mealNumber: selectedMeal.index + 1,
        referrer: 'Home'
      });
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
      {/* Toast notification */}
      {toastVisible && (
        <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}
      
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
        {/* Log meal data before rendering */}
        {(() => {
          console.log('HOME SCREEN - RENDERING with todaysPlan:', JSON.stringify({
            hasPlan: !!todaysPlan,
            mealCount: todaysPlan?.meals?.length || 0,
            firstMealType: typeof todaysPlan?.meals?.[0],
            firstMealIsArray: Array.isArray(todaysPlan?.meals?.[0]),
            firstMealName: todaysPlan?.meals?.[0]?.name || 'No meal name'
          }));
          return null;
        })()}
        {todaysPlan.meals && todaysPlan.meals.length > 0 ? (
          todaysPlan.meals.map((meal, index) => (
            <View 
              key={index} 
              style={[
                styles.card,
                recentlySwappedMeal === index && styles.swappedMealCard // Highlight swapped meal
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>
                  {meal.name}
                  {recentlySwappedMeal === index && (
                    <Text style={styles.swappedBadge}> (New)</Text>
                  )}
                </Text>
                <View style={styles.cardActions}>
                  {/* Expand Details Button */}
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setExpandedMeal(expandedMeal === index ? null : index)}
                  >
                    <Ionicons 
                      name={expandedMeal === index ? "remove-circle-outline" : "add-circle-outline"} 
                      size={24} 
                      color="#444" 
                    />
                  </TouchableOpacity>
                  
                  {/* Edit/Swap Button */}
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleMealEdit(meal, index)}
                  >
                    <Ionicons name="pencil" size={24} color="#444" />
                  </TouchableOpacity>
                  
                  {/* Existing Complete Button */}
                  <TouchableOpacity
                    style={[
                      styles.completeButton,
                      todaysPlan.progress.completedMeals.some(
                        m => m.mealNumber === index + 1
                      ) && styles.completedButton
                    ]}
                    onPress={() => handleCompleteMeal(index + 1)}
                  >
                    <Text style={styles.completeButtonText}>
                      {todaysPlan.progress.completedMeals.some(
                        m => m.mealNumber === index + 1
                      )
                        ? 'Completed'
                        : 'Mark Complete'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.macroInfo}>
                <Text style={styles.cardText}>Calories: {meal.calories}</Text>
                <Text style={styles.cardText}>Protein: {meal.protein}g</Text>
                <Text style={styles.cardText}>Carbs: {meal.carbs}g</Text>
                <Text style={styles.cardText}>Fats: {meal.fats}g</Text>
              </View>
              
              {expandedMeal === index && (
                <>
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
                  
                  {meal.micronutrients && (
                    <View style={styles.micronutrientsSection}>
                      <Text style={styles.subTitle}>Micronutrients:</Text>
                      <View style={styles.microGrid}>
                        <View style={styles.microSection}>
                          <Text style={styles.microTitle}>Vitamins</Text>
                          {Object.entries(meal.micronutrients.vitamins).map(([key, value]) => (
                            <Text key={key} style={styles.microItem}>
                              {key.toUpperCase()}: {value}{key === 'b12' || key === 'folate' ? 'mcg' : key === 'a' || key === 'd' ? 'IU' : 'mg'}
                            </Text>
                          ))}
                        </View>
                        <View style={styles.microSection}>
                          <Text style={styles.microTitle}>Minerals</Text>
                          {Object.entries(meal.micronutrients.minerals).map(([key, value]) => (
                            <Text key={key} style={styles.microItem}>
                              {key}: {value}mg
                            </Text>
                          ))}
                        </View>
                      </View>
                    </View>
                  )}
                </>
              )}
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
          <View style={styles.exercisesContainer}>
            {todaysPlan.workout.exercises.map((exercise, index) => (
              <View key={index} style={styles.exercise}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} × {exercise.reps}
                </Text>
                {exercise.notes && (
                  <Text style={styles.notes}>{exercise.notes}</Text>
                )}
                {exercise.cues && exercise.cues.length > 0 && (
                  <View style={styles.cuesContainer}>
                    <Text style={styles.cuesTitle}>Form Cues:</Text>
                    {exercise.cues.map((cue, i) => (
                      <Text key={i} style={styles.cue}>• {cue}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={[styles.emptyStateText, {fontStyle: 'italic'}]}>
            Rest day! No workout scheduled for today.
          </Text>
        </View>
      )}
    </View>
  )}
</ScrollView>
      
      {/* Meal Action Modal */}
      <MealActionModal
        visible={mealActionModalVisible}
        onClose={() => setMealActionModalVisible(false)}
        onSwap={handleMealSwap}
        onEditIngredients={handleEditIngredients}
        mealName={selectedMeal?.meal?.name || ''}
      />
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
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 8,
    padding: 5,
  },
  macroInfo: {
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  completeButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  completeButtonText: {
    fontSize: 12,
    color: '#555',
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexShrink: 0,
    minWidth: 120,
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
  },
  micronutrientsSection: {
    marginBottom: 16,
  },
  microGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  microSection: {
    width: '50%',
    marginBottom: 10,
  },
  microTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  microItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  exercisesContainer: {
    marginTop: 12,
  },
  exercise: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cuesContainer: {
    marginTop: 8,
  },
  cuesTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  cue: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    paddingLeft: 10,
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
  toast: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FF0000',
    zIndex: 1000,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;