import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
  Animated
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { planService } from '../../services/planService';
import { progressService } from '../../services/progressService';
import { Ionicons } from '@expo/vector-icons';
import MealActionModal from '../../components/meals/MealActionModal';
import ExerciseCompletionModal, { ExerciseLogData } from '../../components/workout/ExerciseCompletionModal';
import ExerciseSwapModal from '../../components/workout/ExerciseSwapModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { Exercise, Meal } from '../../types/plan.types';

// Define Enhanced Exercise type (copied from HomeScreen)
interface EnhancedExercise extends Exercise {
  isSwapped?: boolean;
  originalExerciseName?: string | null;
  suggestedWeight?: number | null;
  suggestedWeightUnit?: 'kg' | 'lbs' | null;
  previousWeight?: number | null;
  painReportedLastTime?: boolean;
  isCompleted?: boolean; 
}

// Define Enhanced Day Workout type
interface EnhancedDayWorkout {
  focus: string;
  exercises: EnhancedExercise[];
}

// Define Enhanced Day Plan type
interface EnhancedDayPlan {
  date: Date; // Expect Date object in state
  workout: EnhancedDayWorkout | null;
  meals: Meal[];
  progress?: { // Make progress optional as it might not always be present
    completedWorkouts?: Date[];
    completedMeals?: { date: Date; mealNumber: number }[];
  };
}

// Helper to process week plan data (similar to HomeScreen)
const processWeekPlanData = (weekData: any[] | null | undefined): EnhancedDayPlan[] => {
  if (!weekData) return [];
  return weekData.map(day => {
    let processedDate = new Date(0); // Default date
    if (typeof day.date === 'string') {
      const parsed = new Date(day.date);
      if (!isNaN(parsed.getTime())) processedDate = parsed;
    } else if (day.date instanceof Date) {
      processedDate = day.date;
    }

    const enhancedWorkout = day.workout ? {
      ...day.workout,
      exercises: (day.workout.exercises || []).map((ex: any) => ({
        ...ex,
        isSwapped: ex.isSwapped ?? false,
        originalExerciseName: ex.originalExerciseName ?? null,
        suggestedWeight: ex.suggestedWeight ?? null,
        suggestedWeightUnit: ex.suggestedWeightUnit ?? null,
        previousWeight: ex.previousWeight ?? null,
        painReportedLastTime: ex.painReportedLastTime ?? false,
        isCompleted: false 
      })) as EnhancedExercise[],
    } : null;
    
    return {
        date: processedDate,
        workout: enhancedWorkout,
        meals: day.meals || [],
        progress: day.progress || { completedWorkouts: [], completedMeals: [] } // Ensure progress exists
    } as EnhancedDayPlan;
  }).filter(day => !isNaN(day.date.getTime())); // Filter out days with invalid dates
};

// Define a type for the selected meal
interface SelectedMealInfo {
  meal: Meal;
  dayIndex: number;
  mealNumber: number;
  date: string; // Keep date as string here for navigation params maybe?
}

type ScheduleScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ScheduleScreen = () => {
  // Use EnhancedDayPlan array type
  const [weekPlan, setWeekPlan] = useState<EnhancedDayPlan[] | null>(null);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true); // Use true initially
  const navigation = useNavigation<ScheduleScreenNavigationProp>();
  
  // Ref to track refresh in progress and prevent loops
  const refreshInProgress = useRef(false);
  
  // Add states for meal actions
  const [mealActionModalVisible, setMealActionModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<SelectedMealInfo | null>(null);
  const [recentlySwappedMeal, setRecentlySwappedMeal] = useState<{dayIndex: number, mealIndex: number} | null>(null);

  // --- Exercise Tracking States --- 
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [swapModalVisible, setSwapModalVisible] = useState(false);
  const [selectedExerciseInfo, setSelectedExerciseInfo] = useState<{ exercise: EnhancedExercise, dayIndex: number } | null>(null);
  const [alternativeOptions, setAlternativeOptions] = useState<string[]>([]);
  // State to track completed exercises { dayIndex: number, exerciseIndex: number }[]
  const [completedExercises, setCompletedExercises] = useState<Map<string, boolean>>(new Map());

  // --- Helper to generate unique key for completed exercises --- 
  const getCompletedExerciseKey = (dayIndex: number, exerciseIndex: number): string => {
    return `${dayIndex}-${exerciseIndex}`;
  };

  // Track if the component has mounted
  const isMounted = useRef(false);
  
  // Initial data loading effect - runs only once on mount
  useEffect(() => {
    console.log('ScheduleScreen mounted, performing clean initialization');
    
    // Reset ALL state flags to ensure a clean start
    refreshInProgress.current = false;
    isMounted.current = true;
    
    // Small delay before the first fetch to ensure the component is fully mounted
    // This prevents race conditions with navigation events
    const initTimer = setTimeout(() => {
      if (isMounted.current) {
        console.log('ScheduleScreen initialization complete, fetching initial data with forced flag');
        fetchWeekPlan(true); // Force the initial fetch to bypass any stale state checks
      }
    }, 300);
    
    return () => {
      console.log('ScheduleScreen unmounting, cleaning up');
      clearTimeout(initTimer); // Clear the initialization timer
      isMounted.current = false;
      refreshInProgress.current = false; // Reset the flag on unmount too
    };
  }, []); // Empty dependency array means this runs once on mount

  useFocusEffect(
    useCallback(() => {
      // Skip if component isn't mounted or is already loading
      if (!isMounted.current || loading || refreshInProgress.current) {
        console.log('Focus effect: Skipping refresh - component not ready or already loading');
        return;
      }
      
      console.log('ScheduleScreen focused, checking for refresh needs');
      
      const handleScreenFocus = async () => {
        // Skip if refresh is already in progress - CRITICAL CHECK
        if (refreshInProgress.current) {
          console.log('Focus handler: Skipping - refresh already in progress');
          return;
        }
        
        // Check for navigation params to handle refresh and swapped meal info
        // Look through the routes to find the current params
        const currentRoute = navigation.getState().routes.find(r => 
          r.name === 'MainTabs' && 
          (r.params as any)?.screen === 'Schedule'
        );
        const params = (currentRoute?.params as any)?.params;
        
        // Log params for debugging
        console.log('Schedule focus with params:', params);
        
        // Set ref to prevent concurrent refresh attempts - BEFORE any async operations
        refreshInProgress.current = true;
        
        try {
          // Check for meal updated flag first - this requires special treatment
          if (params && params.mealUpdated) {
            console.log(`Meal update detected for meal ID: ${params.mealUpdated}, forcing thorough refresh`);
            
            // Use strong refresh for meal updates to ensure data consistency
            setLoading(true);
            try {
              await planService.strongRefresh();
              await fetchWeekPlan(true); // Pass true to indicate this is a forced refresh
            } catch (error) {
              console.error('Strong refresh failed, falling back to normal refresh:', error);
              await fetchWeekPlan(true); // Still a forced refresh
            } finally {
              // If we have a day index, expand that day
              if (typeof params.dayIndex === 'number') {
                setExpandedDays(prev => ({
                  ...prev,
                  [params.dayIndex]: true
                }));
              }
              
              // Clear the params after handling - with a longer timeout
              if (isMounted.current) {
                setTimeout(() => {
                  if (isMounted.current) {
                    navigation.setParams({
                      refresh: undefined,
                      forceRefresh: undefined,
                      swappedMealInfo: undefined,
                      dayIndex: undefined,
                      mealUpdated: undefined
                    });
                  }
                }, 1000); // Longer timeout to ensure no collision
              }
            }
            
            return; // Skip regular refresh handling
          }
          
          // Handle navigation params for swapped meal info
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
                if (isMounted.current) {
                  setTimeout(() => {
                    if (isMounted.current) {
                      setRecentlySwappedMeal(null);
                    }
                  }, 3000);
                }
              }
                
              // Clear the params after handling - with a longer timeout
              if (isMounted.current) {
                setTimeout(() => {
                  if (isMounted.current) {
                    navigation.setParams({
                      refresh: undefined,
                      forceRefresh: undefined,
                      swappedMealInfo: undefined,
                      dayIndex: undefined
                    });
                  }
                }, 1000); // Longer timeout
              }
            }
            
            // Fetch week plan once if refresh is requested - with the forced flag
            await fetchWeekPlan(true);
            return;
          }
          
          // Only fetch on initial load or when explicitly needed
          if (weekPlan === null) {
            await fetchWeekPlan();
          }
        } finally {
          // Always clear the refresh flag when done - with longer timeout
          if (isMounted.current) {
            setTimeout(() => {
              if (isMounted.current) {
                console.log('Clearing refresh flag after focus handler');
                refreshInProgress.current = false;
              }
            }, 1000); // Increased from 300ms to 1000ms to reduce race conditions
          }
        }
      };
      
      handleScreenFocus();
      
      return () => {
        // No cleanup needed here
      };
    }, [navigation]) // Remove weekPlan and loading dependencies to prevent re-runs
  );

  const fetchWeekPlan = async (forced = false) => {
    // Add a forced parameter to allow override in specific cases
    
    // Prevent fetching if we're already loading, unless forced
    if ((loading || refreshInProgress.current) && !forced) {
      console.log('Skipping fetch request - already loading or refresh in progress');
      return;
    }
    
    // Generate unique request ID for tracing
    const requestId = Date.now();
    console.log(`Week plan fetch started (ID: ${requestId})`);
    
    // Set both state and ref flags
    setLoading(true);
    refreshInProgress.current = true;
    
    // Create a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted.current) {
        console.log(`⚠️ API REQUEST TIMEOUT (ID: ${requestId}) - Force resetting loading state after 15 seconds`);
        setLoading(false);
        refreshInProgress.current = false;
      }
    }, 15000); // 15 second timeout
    
    try {
      console.log(`Fetching week plan data from API (ID: ${requestId})`);
      const response = await planService.getWeekPlan();
      console.log(`Week plan API response received (ID: ${requestId})`);
      
      // Clear timeout since we got a response
      clearTimeout(timeoutId);
      
      // Only process if component is still mounted
      if (!isMounted.current) {
        console.log(`Component unmounted during fetch, aborting (ID: ${requestId})`);
        return;
      }
      
      // Process fetched data to ensure it matches EnhancedDayPlan[]
      const processedData = processWeekPlanData(response);
      
      // Check if the processed data is valid
      if (!processedData || !Array.isArray(processedData) || processedData.length === 0) {
        console.error(`Received invalid or empty week plan data (ID: ${requestId})`);
        if (isMounted.current) {
          setLoading(false);
          refreshInProgress.current = false;
          Alert.alert('Error', 'Received invalid schedule data from the server.');
        }
        return;
      }
      
      // Valid data, update state
      setWeekPlan(processedData); 
      // Reset completion status on successful fetch - but no need to reset expanded state
      setCompletedExercises(new Map()); 
      console.log(`Week plan fetch successful (ID: ${requestId}) - received ${processedData.length} days`);
    } catch (error) {
      // Clear timeout if there was an error
      clearTimeout(timeoutId);
      
      console.error(`Error fetching week plan (ID: ${requestId}):`, error);
      // Only show alert if component is still mounted
      if (isMounted.current) {
        Alert.alert('Error', 'Could not fetch week plan. Please try again.');
      }
      // Don't clear existing data on error to maintain some UI state
      // only set to null if we had no data before
      if (!weekPlan && isMounted.current) {
        setWeekPlan(null);
      }
    } finally {
      // Clear timeout in finally block to ensure it's always cleared
      clearTimeout(timeoutId);
      
      // Only update state if component is still mounted
      if (isMounted.current) {
        setLoading(false);
        // Clear the ref flag with a longer delay to prevent immediate refetching
        setTimeout(() => {
          if (isMounted.current) {
            console.log(`Request completed and refresh pending cleared (ID: ${requestId})`);
            refreshInProgress.current = false;
          }
        }, 1000); // Increased from 300ms to 1000ms to reduce race conditions
      }
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
        date: weekPlan[dayIndex].date.toISOString().split('T')[0],
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

  // --- NEW HANDLERS for Exercise Modals --- 

  const handleOpenCompletionModal = (exercise: EnhancedExercise, dayIndex: number) => {
    setSelectedExerciseInfo({ exercise, dayIndex });
    setCompletionModalVisible(true);
  };

  const handleCloseCompletionModal = () => {
    setCompletionModalVisible(false);
    setSelectedExerciseInfo(null);
  };

  const handleSubmitExerciseLog = async (logData: ExerciseLogData) => {
    if (!selectedExerciseInfo || !weekPlan) return;
    console.log('Submitting log from ScheduleScreen:', logData);
    
    const { exercise, dayIndex } = selectedExerciseInfo;
    const workoutDate = weekPlan[dayIndex].date.toISOString(); // Get date for the log
    
    // First, find the exercise index
    const exerciseIndex = weekPlan[dayIndex].workout?.exercises.findIndex(ex => ex.name === exercise.name);
    if (exerciseIndex === undefined || exerciseIndex === -1) {
      Alert.alert("Error", "Could not find exercise in the plan.");
      return;
    }
    
    // Check if this exercise is already completed today
    const completedKey = getCompletedExerciseKey(dayIndex, exerciseIndex);
    if (completedExercises.get(completedKey)) {
      Alert.alert(
        "Already Completed", 
        `You've already logged ${exercise.name} today! Want to log it again?`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Log Again", 
            onPress: () => submitExerciseLog(logData, dayIndex, exercise, exerciseIndex, workoutDate)
          }
        ]
      );
      return;
    }
    
    // If not already completed, proceed with submission
    await submitExerciseLog(logData, dayIndex, exercise, exerciseIndex, workoutDate);
  };
  
  // Extract the actual submission logic to a separate function
  const submitExerciseLog = async (
    logData: ExerciseLogData, 
    dayIndex: number, 
    exercise: EnhancedExercise, 
    exerciseIndex: number, 
    workoutDate: string
  ) => {
    try {
      await progressService.logExerciseCompletion({ 
        ...logData, 
        exerciseName: exercise.name, // Use the displayed exercise name
        workoutDate: workoutDate // Pass the specific date
      });
      showToast(`${exercise.name} log submitted!`);
      handleCloseCompletionModal();
      
      // Update UI to show completion for this specific exercise instance
      const key = getCompletedExerciseKey(dayIndex, exerciseIndex);
      
      setCompletedExercises(prev => {
        const newMap = new Map(prev);
        newMap.set(key, true);
        
        // Check if all exercises for this day are completed
        if (weekPlan && weekPlan[dayIndex].workout) {
          const dayExercises = weekPlan[dayIndex].workout.exercises;
          let allCompleted = true;
          
          for (let i = 0; i < dayExercises.length; i++) {
            const exerciseKey = getCompletedExerciseKey(dayIndex, i);
            if (!newMap.get(exerciseKey)) {
              allCompleted = false;
              break;
            }
          }
          
          if (allCompleted) {
            // Show celebration message when all exercises are completed
            setTimeout(() => {
              const dayDate = new Date(weekPlan[dayIndex].date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
              showToast(`🎉 Workout for ${dayDate} completed! Great job! 💪`);
            }, 500);
          }
        }
        
        return newMap;
      });

    } catch (error) {
      console.error("Error submitting exercise log from ScheduleScreen:", error);
      Alert.alert("Log Error", error instanceof Error ? error.message : "Could not submit log.");
    }
  };

  const handleOpenSwapModal = async (exercise: EnhancedExercise, dayIndex: number) => {
    const nameToFetch = exercise.isSwapped ? exercise.originalExerciseName : exercise.name;
    if (!nameToFetch) {
        Alert.alert("Error", "Cannot determine original exercise name for swap.");
        return;
    }
    
    setSelectedExerciseInfo({ exercise, dayIndex }); // Store context
    try {
      setLoading(true); 
      const alternatives = await progressService.getExerciseAlternatives(nameToFetch);
      setAlternativeOptions(alternatives);
      setSwapModalVisible(true);
    } catch (error) {
      console.error("Error fetching alternatives:", error);
      Alert.alert("Swap Error", error instanceof Error ? error.message : "Could not fetch alternatives.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSwapModal = () => {
    setSwapModalVisible(false);
    setSelectedExerciseInfo(null);
    setAlternativeOptions([]);
  };

  const handleSelectSwap = async (swappedExerciseName: string) => {
    if (!selectedExerciseInfo || !weekPlan) return;

    const { exercise, dayIndex } = selectedExerciseInfo;
    const originalName = exercise.originalExerciseName || exercise.name;
    const dateString = weekPlan[dayIndex].date.toISOString();
    
    console.log(`Swapping ${originalName} with ${swappedExerciseName} on ScheduleScreen for date ${dateString}`);

    try {
      await progressService.swapExercise(originalName, swappedExerciseName, dateString);
      showToast(`${originalName} swapped with ${swappedExerciseName} for today!`);
      handleCloseSwapModal();
      // Force refresh the plan data to show the swap and new suggestions
      fetchWeekPlan(); // Refresh the whole week
    } catch (error) {
      console.error("Error swapping exercise from ScheduleScreen:", error);
      Alert.alert("Swap Error", error instanceof Error ? error.message : "Could not swap exercise.");
    }
  };

   // --- Toast Notification Logic (Copied from HomeScreen, adjust if needed) ---
   const [toastVisible, setToastVisible] = useState(false);
   const [toastMessage, setToastMessage] = useState('');
   const toastOpacity = useRef(new Animated.Value(0)).current; // Need to import Animated
 
   const showToast = (message: string) => {
     setToastMessage(message);
     setToastVisible(true);
     Animated.sequence([
       Animated.timing(toastOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
       Animated.delay(2000),
       Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
     ]).start(() => { setToastVisible(false); });
   };

  if (loading) { // Check loading state first
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF0000" />
          <Text style={styles.loadingText}>Loading your schedule...</Text>
          
          {/* Add a button to manually retry after 5 seconds */}
          <TouchableOpacity
            style={[styles.retryButton, { opacity: 0.8 }]}
            onPress={() => {
              console.log('Manual refresh triggered by user');
              refreshInProgress.current = false; // Reset the flag first
              fetchWeekPlan(true); // Force refresh
            }}
          >
            <Text style={styles.retryButtonText}>Tap to refresh</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!weekPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}> 
            <Text style={styles.errorText}>No plan found or failed to load.</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => {
                console.log('Manual refresh triggered by user from error state');
                refreshInProgress.current = false; // Reset the flag first
                fetchWeekPlan(true); // Force refresh
              }}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Toast notification */}
      {toastVisible && (
        <Animated.View style={[styles.toastContainer, { opacity: toastOpacity }]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}

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
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </Text>
              <Text style={styles.expandIcon}>
                {expandedDays[dayIndex] ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>

            {expandedDays[dayIndex] && (
              <>
                {day.workout && (
                  <View style={styles.workoutSection}>
                    <Text style={styles.sectionTitle}>{day.workout.focus}</Text>
                    {day.workout.exercises.map((exercise, exerciseIndex) => {
                       const completedKey = getCompletedExerciseKey(dayIndex, exerciseIndex);
                       const isCompleted = completedExercises.get(completedKey) || false;
                       return (
                         <View key={exerciseIndex} style={styles.exercise}>
                            {/* Exercise Header with Name and Actions */} 
                            <View style={styles.exerciseHeader}>
                              <Text style={styles.exerciseName}>
                                 {exercise.name}
                                 {exercise.isSwapped && <Text style={styles.swappedText}> (Swapped)</Text>}
                              </Text>
                              <View style={styles.exerciseActions}>
                                 <TouchableOpacity onPress={() => handleOpenSwapModal(exercise, dayIndex)} style={styles.iconButton}>
                                    <Ionicons name="swap-horizontal-outline" size={24} color="#FF0000" />
                                 </TouchableOpacity>
                                 <TouchableOpacity onPress={() => handleOpenCompletionModal(exercise, dayIndex)} style={styles.iconButton}>
                                    <Ionicons 
                                       name={isCompleted ? "checkmark-circle" : "checkmark-circle-outline"} 
                                       size={28} 
                                       color={isCompleted ? "#4CAF50" : "#ccc"} 
                                    />
                                 </TouchableOpacity>
                              </View>
                           </View>
                           
                           {/* Target Sets/Reps */} 
                           <Text style={styles.exerciseDetails}>Target: {exercise.sets} × {exercise.reps}</Text>

                           {/* Suggested Weight & Progression */} 
                           {exercise.suggestedWeight !== null && (
                             <Text style={styles.suggestionText}>
                                Suggest: {exercise.suggestedWeight}{exercise.suggestedWeightUnit}
                                {(exercise.previousWeight !== null && typeof exercise.suggestedWeight === 'number' && typeof exercise.previousWeight === 'number') && 
                                 ` (${exercise.suggestedWeight >= exercise.previousWeight ? '+' : ''}${(exercise.suggestedWeight - exercise.previousWeight).toFixed(1)}${exercise.suggestedWeightUnit})`
                                }
                             </Text>
                           )}
                           
                           {/* Pain Warning */} 
                           {exercise.painReportedLastTime && (
                             <View style={styles.painWarningContainer}>
                               <Ionicons name="warning-outline" size={16} color="#FFA500" />
                               <Text style={styles.painWarningText}>
                                 Pain reported last time. Consider swapping this exercise.
                               </Text>
                               <TouchableOpacity 
                                 style={styles.swapSuggestionButton}
                                 onPress={() => handleOpenSwapModal(exercise, dayIndex)}
                               >
                                 <Text style={styles.swapSuggestionButtonText}>Swap</Text>
                               </TouchableOpacity>
                             </View>
                           )}

                           {/* Notes & Cues */}
                           {exercise.notes && (
                             <Text style={styles.notes}>{exercise.notes}</Text>
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
                       );
                      })}
                  </View>
                )}

                {/* --- Meals Section (Keep Existing) --- */} 
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
                      {/* Potentially add expanded view for ingredients/instructions if desired */} 
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Modals */}
       {selectedExerciseInfo && (
          <ExerciseCompletionModal
             visible={completionModalVisible}
             onClose={handleCloseCompletionModal}
             onSubmit={handleSubmitExerciseLog}
             exerciseName={selectedExerciseInfo.exercise.name || ''}
             targetSets={selectedExerciseInfo.exercise.sets ? Number(selectedExerciseInfo.exercise.sets) : 0}
             targetReps={selectedExerciseInfo.exercise.reps ? Number(selectedExerciseInfo.exercise.reps) : 0}
             previousWeight={selectedExerciseInfo.exercise.previousWeight}
             previousWeightUnit={selectedExerciseInfo.exercise.suggestedWeightUnit}
           />
        )}
       {selectedExerciseInfo && (
          <ExerciseSwapModal
             visible={swapModalVisible}
             onClose={handleCloseSwapModal}
             onSelectSwap={handleSelectSwap}
             alternativeOptions={alternativeOptions}
             originalExerciseName={selectedExerciseInfo.exercise.originalExerciseName || selectedExerciseInfo.exercise.name}
           />
        )}

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

// --- Styles --- 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light background
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  shoppingListButton: {
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  dayCard: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expandIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mealsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  exercise: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1, // Allow name to wrap
    marginRight: 8, // Add margin to prevent overlap
  },
  swappedText: {
    fontStyle: 'italic',
    color: '#666',
    fontSize: 14,
  },
  exerciseActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10, 
    padding: 5, 
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 14,
    color: '#007bff', 
    fontStyle: 'italic',
    marginBottom: 5,
  },
  painWarningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FFA500',
  },
  painWarningText: {
    fontSize: 14,
    color: '#FF8C00',
    marginLeft: 6,
    flex: 1,
  },
  swapSuggestionButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  swapSuggestionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  notes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
    marginBottom: 8,
  },
  cuesSection: {
    marginTop: 8,
  },
  subTitle: {
    fontSize: 14,
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
    marginBottom: 16,
    backgroundColor: '#f8f9fa', // Slightly different background for meals
    padding: 12,
    borderRadius: 6,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1, // Allow name to wrap
    marginRight: 8, // Add margin
  },
  actionButton: {
    padding: 5,
  },
  macros: {
    marginBottom: 8,
  },
  macroText: {
    fontSize: 14,
    color: '#666',
  },
  swappedMealCard: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    paddingLeft: 12, 
  },
  swappedBadge: {
    color: '#FF5722',
    fontWeight: 'bold',
    fontSize: 14,
  },
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FF0000', // Or use a success color
    zIndex: 1000,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 15,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#ff3b30',
    textAlign: 'center',
  },
});

export default ScheduleScreen;