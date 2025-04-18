import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import axios from 'axios';

import QuestionnaireContainer from '../components/plans/QuestionnaireContainer';
import HealthConditionsScreen from '../components/plans/HealthConditionsScreen';
import GoalsScreen from '../components/plans/GoalsScreen';
import DietaryPreferencesScreen from '../components/plans/DietaryPreferencesScreen';
import LifestyleScreen from '../components/plans/LifestyleScreen';
import ReviewScreen from '../components/plans/ReviewScreen';

// Import from new service - use relative paths from the frontend directory
import { preferenceService } from '../services/preferenceService';

// For TypeScript support, import types locally since they're used in the UI
enum HealthConditionEnum {
  DIABETES = 'diabetes',
  HYPERTENSION = 'hypertension',
  HEART_DISEASE = 'heart_disease',
  HIGH_CHOLESTEROL = 'high_cholesterol',
  GERD = 'gerd',
  IBS = 'ibs',
  IRON_DEFICIENCY = 'iron_deficiency',
  CALCIUM_DEFICIENCY = 'calcium_deficiency',
  VITAMIN_D_DEFICIENCY = 'vitamin_d_deficiency',
  NONE = 'none'
}

enum FitnessGoalEnum {
  WEIGHT_LOSS = 'weight_loss',
  WEIGHT_GAIN = 'weight_gain',
  MAINTAIN = 'maintain',
  MUSCLE_GAIN = 'muscle_gain',
  GENERAL_HEALTH = 'general_health',
  ATHLETIC_PERFORMANCE = 'athletic_performance'
}

enum DietaryPreferenceEnum {
  OMNIVORE = 'omnivore',
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
  PESCATARIAN = 'pescatarian',
  KETO = 'keto',
  PALEO = 'paleo',
  MEDITERRANEAN = 'mediterranean',
  GLUTEN_FREE = 'gluten_free',
  DAIRY_FREE = 'dairy_free',
  LOW_CARB = 'low_carb',
  HIGH_PROTEIN = 'high_protein'
}

enum ActivityLevelEnum {
  SEDENTARY = 'sedentary',
  LIGHTLY_ACTIVE = 'lightly_active',
  MODERATELY_ACTIVE = 'moderately_active',
  VERY_ACTIVE = 'very_active',
  EXTREMELY_ACTIVE = 'extremely_active'
}

enum CookingSkillEnum {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

enum BudgetTierEnum {
  BUDGET = 'budget',
  MODERATE = 'moderate',
  PREMIUM = 'premium'
}

type AdvancedPlanQuestionnaireNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Define the health condition type
interface HealthCondition {
  id: string;
  name: string;
  description: string;
  category: 'disease' | 'deficiency' | 'restriction';
}

// Mock data for options now properly typed
const healthConditionsData: HealthCondition[] = [
  // This data will be populated from the HealthConditionsScreen component
];

// Type definition for goal data
interface Goal {
  id: string;
  name: string;
  description: string;
}

const goalsData: Goal[] = [
  { id: 'weight_loss', name: 'Weight Loss', description: 'Reduce body fat and achieve a leaner physique' },
  { id: 'weight_gain', name: 'Weight Gain', description: 'Increase weight and build mass in a healthy way' },
  { id: 'muscle_building', name: 'Muscle Building', description: 'Gain strength and increase muscle mass' },
  { id: 'endurance', name: 'Endurance', description: 'Improve stamina and cardiovascular performance' },
  { id: 'maintenance', name: 'Maintenance', description: 'Maintain current weight and body composition' },
  { id: 'general_health', name: 'General Health', description: 'Improve overall health and wellness' }
];

// Type definition for diet type data
interface DietType {
  id: string;
  name: string;
  description: string;
}

const dietTypesData: DietType[] = [
  { id: 'omnivore', name: 'Omnivore', description: 'Includes all food groups' },
  { id: 'flexitarian', name: 'Flexitarian', description: 'Mostly plant-based with occasional meat' },
  { id: 'pescatarian', name: 'Pescatarian', description: 'Fish but no other meat' },
  { id: 'vegetarian', name: 'Vegetarian', description: 'No meat but includes dairy and eggs' },
  { id: 'vegan', name: 'Vegan', description: 'No animal products' },
  { id: 'keto', name: 'Keto', description: 'High fat, low carb' },
  { id: 'paleo', name: 'Paleo', description: 'Based on foods presumed to be eaten by early humans' },
  { id: 'mediterranean', name: 'Mediterranean', description: 'Emphasizes healthy fats, whole grains, and lean protein' },
  { id: 'halal', name: 'Halal', description: 'Adheres to Islamic dietary guidelines' },
  { id: 'kosher', name: 'Kosher', description: 'Adheres to Jewish dietary guidelines' }
];

const AdvancedPlanQuestionnaire = () => {
  const navigation = useNavigation<AdvancedPlanQuestionnaireNavigationProp>();
  const authContext = useContext(AuthContext);
  const userData = authContext?.user ? authContext.user : null;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // User preferences state
  const [preferences, setPreferences] = useState({
    healthConditions: [] as string[],
    goal: null as string | null,
    bodyFocusAreas: [] as string[],
    dietType: null as string | null,
    cuisinePreferences: [] as string[],
    excludedIngredients: [] as string[],
    cookingTime: null as string | null,
    cookingSkill: null as string | null,
    mealPrep: false,
    budget: null as string | null
  });
  
  // Define steps in the questionnaire
  const steps = [
    'health',    // Health conditions & nutritional needs
    'goals',     // Fitness goals
    'dietary',   // Dietary preferences
    'lifestyle', // Lifestyle factors
    'review'     // Review & submit
  ];
  
  // Check if user can proceed to next step
  const canAdvance = () => {
    switch (currentStep) {
      case 0: // Health conditions
        return true; // Always allow advancing as health conditions are optional
      case 1: // Goals
        return preferences.goal !== null; // Require at least a primary goal
      case 2: // Dietary preferences
        return preferences.dietType !== null; // Require at least a diet type
      case 3: // Lifestyle
        return preferences.cookingTime !== null && 
               preferences.cookingSkill !== null && 
               preferences.budget !== null; // Require these essential lifestyle factors
      case 4: // Review
        return true; // Always allow completing from review screen
      default:
        return false;
    }
  };
  
  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      if (currentStep > 0) {
        handlePrevious();
        return true;
      } else {
        if (isFormDirty) {
          // Confirm exit if user has made changes
          Alert.alert(
            "Discard changes?",
            "You will lose all your preferences if you go back now.",
            [
              {
                text: "Continue Editing",
                style: "cancel",
                onPress: () => {}
              },
              { 
                text: "Discard", 
                style: "destructive",
                onPress: () => navigation.goBack()
              }
            ]
          );
          return true;
        }
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [currentStep, isFormDirty, navigation]);
  
  // Mark form as dirty and save progress whenever preferences change
  useEffect(() => {
    if (Object.values(preferences).some(value => value !== null && value !== undefined)) {
      setIsFormDirty(true);
      
      // Save progress to local storage
      preferenceService.saveQuestionnaireProgress(preferences)
        .then(success => {
          if (success) {
            console.log('Progress auto-saved');
          }
        })
        .catch(error => {
          console.error('Error auto-saving progress:', error);
        });
    }
  }, [preferences]);
  
  // Load saved progress on component mount
  useEffect(() => {
    const loadSavedProgress = async () => {
      try {
        const savedProgress = await preferenceService.loadQuestionnaireProgress();
        if (savedProgress) {
          // Ask user if they want to restore progress
          Alert.alert(
            'Restore Progress',
            'Would you like to continue where you left off?',
            [
              {
                text: 'Start Fresh',
                style: 'cancel',
                onPress: () => {
                  // Clear saved progress
                  preferenceService.clearQuestionnaireProgress();
                }
              },
              {
                text: 'Restore',
                onPress: () => {
                  // Restore saved preferences
                  setPreferences(savedProgress);
                  Toast.show({
                    type: 'success',
                    text1: 'Progress Restored',
                    text2: 'Your previous answers have been loaded.'
                  });
                }
              }
            ]
          );
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    };
    
    loadSavedProgress();
    
    // Cleanup: save progress when component unmounts
    return () => {
      if (isFormDirty) {
        preferenceService.saveQuestionnaireProgress(preferences)
          .then(success => {
            if (success) {
              console.log('Progress saved on unmount');
            }
          })
          .catch(error => {
            console.error('Error saving progress on unmount:', error);
          });
      }
    };
  }, []);
  
  // Handlers for updating preferences
  const handleHealthConditionsChange = (conditions: string[]) => {
    setPreferences(prev => ({ ...prev, healthConditions: conditions }));
  };
  
  const handleGoalChange = (goal: string) => {
    setPreferences(prev => ({ ...prev, goal }));
  };
  
  const handleBodyFocusAreasChange = (areas: string[]) => {
    setPreferences(prev => ({ ...prev, bodyFocusAreas: areas }));
  };
  
  const handleDietTypeChange = (dietType: string) => {
    setPreferences(prev => ({ ...prev, dietType }));
  };
  
  const handleCuisinePreferencesChange = (cuisines: string[]) => {
    setPreferences(prev => ({ ...prev, cuisinePreferences: cuisines }));
  };
  
  const handleExcludedIngredientsChange = (ingredients: string[]) => {
    setPreferences(prev => ({ ...prev, excludedIngredients: ingredients }));
  };
  
  const handleCookingTimeChange = (time: string) => {
    setPreferences(prev => ({ ...prev, cookingTime: time }));
  };
  
  const handleCookingSkillChange = (skill: string) => {
    setPreferences(prev => ({ ...prev, cookingSkill: skill }));
  };
  
  const handleMealPrepChange = (value: boolean) => {
    setPreferences(prev => ({ ...prev, mealPrep: value }));
  };
  
  const handleBudgetChange = (budget: string) => {
    setPreferences(prev => ({ ...prev, budget }));
  };
  
  // Navigate to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Navigate to next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Handle edit from review screen
  const handleEditSection = (section: string) => {
    const sectionIndex = steps.indexOf(section);
    if (sectionIndex !== -1) {
      setCurrentStep(sectionIndex);
    }
  };
  
  // Map cooking time to minutes for API
  const mapCookingTimeToMinutes = (cookingTime: string | null): number => {
    switch (cookingTime) {
      case 'minimal': return 15;
      case 'moderate': return 30;
      case 'extended': return 45;
      default: return 30;
    }
  };
  
  // Helper function to parse API errors
  const parseApiError = (error: any, defaultMessage: string): string => {
    let errorMessage = defaultMessage;
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API error response:', {
          status: error.response.status,
          data: error.response.data
        });
        
        // Map common HTTP status codes to user-friendly messages
        if (error.response.status === 401) {
          errorMessage = 'Your session has expired. Please log in again.';
        } else if (error.response.status === 400) {
          errorMessage = 'There was an issue with your preferences. Please check your inputs.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Our servers are experiencing issues. Please try again later.';
        } else {
          errorMessage += ` Server returned: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
        }
      } else if (error.request) {
        console.error('Network error:', error.request);
        errorMessage += ' Network error: Could not reach the server.';
      } else {
        errorMessage += ` Error: ${error.message}`;
      }
      console.error('API call config:', error.config);
    }
    
    return errorMessage;
  };

  // Submit preferences and generate plan
  const handleComplete = async () => {
    if (!userData || !userData._id) {
      Alert.alert('Error', 'User information is missing. Please try logging in again.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert our UI preferences to the API format
      const healthConditionsFormatted = preferences.healthConditions as any[];
      
      // Format fitness goals
      const fitnessGoalsFormatted = {
        primary: preferences.goal as any,
        // Add other optional parameters here if collected
      };
      
      // Format dietary preferences
      const dietaryPreferencesFormatted = {
        dietType: preferences.dietType as any,
        excludedIngredients: preferences.excludedIngredients,
        cuisinePreferences: preferences.cuisinePreferences
      };
      
      // Format lifestyle factors
      const lifestyleFactorsFormatted = {
        activityLevel: 'moderately_active' as any, // Default value, could be collected in the questionnaire
        mealPrepTime: mapCookingTimeToMinutes(preferences.cookingTime),
        cookingSkill: preferences.cookingSkill as any,
        budget: preferences.budget as any
      };
      
      console.log('Saving preferences with user ID:', userData._id);
      console.log('Preference data:', {
        healthConditions: healthConditionsFormatted,
        fitnessGoals: fitnessGoalsFormatted,
        dietaryPreferences: dietaryPreferencesFormatted,
        lifestyleFactors: lifestyleFactorsFormatted
      });
      
      // Step 1: Save user preferences
      const preferencesResult = await preferenceService.saveUserPreferences(
        userData._id,
        healthConditionsFormatted,
        fitnessGoalsFormatted,
        dietaryPreferencesFormatted,
        lifestyleFactorsFormatted
      );
      console.log('Preferences saved successfully:', preferencesResult);
      
      // Step 2: Generate a custom plan
      console.log('Generating custom plan for user ID:', userData._id);
      const customPlan = await preferenceService.generateCustomPlan(userData._id);
      console.log('Custom plan generated successfully:', customPlan);
      
      // Success state
      setIsSubmitting(false);
      
      // Create navigation actions with data verification
      const navigateToTrainingPlan = async () => {
        // Verify the plan was actually created by attempting to fetch it
        try {
          setIsSubmitting(true);
          // Short delay to ensure plan is fully processed in the backend
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Minimal verification - just check that we have a valid plan ID
          if (!customPlan || !customPlan.planId) {
            throw new Error('Invalid plan data returned from server');
          }
          
          // Clear questionnaire progress since we've successfully created a plan
          await preferenceService.clearQuestionnaireProgress();
          
          setIsSubmitting(false);
          
          // Navigate to PlanSelection with custom plan info
          navigation.navigate('PlanSelection', { 
            fromAdvancedQuestionnaire: true,
            customPlanCreated: true,
            customPlanId: customPlan.planId,
            customPreferences: {
              goal: fitnessGoalsFormatted.primary,
              dietType: dietaryPreferencesFormatted.dietType
            },
            timestamp: Date.now() // Add timestamp to ensure unique navigation
          } as any); // Use type assertion to avoid TypeScript errors
        } catch (error) {
          setIsSubmitting(false);
          console.error('Error during plan verification:', error);
          
          // Fallback navigation if verification fails
          Alert.alert(
            'Warning',
            'Could not verify plan creation. Proceeding anyway.',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('PlanSelection', { 
                    fromAdvancedQuestionnaire: true,
                    customPlanCreated: true,
                    fallbackMode: true,
                    timestamp: Date.now()
                  } as any); // Use type assertion to avoid TypeScript errors
                }
              }
            ]
          );
        }
      };
      
      const navigateToHome = async () => {
        try {
          setIsSubmitting(true);
          // Short delay to ensure plan is fully processed in the backend
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Clear questionnaire progress since we've successfully created a plan
          await preferenceService.clearQuestionnaireProgress();
          
          setIsSubmitting(false);
          
          // Navigate to Home with refresh params
          navigation.navigate('MainTabs', {
            screen: 'Home',
            params: { 
              refresh: true,
              forceRefresh: true,
              timestamp: Date.now() // Add timestamp to ensure unique navigation
            } as any // Use type assertion to avoid TypeScript errors
          });
        } catch (error) {
          setIsSubmitting(false);
          console.error('Error during home navigation preparation:', error);
          
          // Fallback navigation
          navigation.navigate('MainTabs', { 
            screen: 'Home',
            params: { 
              refresh: true,
              timestamp: Date.now()
            } as any // Use type assertion to avoid TypeScript errors
          });
        }
      };
      
      // Show success message and offer navigation choices
      Alert.alert(
        'Success!',
        'Your custom nutrition plan has been created based on your preferences. Would you like to select a training plan as well?',
        [
          { 
            text: 'Yes, Select Training Plan', 
            onPress: navigateToTrainingPlan
          },
          {
            text: 'No, Go to Home',
            onPress: navigateToHome
          }
        ]
      );
    } catch (error: any) {
      console.error('Error in plan creation process:', error);
      setIsSubmitting(false);
      
      // Determine what kind of error occurred and display appropriate message
      if (error.type === 'preferences') {
        // Specific error for preference saving
        const errorMessage = parseApiError(error.originalError, 'There was a problem saving your preferences.');
        Alert.alert('Error Saving Preferences', errorMessage, [{ text: 'OK' }]);
      } else if (error.type === 'plan_generation') {
        // Specific error for plan generation
        const errorMessage = parseApiError(error.originalError, 'There was a problem generating your custom plan.');
        Alert.alert('Error Generating Plan', errorMessage, [{ text: 'OK' }]);
      } else {
        // General error
        const errorMessage = parseApiError(error, 'There was a problem creating your custom plan. Please try again.');
        Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
      }
    }
  };
  
  // Function to test the API connection
  const testConnection = async () => {
    try {
      setIsSubmitting(true);
      
      // Log API URL information
      console.log('Testing connection to API');
      
      // Import the API configurations to show in diagnostics
      try {
        const { API_BASE_URL } = require('../services/api');
        console.log('Current API_BASE_URL:', API_BASE_URL);
      } catch (e) {
        console.log('Could not import API_BASE_URL');
      }
      
      // Use the diagnostic tool
      const diagnosticResults = await preferenceService.diagnoseConnection();
      
      setIsSubmitting(false);
      
      // Create a detailed message
      let message = `Network Test Results:\n\n`;
      message += `Token Available: ${diagnosticResults.tokenAvailable ? '✅' : '❌'}\n`;
      message += `Server Reachable: ${diagnosticResults.healthCheck ? '✅' : '❌'}\n`;
      message += `Authentication Valid: ${diagnosticResults.authCheck ? '✅' : '❌'}\n`;
      
      // Add API URL information to the message
      try {
        const { API_BASE_URL } = require('../services/api');
        message += `\nAPI URL: ${API_BASE_URL}\n`;
      } catch (e) {
        message += '\nCould not determine API URL\n';
      }
      
      if (diagnosticResults.serverError) {
        message += `\nError Details: ${diagnosticResults.serverError}`;
      }
      
      if (diagnosticResults.healthCheck && diagnosticResults.authCheck) {
        message += '\n\nAll systems ready for plan creation!';
      } else if (diagnosticResults.healthCheck && !diagnosticResults.authCheck) {
        message += '\n\nServer is reachable but authentication failed. Try logging out and back in.';
      } else if (!diagnosticResults.healthCheck) {
        message += '\n\nCannot reach server. Check your network connection and server status.';
      }
      
      Alert.alert(
        'Connection Diagnostic Results',
        message,
        [{ text: 'OK' }]
      );
    } catch (error) {
      setIsSubmitting(false);
      console.error('Diagnostic test failed:', error);
      
      Alert.alert(
        'Diagnostic Test Failed',
        `An unexpected error occurred: ${(error as Error).message}`,
        [{ text: 'OK' }]
      );
    }
  };
  
  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <HealthConditionsScreen
            selectedConditions={preferences.healthConditions}
            onConditionsChange={handleHealthConditionsChange}
          />
        );
      case 1:
        return (
          <GoalsScreen
            selectedGoal={preferences.goal}
            onGoalChange={handleGoalChange}
            bodyFocusAreas={preferences.bodyFocusAreas}
            onBodyFocusAreasChange={handleBodyFocusAreasChange}
          />
        );
      case 2:
        return (
          <DietaryPreferencesScreen
            dietType={preferences.dietType}
            onDietTypeChange={handleDietTypeChange}
            cuisinePreferences={preferences.cuisinePreferences}
            onCuisinePreferencesChange={handleCuisinePreferencesChange}
            excludedIngredients={preferences.excludedIngredients}
            onExcludedIngredientsChange={handleExcludedIngredientsChange}
          />
        );
      case 3:
        return (
          <LifestyleScreen
            cookingTime={preferences.cookingTime}
            onCookingTimeChange={handleCookingTimeChange}
            cookingSkill={preferences.cookingSkill}
            onCookingSkillChange={handleCookingSkillChange}
            mealPrep={preferences.mealPrep}
            onMealPrepChange={handleMealPrepChange}
            budget={preferences.budget}
            onBudgetChange={handleBudgetChange}
          />
        );
      case 4:
        return (
          <ReviewScreen
            preferences={preferences}
            conditionsData={healthConditionsData}
            goalsData={goalsData}
            dietTypesData={dietTypesData}
            onEditSection={handleEditSection}
            testConnection={testConnection}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <QuestionnaireContainer
        steps={steps}
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onComplete={handleComplete}
        isLastStep={currentStep === steps.length - 1}
        canAdvance={canAdvance() && !isSubmitting}
      >
        {isSubmitting ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF0000" />
          </View>
        ) : (
          renderCurrentStep()
        )}
      </QuestionnaireContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});

export default AdvancedPlanQuestionnaire; 