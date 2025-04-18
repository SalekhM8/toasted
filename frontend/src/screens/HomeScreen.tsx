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
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';  // Added RouteProp
import { planService } from '../services/planService';
import { progressService } from '../services/progressService'; // Import progress service
import { DayPlan, Meal, Exercise } from '../types/plan.types'; // Add Exercise type
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, BottomTabParamList } from '../types/navigation.types';
import { Ionicons } from '@expo/vector-icons';
import MealActionModal from '../components/meals/MealActionModal';
import ExerciseCompletionModal, { ExerciseLogData } from '../components/workout/ExerciseCompletionModal'; // Import completion modal
import ExerciseSwapModal from '../components/workout/ExerciseSwapModal'; // Import swap modal
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define Exercise type including new fields from backend
interface EnhancedExercise extends Exercise {
  isSwapped?: boolean;
  originalExerciseName?: string | null;
  suggestedWeight?: number | null;
  suggestedWeightUnit?: 'kg' | 'lbs' | null;
  previousWeight?: number | null;
  painReportedLastTime?: boolean;
  // Add completion status for UI rendering
  isCompleted?: boolean; 
}

// Update DayPlan to use EnhancedExercise
interface EnhancedDayPlan extends Omit<DayPlan, 'workout'> {
  workout: {
    focus: string;
    exercises: EnhancedExercise[];
  } | null;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type HomeScreenRouteProp = RouteProp<BottomTabParamList, 'Home'>;

// Helper function to process incoming plan data from API (assumes dates are strings)
const processPlanData = (planFromApi: any): EnhancedDayPlan | null => {
  if (!planFromApi) return null;

  // Ensure date is a Date object
  let processedDate: Date;
  if (typeof planFromApi.date === 'string') {
    processedDate = new Date(planFromApi.date);
  } else {
    console.error('Plan data is missing a valid date string from API.');
    return null; // Or handle error appropriately
  }
  if (isNaN(processedDate.getTime())) {
     console.error('Invalid date string parsed from plan data.');
     return null;
  }

  const enhancedWorkout = planFromApi.workout ? {
    ...planFromApi.workout,
    exercises: (planFromApi.workout.exercises || []).map((ex: any) => ({
      ...ex, // Spread API data
      // Ensure correct types and defaults for enhanced fields
      isSwapped: ex.isSwapped ?? false,
      originalExerciseName: ex.originalExerciseName ?? null,
      suggestedWeight: ex.suggestedWeight ?? null,
      suggestedWeightUnit: ex.suggestedWeightUnit ?? null,
      previousWeight: ex.previousWeight ?? null,
      painReportedLastTime: ex.painReportedLastTime ?? false,
      isCompleted: false // Initialize UI completion status
    })) as EnhancedExercise[],
  } : null;

  // Process progress dates (expecting strings from API)
  const processedProgress = {
       completedWorkouts: (planFromApi.progress?.completedWorkouts || []).map((d: any) => {
           if (typeof d === 'string') {
               const parsed = new Date(d);
               return !isNaN(parsed.getTime()) ? parsed : new Date(0); 
           }
           return new Date(0); 
       }),
       completedMeals: (planFromApi.progress?.completedMeals || []).map((m: any) => {
           let mealDate = new Date(0);
           if (typeof m?.date === 'string') {
               const parsed = new Date(m.date);
               if (!isNaN(parsed.getTime())) mealDate = parsed;
           }
           return { ...m, date: mealDate };
       })
   };

  // Construct the final EnhancedDayPlan object
  return {
    date: processedDate, // Store as Date object in state
    meals: planFromApi.meals || [], // Ensure meals array exists
    workout: enhancedWorkout,
    progress: processedProgress // Use processed progress with Date objects
  };
};

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [todaysPlan, setTodaysPlan] = useState<EnhancedDayPlan | null>(null);
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
  
  // Add state for calorie tracking messages
  const [calorieMessage, setCalorieMessage] = useState<string | null>(null);
  const calorieMessageOpacity = useRef(new Animated.Value(0)).current;
  
  // Exercise Tracking States
  const [completionModalVisible, setCompletionModalVisible] = useState(false);
  const [swapModalVisible, setSwapModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<EnhancedExercise | null>(null);
  const [alternativeOptions, setAlternativeOptions] = useState<string[]>([]);
  const [completedExerciseIndices, setCompletedExerciseIndices] = useState<number[]>([]);
  
  useEffect(() => {
    isMounted.current = true;
    if (initialPlan) {
      // Assume initialPlan might need processing too if structure changed
      const processedInitialPlan = processPlanData(initialPlan);
      setTodaysPlan(processedInitialPlan);
      setLoading(false);
    } else {
      fetchTodaysPlan();
    }
    return () => { isMounted.current = false; };
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

  // Calculate total calories and consumed calories
  const calculateCalories = useCallback(() => {
    if (!todaysPlan?.meals) return { total: 0, consumed: 0, percentage: 0 };
    
    // Calculate total calories from all meals
    const totalCalories = todaysPlan.meals.reduce((sum, meal) => {
      return sum + (meal.calories || 0);
    }, 0);
    
    // Calculate consumed calories from completed meals
    const consumedCalories = todaysPlan.meals.reduce((sum, meal, index) => {
      // Check if this meal is marked as completed
      const isCompleted = todaysPlan.progress.completedMeals.some(
        m => m.mealNumber === index + 1
      );
      
      // Add calories if the meal is completed
      return sum + (isCompleted ? (meal.calories || 0) : 0);
    }, 0);
    
    // Calculate percentage for progress bar (capped at 100%)
    const percentage = Math.min(100, (consumedCalories / totalCalories) * 100 || 0);
    
    return { total: totalCalories, consumed: consumedCalories, percentage };
  }, [todaysPlan]);
  
  // Show calorie status message
  const showCalorieMessage = (message: string) => {
    setCalorieMessage(message);
    calorieMessageOpacity.setValue(0);
    
    Animated.sequence([
      Animated.timing(calorieMessageOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(calorieMessageOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCalorieMessage(null);
    });
  };
  
  // Check calorie status whenever the plan changes
  useEffect(() => {
    if (!todaysPlan?.meals) return;
    
    const { total, consumed } = calculateCalories();
    
    // Get total number of meals and completed meals
    const totalMeals = todaysPlan.meals.length;
    const completedMeals = todaysPlan.progress.completedMeals.length;
    
    // Only show message when all meals are completed
    if (totalMeals > 0 && completedMeals === totalMeals) {
      if (consumed < total * 0.9) {
        showCalorieMessage("You're under your calorie target for the day. Extra weight loss today!");
      } else if (consumed > total * 1.1) {
        showCalorieMessage("You've exceeded your calorie target for the day. Adjust tomorrow if needed.");
      } else {
        showCalorieMessage("Congratulations! You've completed your day of eating on target.");
      }
    }
  }, [todaysPlan?.progress.completedMeals.length]);

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
        // Process direct plan data
        const processedDirectPlan = processPlanData(route.params.directPlan);
        setTodaysPlan(processedDirectPlan);
        
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
      // Assume planService returns data with date as ISO string
      const fetchedPlanFromApi = await planService.getTodaysPlan(forceRefresh);
      if (isMounted.current && fetchedPlanFromApi) {
        // Process the API data into the state structure
        const processedPlan = processPlanData(fetchedPlanFromApi);
        setTodaysPlan(processedPlan);
        setCompletedExerciseIndices([]); 
      } else if (isMounted.current) {
        setTodaysPlan(null);
      }
    } catch (error) {
      console.error(`Error fetching today's plan (ID: ${requestId}):`, error);
      if (isMounted.current) {
        setTodaysPlan(null);
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
    console.log('Complete workout button pressed');
    
    // Get current date for the completion
    const completionDate = new Date();
    
    // Check if already completed today to prevent duplicates
    const alreadyCompleted = todaysPlan?.progress.completedWorkouts.some(
      date => new Date(date).toDateString() === completionDate.toDateString()
    );
    
    if (alreadyCompleted) {
      console.log('Workout already completed today');
      return;
    }
    
    // Optimistically update UI first
    setTodaysPlan(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        progress: {
          ...prev.progress,
          completedWorkouts: [...prev.progress.completedWorkouts, completionDate]
        }
      };
    });
    
    // Show success toast immediately 
    showToast('Workout marked as complete!');
    
    try {
      // Then make the actual API call
      console.log('Attempting to mark workout as complete for date:', completionDate.toISOString());
      await planService.completeWorkout(completionDate);
      console.log('Complete workout API call successful');
      
      // Silently refresh the cache in the background to ensure data consistency
      planService.invalidateCache().catch(error => {
        console.error('Error invalidating cache:', error);
      });
    } catch (error) {
      console.error('Error completing workout:', error);
      
      // Revert the optimistic update on failure
      setTodaysPlan(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          progress: {
            ...prev.progress,
            completedWorkouts: prev.progress.completedWorkouts.filter(
              date => new Date(date).toDateString() !== completionDate.toDateString()
            )
          }
        };
      });
      
      // Show error message
      showToast(`Failed to mark workout as complete: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleCompleteMeal = async (mealNumber: number) => {
    console.log('Complete meal button pressed for meal:', mealNumber);
    
    // Get current date for the completion
    const completionDate = new Date();
    
    // Check if already completed to prevent duplicates
    const alreadyCompleted = todaysPlan?.progress.completedMeals.some(
      meal => 
        new Date(meal.date).toDateString() === completionDate.toDateString() && 
        meal.mealNumber === mealNumber
    );
    
    if (alreadyCompleted) {
      console.log(`Meal ${mealNumber} already completed today`);
      return;
    }
    
    // Optimistically update UI first
    setTodaysPlan(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        progress: {
          ...prev.progress,
          completedMeals: [
            ...prev.progress.completedMeals, 
            { date: completionDate, mealNumber }
          ]
        }
      };
    });
    
    // Show success toast immediately
    showToast(`Meal ${mealNumber} marked as complete!`);
    
    try {
      // Then make the actual API call
      console.log('Attempting to mark meal as complete:', {
        date: completionDate.toISOString(),
        mealNumber
      });
      await planService.completeMeal(completionDate, mealNumber);
      console.log('Complete meal API call successful');
      
      // Check if this was the last meal of the day
      const totalMeals = todaysPlan?.meals?.length || 0;
      const completedCount = (todaysPlan?.progress?.completedMeals?.length || 0) + 1;
      
      if (totalMeals > 0 && completedCount === totalMeals) {
        // Calculate calorie status
        const { total, consumed } = calculateCalories();
        
        // Add 1 meal worth of calories since the calculation may not include this meal yet
        const mealCalories = todaysPlan?.meals[mealNumber - 1]?.calories || 0;
        const updatedConsumed = consumed + mealCalories;
        
        if (updatedConsumed < total * 0.9) {
          showCalorieMessage("You're under your calorie target for the day. Extra weight loss today!");
        } else if (updatedConsumed > total * 1.1) {
          showCalorieMessage("You've exceeded your calorie target for the day. Adjust tomorrow if needed.");
        } else {
          showCalorieMessage("Congratulations! You've completed your day of eating on target.");
        }
      }
      
      // Silently refresh the cache in the background to ensure data consistency
      planService.invalidateCache().catch(error => {
        console.error('Error invalidating cache:', error);
      });
    } catch (error) {
      console.error('Error completing meal:', error);
      
      // Revert the optimistic update on failure
      setTodaysPlan(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          progress: {
            ...prev.progress,
            completedMeals: prev.progress.completedMeals.filter(
              meal => 
                !(new Date(meal.date).toDateString() === completionDate.toDateString() && 
                  meal.mealNumber === mealNumber)
            )
          }
        };
      });
      
      // Show error message
      showToast(`Failed to mark meal as complete: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

  // --- NEW HANDLERS for Exercise Modals ---

  const handleOpenCompletionModal = (exercise: EnhancedExercise) => {
    setSelectedExercise(exercise);
    setCompletionModalVisible(true);
  };

  const handleCloseCompletionModal = () => {
    setCompletionModalVisible(false);
    setSelectedExercise(null);
  };

  const handleSubmitExerciseLog = async (logData: ExerciseLogData) => {
    if (!selectedExercise || !todaysPlan?.date) return;
    
    // Check if this exercise is already completed today
    const exerciseIndex = todaysPlan?.workout?.exercises.findIndex(ex => ex.name === selectedExercise.name);
    if (exerciseIndex !== undefined && exerciseIndex !== -1 && completedExerciseIndices.includes(exerciseIndex)) {
      Alert.alert(
        "Already Completed", 
        `You've already logged ${selectedExercise.name} today! Want to log it again?`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Log Again", 
            onPress: () => submitExerciseLog(logData)
          }
        ]
      );
      return;
    }
    
    // If not already completed, proceed with submission
    await submitExerciseLog(logData);
  };
  
  // Extract the actual submission logic to a separate function
  const submitExerciseLog = async (logData: ExerciseLogData) => {
    if (!selectedExercise || !todaysPlan?.date) return;
    console.log('Submitting log:', logData);
    
    try {
      // Add the current date to the log data and pass the actual name performed (could be swapped name)
      const dateString = todaysPlan.date.toISOString();
      await progressService.logExerciseCompletion({ 
        ...logData, 
        exerciseName: selectedExercise.name,
        workoutDate: dateString 
      });
      
      showToast(`${selectedExercise.name} log submitted!`);
      handleCloseCompletionModal();
      
      // Update UI to show completion
      const exerciseIndex = todaysPlan?.workout?.exercises.findIndex(ex => ex.name === selectedExercise.name);
      if (exerciseIndex !== undefined && exerciseIndex !== -1) {
        // Only add if not already in the completed list
        if (!completedExerciseIndices.includes(exerciseIndex)) {
          setCompletedExerciseIndices(prev => {
            const newCompletedIndices = [...prev, exerciseIndex];
            
            // Check if all exercises are now completed
            if (todaysPlan.workout && newCompletedIndices.length === todaysPlan.workout.exercises.length) {
              // Show celebration message when all exercises are completed
              setTimeout(() => {
                showToast("🎉 Workout completed! Great job! 💪");
              }, 500);
            }
            
            return newCompletedIndices;
          });
        }
      }

      // Invalidate plan cache after successful logging
      // This ensures other screens will get fresh data when they focus
      await planService.invalidateCache();
      
      // Set a global flag in AsyncStorage to indicate exercise data was updated
      await AsyncStorage.setItem('exerciseDataUpdated', 'true');

    } catch (error) {
      console.error("Error submitting exercise log:", error);
      Alert.alert("Log Error", error instanceof Error ? error.message : "Could not submit log.");
    }
  };

  const handleOpenSwapModal = async (exercise: EnhancedExercise) => {
    // Use original name if swapped, otherwise current name to fetch alternatives
    const nameToFetch = exercise.isSwapped ? exercise.originalExerciseName : exercise.name;
    if (!nameToFetch) {
        Alert.alert("Error", "Cannot determine original exercise name for swap.");
        return;
    }
    
    setSelectedExercise(exercise); // Store the exercise being swapped
    try {
      setLoading(true); // Show loading indicator while fetching alternatives
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
    setSelectedExercise(null);
    setAlternativeOptions([]);
  };

  const handleSelectSwap = async (swappedExerciseName: string) => {
    if (!selectedExercise || !todaysPlan?.date) return;
    const originalName = selectedExercise.originalExerciseName || selectedExercise.name;
    // Convert Date object to ISO string for the API call
    const dateString = todaysPlan.date.toISOString();
    
    console.log(`Swapping ${originalName} with ${swappedExerciseName} for date ${dateString}`);

    try {
      await progressService.swapExercise(originalName, swappedExerciseName, dateString);
      showToast(`${originalName} swapped with ${swappedExerciseName} for today!`);
      handleCloseSwapModal();
      fetchTodaysPlan(true); // Refresh to show swap
    } catch (error) {
      console.error("Error swapping exercise:", error);
      Alert.alert("Swap Error", error instanceof Error ? error.message : "Could not swap exercise.");
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
      
      {/* Calorie status message */}
      {calorieMessage && (
        <Animated.View style={[styles.calorieMessage, { opacity: calorieMessageOpacity }]}>
          <Text style={styles.calorieMessageText}>{calorieMessage}</Text>
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
      {/* Calorie tracker */}
      {todaysPlan.meals && todaysPlan.meals.length > 0 && (
        <View style={styles.calorieTrackerContainer}>
          <View style={styles.calorieTrackerHeader}>
            <Text style={styles.calorieTrackerTitle}>Daily meals</Text>
            <Text style={styles.calorieTrackerCount}>
              {calculateCalories().consumed}/{calculateCalories().total} KCAL
            </Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${calculateCalories().percentage}%` }
              ]} 
            />
          </View>
        </View>
      )}
      
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
          </View>
          <View style={styles.exercisesContainer}>
            {todaysPlan.workout.exercises.map((exercise, index) => {
              const isCompleted = completedExerciseIndices.includes(index);
              return (
                <View
                  key={index}
                  style={[
                    styles.exerciseRow,
                    completedExerciseIndices.includes(index) && styles.completedExerciseRow
                  ]}
                >
                  <View style={styles.exerciseContent}>
                    {/* Add exercise header with action buttons */}
                    <View style={styles.exerciseHeader}>
                      <Text style={styles.exerciseName}>
                        {exercise.name}
                        {exercise.isSwapped && <Text style={styles.swappedText}> (Swapped)</Text>}
                      </Text>
                      <View style={styles.exerciseActions}>
                        <TouchableOpacity onPress={() => handleOpenSwapModal(exercise)} style={styles.iconButton}>
                          <Ionicons name="swap-horizontal-outline" size={24} color="#FF0000" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => {
                            setSelectedExercise(exercise);
                            setCompletionModalVisible(true);
                          }} 
                          style={styles.iconButton}
                        >
                          <Ionicons 
                            name={isCompleted ? "checkmark-circle" : "checkmark-circle-outline"} 
                            size={28} 
                            color={isCompleted ? "#4CAF50" : "#ccc"} 
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={styles.exerciseSets}>
                      {exercise.sets} × {exercise.reps}
                    </Text>
                    {exercise.suggestedWeight !== null && (
                      <Text style={styles.suggestionText}>
                        Suggest: {exercise.suggestedWeight}{exercise.suggestedWeightUnit}
                        {exercise.previousWeight !== null && typeof exercise.suggestedWeight === 'number' && typeof exercise.previousWeight === 'number' && 
                        ` (${exercise.suggestedWeight > exercise.previousWeight ? '+' : ''}${(exercise.suggestedWeight - exercise.previousWeight).toFixed(1)}${exercise.suggestedWeightUnit})`}
                      </Text>
                    )}
                    
                    {exercise.painReportedLastTime && (
                      <View style={styles.painWarningContainer}>
                        <Ionicons name="warning-outline" size={16} color="#FFA500" />
                        <Text style={styles.painWarningText}>
                          Pain reported last time. Consider swapping this exercise.
                        </Text>
                        <TouchableOpacity 
                          style={styles.swapSuggestionButton}
                          onPress={() => handleOpenSwapModal(exercise)}
                        >
                          <Text style={styles.swapSuggestionButtonText}>Swap</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {/* Existing Notes/Cues */}
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
                </View>
              );
             })}
          </View>
        </View>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={[styles.emptyStateText, {fontStyle: 'italic'}]}>
            {todaysPlan?.workout ? 'No exercises for today.' : 'Rest day! No workout scheduled.'}
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

      {/* Exercise Completion Modal */}
      <ExerciseCompletionModal
        visible={completionModalVisible}
        onClose={handleCloseCompletionModal}
        onSubmit={handleSubmitExerciseLog}
        exerciseName={selectedExercise?.name || ''}
        targetSets={selectedExercise?.sets ? Number(selectedExercise.sets) : 0}
        targetReps={selectedExercise?.reps ? Number(selectedExercise.reps) : 0}
        previousWeight={selectedExercise?.previousWeight}
        previousWeightUnit={selectedExercise?.suggestedWeightUnit}
      />

      {/* Exercise Swap Modal */}
      <ExerciseSwapModal
        visible={swapModalVisible}
        onClose={handleCloseSwapModal}
        onSelectSwap={handleSelectSwap}
        alternativeOptions={alternativeOptions}
        originalExerciseName={selectedExercise?.originalExerciseName || selectedExercise?.name || ''}
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
  calorieTrackerContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  calorieTrackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  calorieTrackerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  calorieTrackerCount: {
    fontSize: 16,
    color: '#666',
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  calorieMessage: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#4CAF50',
    zIndex: 1000,
  },
  calorieMessageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  suggestionContainer: {
    backgroundColor: '#f0f9ff',
    padding: 8,
    borderRadius: 6,
    marginVertical: 6,
  },
  suggestionText: {
    fontSize: 14,
    color: '#0066cc',
    fontWeight: '500',
  },
  increaseText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  decreaseText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  maintainText: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
  painWarningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 6,
    padding: 8,
    marginVertical: 6,
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
  swapButtonHighlighted: {
    backgroundColor: '#FFF3E0',
    borderRadius: 20,
  },
  exerciseRow: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  completedExerciseRow: {
    borderLeftColor: '#4CAF50',
    backgroundColor: '#f9fff9',
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseSets: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default HomeScreen;