import axios from 'axios';
import { API_BASE_URL, api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Helper function to attempt an API call with retries
 */
const retryApiCall = async <T>(
  apiCallFn: () => Promise<T>,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCallFn();
    } catch (error: any) {
      lastError = error;
      
      // Only retry on network errors or 5xx server errors
      const shouldRetry = 
        !error.response || // Network error (no response)
        (error.response && error.response.status >= 500); // Server error
      
      if (!shouldRetry || attempt === maxRetries) {
        break;
      }
      
      // Exponential backoff: Increase delay with each retry
      const delay = retryDelay * Math.pow(2, attempt - 1);
      console.log(`API call failed. Retrying (${attempt}/${maxRetries}) after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

/**
 * Service for handling user preferences related to advanced meal plan tailoring
 */
export const preferenceService = {
  /**
   * Diagnostic function to test API connectivity and authentication
   */
  diagnoseConnection: async () => {
    try {
      // Get token
      const token = await AsyncStorage.getItem('userToken');
      
      // Test results object
      const results: {
        tokenAvailable: boolean;
        healthCheck: boolean;
        authCheck: boolean;
        serverError: string | null;
      } = {
        tokenAvailable: !!token,
        healthCheck: false,
        authCheck: false,
        serverError: null
      };
      
      // Test 1: Basic health check (no auth required)
      try {
        // Use direct axios for health check to bypass any auth interceptors
        const healthResponse = await retryApiCall(() => 
          axios.get(`${API_BASE_URL}/health-check`)
        );
        results.healthCheck = healthResponse.status === 200;
        console.log('Health check response:', healthResponse.status);
      } catch (error: any) {
        results.healthCheck = false;
        results.serverError = `Health check failed: ${error.message}`;
        console.error('Health check error:', error);
        // Exit early if we can't even reach the server
        return results;
      }
      
      // Test 2: Auth endpoint test (if token available)
      if (token) {
        try {
          // Use the api instance with auth headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const authResponse = await retryApiCall(() => 
            api.get('/users/profile')
          );
          results.authCheck = authResponse.status === 200;
          console.log('Auth check response:', authResponse.status);
        } catch (error: any) {
          results.authCheck = false;
          if (error.response && error.response.status === 401) {
            results.serverError = 'Authentication failed: Token might be expired';
          } else {
            results.serverError = `Auth check failed: ${error.message}`;
          }
          console.error('Auth check error:', error);
        }
      }
      
      return results;
    } catch (error: any) {
      console.error('Diagnosis general error:', error);
      return {
        tokenAvailable: false,
        healthCheck: false,
        authCheck: false,
        serverError: error.message
      };
    }
  },

  /**
   * Save questionnaire progress locally to prevent data loss
   */
  saveQuestionnaireProgress: async (preferences: any) => {
    try {
      await AsyncStorage.setItem(
        'questionnaire_progress', 
        JSON.stringify(preferences)
      );
      console.log('Questionnaire progress saved to local storage');
      return true;
    } catch (error) {
      console.error('Error saving questionnaire progress:', error);
      return false;
    }
  },
  
  /**
   * Load saved questionnaire progress
   */
  loadQuestionnaireProgress: async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('questionnaire_progress');
      if (savedProgress) {
        console.log('Loaded saved questionnaire progress');
        return JSON.parse(savedProgress);
      }
      return null;
    } catch (error) {
      console.error('Error loading questionnaire progress:', error);
      return null;
    }
  },
  
  /**
   * Clear saved questionnaire progress
   */
  clearQuestionnaireProgress: async () => {
    try {
      await AsyncStorage.removeItem('questionnaire_progress');
      console.log('Cleared questionnaire progress from local storage');
      return true;
    } catch (error) {
      console.error('Error clearing questionnaire progress:', error);
      return false;
    }
  },

  /**
   * Save user preferences from the questionnaire
   */
  saveUserPreferences: async (
    userId: string,
    healthConditions: string[],
    fitnessGoals: {
      primary: string;
      targetWeight?: number;
      currentWeight?: number;
      height?: number;
      timeframe?: number;
    },
    dietaryPreferences: {
      dietType: string;
      excludedIngredients?: string[];
      cuisinePreferences?: string[];
    },
    lifestyleFactors: {
      activityLevel: string;
      mealPrepTime: number;  // This is actually the minutes value
      cookingSkill: string;
      budget: string;
    }
  ) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      // Convert numeric mealPrepTime back to the enum string expected by the backend
      let cookingTimeEnum: string;
      if (lifestyleFactors.mealPrepTime <= 15) {
        cookingTimeEnum = 'minimal';
      } else if (lifestyleFactors.mealPrepTime <= 30) {
        cookingTimeEnum = 'moderate';
      } else {
        cookingTimeEnum = 'extended';
      }
      
      // Format the request payload to match what the backend expects
      const requestData = {
        userId,
        healthConditions,
        goal: fitnessGoals.primary,
        bodyFocusAreas: [],
        dietType: dietaryPreferences.dietType,
        cuisinePreferences: dietaryPreferences.cuisinePreferences || [],
        excludedIngredients: dietaryPreferences.excludedIngredients || [],
        cookingTime: cookingTimeEnum, // Use string enum value instead of minutes
        cookingSkill: lifestyleFactors.cookingSkill,
        mealPrep: true, // Default to true if not specified
        budget: lifestyleFactors.budget
      };
      
      console.log('Saving preferences with payload:', requestData);
      
      // Set auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Use the api instance with retry capability
      const response = await retryApiCall(() => 
        api.post('/plans/preference', requestData)
      );
      
      console.log('Save preferences response:', response.status);
      
      // On success, clear the local questionnaire progress
      await preferenceService.clearQuestionnaireProgress();
      
      return response.data;
    } catch (error) {
      console.error('Error saving user preferences:', error);
      
      // Wrap the error with a type for better error handling
      const typedError = {
        type: 'preferences',
        originalError: error
      };
      
      throw typedError;
    }
  },

  /**
   * Get user preferences
   */
  getUserPreferences: async (userId: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      // Set auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Use the api instance with retry
      const response = await retryApiCall(() => 
        api.get('/plans/preference')
      );
      
      return response.data;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      throw error;
    }
  },

  /**
   * Generate a custom plan based on user preferences
   */
  generateCustomPlan: async (userId: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      // Set auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Use the api instance with retry
      const response = await retryApiCall(() => 
        api.post('/plans/generate-custom-plan', {})
      );
      
      console.log('Generate custom plan response:', response.status);
      return response.data;
    } catch (error) {
      console.error('Error generating custom plan:', error);
      
      // Wrap the error with a type for better error handling
      const typedError = {
        type: 'plan_generation',
        originalError: error
      };
      
      throw typedError;
    }
  }
}; 