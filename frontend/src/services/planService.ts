// services/planService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api';
import { AlternativeMealsResponse, SwapMealRequest, SwapMealResponse } from '../types/plan.types';
import { StructuredIngredient } from '../types/food.types';
import axios from 'axios';

// Cache expiration timestamp
let planCacheExpiry = 0;

// Types for the service
interface PlanSelection {
  workoutPlanId: string;
  dietPlanId: string;
  startDate: Date;
}

// Add shopping list dates interface
interface ShoppingListDates {
  startDate: string;
  endDate: string;
}

// Add the DayPlan interface
interface DayPlan {
  date: string;
  workout?: any;
  meals?: Array<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
    structuredIngredients?: any[];
    [key: string]: any;
  }>;
  progress?: {
    completedWorkouts: string[];
    completedMeals: Array<{date: string, mealNumber: number}>;
  };
}

export const planService = {
  // Check if user is a new user based on registration timestamp
  async isNewUser() {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) return false;
      
      const user = JSON.parse(userData);
      
      // If there's a registration date and it's within the last hour, consider them new
      if (user.createdAt) {
        const registrationDate = new Date(user.createdAt);
        const now = new Date();
        const hoursSinceRegistration = (now.getTime() - registrationDate.getTime()) / (1000 * 60 * 60);
        
        return hoursSinceRegistration < 1; // Consider new if registered less than 1 hour ago
      }
      
      return false;
    } catch (error) {
      console.error('Error checking if user is new:', error);
      return false;
    }
  },

  async selectPlans(data: PlanSelection) {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/plans/select`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Plan selection failed');
      }

      return response.json();
    } catch (error) {
      console.error('Error in selectPlans:', error);
      throw error;
    }
  },

  async getTodaysPlan(forceRefresh = false): Promise<DayPlan | null> {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        console.log('No token found for plan fetch');
        return null;
      }
      
      const requestId = Date.now();
      console.log(`Plan request started (ID: ${requestId})`);
      
      // Check if we have cached data and it's recent enough (unless forceRefresh)
      if (!forceRefresh) {
        const lastRefreshStr = await AsyncStorage.getItem('lastPlanRefresh');
        const cachedPlan = await AsyncStorage.getItem('cachedTodayPlan');
        
        if (lastRefreshStr && cachedPlan) {
          const lastRefresh = parseInt(lastRefreshStr, 10);
          const now = Date.now();
          
          // Use cache if it's less than 60 seconds old
          if (now - lastRefresh < 60000) {
            console.log(`Using cached plan data, timestamp: ${lastRefresh}`);
            const parsedPlan = JSON.parse(cachedPlan);
            console.log(`DEBUG - getTodaysPlan - Cache HIT - Plan meals count: ${parsedPlan.meals?.length}`);
            if (parsedPlan.meals && parsedPlan.meals.length > 0) {
              console.log(`DEBUG - getTodaysPlan - Cache HIT - First meal name: ${parsedPlan.meals[0].name}`);
              console.log(`DEBUG - getTodaysPlan - Cache HIT - First meal calories: ${parsedPlan.meals[0].calories}`);
            }
            return parsedPlan;
          }
          console.log(`Cache expired (${now - lastRefresh}ms old), fetching fresh data`);
        } else {
          console.log('Cache not found, fetching fresh data');
        }
      } else {
        console.log('Force refresh requested, bypassing cache');
      }
      
      // Fetch fresh data from API
      const url = `${API_BASE_URL}/plans/today?t=${Date.now()}`;
      console.log(`Fetching plan from: ${url}`);
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.status === 200) {
        const plan = response.data;
        console.log(`DEBUG - getTodaysPlan - API Response - Plan meals count: ${plan.meals?.length}`);
        if (plan.meals && plan.meals.length > 0) {
          console.log(`DEBUG - getTodaysPlan - API Response - First meal name: ${plan.meals[0].name}`);
          console.log(`DEBUG - getTodaysPlan - API Response - First meal calories: ${plan.meals[0].calories}`);
        }
        
        // Cache the response
        console.log('Caching new plan data');
        await AsyncStorage.setItem('cachedTodayPlan', JSON.stringify(plan));
        await AsyncStorage.setItem('lastPlanRefresh', Date.now().toString());
        
        console.log(`Plan fetched successfully (ID: ${requestId})`);
        return plan;
      } else if (response.status === 404) {
        // New user, no plan yet
        console.log('No plan found for user (new user)');
        return null;
      }
      
      console.log(`Unexpected response fetching plan: ${response.status}`);
      return null;
    } catch (error) {
      console.error('Error fetching today\'s plan:', error);
      // If network error, try to use cached data even if it's stale
      try {
        const cachedPlan = await AsyncStorage.getItem('cachedTodayPlan');
        if (cachedPlan) {
          console.log('Network error, using stale cached data');
          return JSON.parse(cachedPlan);
        }
      } catch (cacheError) {
        console.error('Error reading from cache:', cacheError);
      }
      return null;
    }
  },

  async getWeekPlan() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/plans/week`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch week plan');
      }

      return response.json();
    } catch (error) {
      console.error('Error in getWeekPlan:', error);
      throw error;
    }
  },

  async completeWorkout(date: Date) {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/plans/complete/workout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ date })
      });

      if (!response.ok) {
        throw new Error('Failed to mark workout as complete');
      }

      return response.json();
    } catch (error) {
      console.error('Error in completeWorkout:', error);
      throw error;
    }
  },

  async completeMeal(date: Date, mealNumber: number) {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/plans/complete/meal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ date, mealNumber })
      });

      if (!response.ok) {
        throw new Error('Failed to mark meal as complete');
      }

      return response.json();
    } catch (error) {
      console.error('Error in completeMeal:', error);
      throw error;
    }
  },

  // Add this to your planService object
  modifyPlan: async (data: { workoutPlanId?: string; dietPlanId?: string }) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/plans/select`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to modify plan');
      }

      return response.json();
    } catch (error) {
      console.error('Error in modifyPlan:', error);
      throw error;
    }
  },

  // New method to get shopping list
  getShoppingList: async (dates: ShoppingListDates) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const queryParams = new URLSearchParams({
        startDate: dates.startDate,
        endDate: dates.endDate
      }).toString();
      
      const response = await fetch(`${API_BASE_URL}/plans/shopping-list?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch shopping list');
      }

      return response.json();
    } catch (error) {
      console.error('Error in getShoppingList:', error);
      throw error;
    }
  },
  
  // New method to find alternative meals
  findAlternativeMeals: async (date: string, mealNumber: number) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const queryParams = new URLSearchParams({
        date,
        mealNumber: mealNumber.toString()
      }).toString();
      
      const response = await fetch(`${API_BASE_URL}/plans/find-alternative-meals?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to find alternative meals');
      }

      return response.json() as Promise<AlternativeMealsResponse>;
    } catch (error) {
      console.error('Error in findAlternativeMeals:', error);
      throw error;
    }
  },
  
  // New method to swap a meal
  swapMeal: async (request: SwapMealRequest) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!request.newMealId) {
        throw new Error('Missing meal ID for swap');
      }
      
      console.log('Sending swap request:', JSON.stringify(request));
      
      const response = await fetch(`${API_BASE_URL}/plans/swap-meal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Swap meal failed:', response.status, errorText);
        throw new Error('Failed to swap meal');
      }

      const data = await response.json();
      console.log('Swap meal response:', data);
      console.log('PLAN SERVICE - SWAP MEAL RESPONSE DATA:', JSON.stringify(data));
      
      // CRUCIAL FIX: Thoroughly clear ALL caches and fetch a fresh plan immediately
      console.log('Performing deep refresh after meal swap');
      await AsyncStorage.removeItem('cachedTodayPlan');
      await AsyncStorage.removeItem('cachedWeekPlan');
      await AsyncStorage.setItem('lastPlanRefresh', '0');
      planCacheExpiry = 0;
      
      // Force an immediate fetch of the latest plan after swap to update internal state
      try {
        // Add cache-busting timestamp parameter
        const timestamp = Date.now();
        const url = `${API_BASE_URL}/plans/today?t=${timestamp}&forceRefresh=true`;
        console.log('Post-swap: Fetching fresh plan from:', url);
        
        const planResponse = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (planResponse.ok) {
          const freshPlan = await planResponse.json();
          console.log('Post-swap: Successfully fetched fresh plan data');
          console.log('PLAN SERVICE - FETCHED FRESH PLAN STRUCTURE:', JSON.stringify({
            hasMeals: !!freshPlan?.meals,
            mealsType: typeof freshPlan?.meals,
            mealsIsArray: Array.isArray(freshPlan?.meals),
            firstItemType: typeof freshPlan?.meals?.[0],
            firstItemIsArray: Array.isArray(freshPlan?.meals?.[0])
          }));
          
          // Store the fresh plan in cache
          await AsyncStorage.setItem('cachedTodayPlan', JSON.stringify(freshPlan));
          await AsyncStorage.setItem('lastPlanRefresh', Date.now().toString());
          
          // Return both the swap result and the fresh plan
          return {
            ...data,
            freshPlan
          } as SwapMealResponse;
        }
      } catch (fetchError) {
        console.error('Error fetching fresh plan after swap:', fetchError);
        // Continue even if this fails - at least the swap worked
      }
      
      return data as SwapMealResponse;
    } catch (error) {
      console.error('Error in swapMeal:', error);
      throw error;
    }
  },
  
  // Method to invalidate cache and force refresh
  invalidateCache: async () => {
    try {
      console.log('Invalidating plan cache thoroughly');
      
      // Create a unique timestamp for cache busting
      const now = Date.now();
      
      // Define keys that need to be cleared
      const keysToRemove = [
        'lastPlanRefresh',
        'cachedTodayPlan',
        'cachedWeekPlan',
        'cacheInvalidationTimestamp'
      ];
      
      // Perform removal operations with Promise.all for performance
      const removalPromises = keysToRemove.map(key => AsyncStorage.removeItem(key));
      await Promise.all(removalPromises);
      
      // Store the new invalidation timestamp AFTER removing the old one
      await AsyncStorage.setItem('cacheInvalidationTimestamp', now.toString());
      
      // Reset memory cache indicators
      planCacheExpiry = 0;
      
      // Find and clear any other plan/meal related cache items
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const planCacheKeys = allKeys.filter(key => 
          key.startsWith('plan_') || 
          key.includes('Plan') || 
          key.includes('plan') ||
          key.includes('meal_') ||
          key.includes('Meal')
        );
        
        if (planCacheKeys.length > 0) {
          console.log(`Found ${planCacheKeys.length} additional plan cache keys to clear`);
          await AsyncStorage.multiRemove(planCacheKeys);
        }
      } catch (err) {
        // If this fails, we've still cleared the main cache keys above
        console.warn('Error clearing additional cache keys:', err);
      }
      
      // Final verification that critical keys were removed
      const verifyRemoved = await Promise.all(
        keysToRemove.map(async key => {
          const value = await AsyncStorage.getItem(key);
          return { key, removed: value === null };
        })
      );
      
      const failedRemovals = verifyRemoved.filter(item => !item.removed);
      if (failedRemovals.length > 0) {
        console.warn('Some cache keys failed to clear:', failedRemovals.map(f => f.key));
        // Try one more time for failed keys
        await Promise.all(
          failedRemovals.map(item => AsyncStorage.removeItem(item.key))
        );
      }
      
      console.log(`Plan cache fully invalidated at timestamp ${now}`);
      return true;
    } catch (error) {
      console.error('Error invalidating cache:', error);
      // Even if there's an error, still reset the memory cache
      planCacheExpiry = 0;
      
      // In case of error, try the most critical items individually
      try {
        await AsyncStorage.removeItem('lastPlanRefresh');
        await AsyncStorage.removeItem('cachedTodayPlan');
      } catch (secondaryError) {
        console.error('Critical cache clear also failed:', secondaryError);
      }
      
      return false;
    }
  },

  // Update meal ingredients
  async updateMealIngredients(mealId: string, ingredients: StructuredIngredient[]) {
    try {
      console.log('DEBUG - updateMealIngredients - Meal ID:', mealId);
      console.log('DEBUG - updateMealIngredients - Ingredient count:', ingredients.length);
      
      if (!mealId) {
        throw new Error('Missing meal ID for ingredient update');
      }
      
      // Validate ingredients
      if (!ingredients || !Array.isArray(ingredients)) {
        throw new Error('Invalid ingredients: must be an array');
      }
      
      // Basic validation of each ingredient
      ingredients.forEach((ingredient, index) => {
        if (!ingredient.name) {
          console.warn(`Ingredient at index ${index} has no name, adding placeholder`);
          ingredient.name = `Ingredient ${index + 1}`;
        }
        
        if (typeof ingredient.quantity !== 'number' || isNaN(ingredient.quantity)) {
          console.warn(`Ingredient ${ingredient.name} has invalid quantity, defaulting to 1`);
          ingredient.quantity = 1;
        }
        
        if (!ingredient.unit) {
          console.warn(`Ingredient ${ingredient.name} has no unit, defaulting to serving`);
          ingredient.unit = 'serving';
        }
      });
      
      if (ingredients.length > 0) {
        console.log('DEBUG - updateMealIngredients - First ingredient:', JSON.stringify(ingredients[0]));
      }
      
      // Get the auth token
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Authentication token missing');
      }
      
      // Add retry logic for network resilience
      let attempts = 0;
      const maxAttempts = 2;
      let lastError: Error | null = null;
      
      while (attempts < maxAttempts) {
        try {
          const response = await axios.put(
            `${API_BASE_URL}/plans/meals/${mealId}/ingredients`, 
            { structuredIngredients: ingredients },
            { 
              headers: { Authorization: `Bearer ${token}` },
              timeout: 10000 // 10 second timeout
            }
          );
          
          console.log('DEBUG - updateMealIngredients - Response status:', response.status);
          
          // More detailed logging of the response
          console.log('DEBUG - updateMealIngredients - Response data:', 
            JSON.stringify(response.data ? {
              hasData: !!response.data,
              hasMessage: !!response.data.message,
              hasMeal: !!response.data.meal,
              mealId: response.data.meal?._id
            } : 'No data')
          );
          
          // Consistent success criteria - status 200 and some valid data
          if (response.status === 200) {
            if (response.data?.meal) {
              console.log('Meal update successful, nutrition updated:', {
                calories: response.data.meal.calories,
                carbs: response.data.meal.carbs,
                fats: response.data.meal.fats,
                protein: response.data.meal.protein
              });
              
              // Make sure to update local cache
              await this.invalidateCache();
              return response.data;
            } else {
              console.log('Meal update API returned success but no meal object, constructing response');
              // Return a minimal valid response
              return { 
                success: true,
                message: 'Meal updated (details unavailable)',
                meal: {
                  _id: mealId,
                  structuredIngredients: ingredients
                }
              };
            }
          } else {
            throw new Error(`API returned unexpected status ${response.status}`);
          }
        } catch (error) {
          lastError = error instanceof Error ? error : new Error('Unknown error');
          attempts++;
          console.error(`Attempt ${attempts} failed:`, error);
          
          if (attempts < maxAttempts) {
            console.log(`Retrying in 1 second...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
      
      // If we get here, all attempts failed
      throw lastError || new Error('All update attempts failed');
    } catch (error) {
      console.error('Error updating meal ingredients:', error);
      
      // Try to invalidate cache even on error to ensure fresh data on next load
      try {
        await this.invalidateCache();
      } catch (cacheError) {
        console.error('Failed to invalidate cache after error:', cacheError);
      }
      
      throw error;
    }
  },

  // Add a new ingredient to a meal
  async addMealIngredient(mealId: string, ingredientData: StructuredIngredient) {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/plans/meals/${mealId}/ingredients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(ingredientData)
      });

      if (!response.ok) {
        throw new Error('Failed to add meal ingredient');
      }

      return response.json();
    } catch (error) {
      console.error('Error adding meal ingredient:', error);
      throw error;
    }
  },

  // Remove an ingredient from a meal
  async removeMealIngredient(mealId: string, ingredientIndex: number) {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/plans/meals/${mealId}/ingredients/${ingredientIndex}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove meal ingredient');
      }

      return response.json();
    } catch (error) {
      console.error('Error removing meal ingredient:', error);
      throw error;
    }
  },

  // Migrate a meal's string ingredients to structured format
  async migrateMealIngredients(mealId: string) {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/plans/meals/${mealId}/migrate-ingredients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to migrate meal ingredients');
      }

      return response.json();
    } catch (error) {
      console.error('Error migrating meal ingredients:', error);
      throw error;
    }
  },

  /**
   * Strong refresh of all plan-related data
   * This performs a more aggressive refresh than just invalidation by
   * 1. Clearing the cache
   * 2. Forcing a reload of key data
   */
  async strongRefresh(): Promise<void> {
    console.log("Performing strong refresh of plan data...");
    
    // First, invalidate all cache
    await this.invalidateCache();
    
    try {
      // Force reload of today's plan - this is the most critical data
      const todayPlan = await this.getTodaysPlan(true);
      console.log(`Strong refresh: Today's plan reloaded (${todayPlan?.meals?.length || 0} meals)`);
      
      // Force reload of week plan if needed
      try {
        const weekPlan = await this.getWeekPlan();
        console.log("Strong refresh: Week plan reloaded");
      } catch (weekError) {
        console.warn("Strong refresh: Week plan reload failed, continuing anyway");
      }
      
      console.log("Strong refresh completed successfully");
    } catch (error) {
      console.error("Error during strong refresh:", error);
      throw new Error(`Strong refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};