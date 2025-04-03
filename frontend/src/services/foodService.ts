import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api';
import { FoodItem, NutritionInfo } from '../types/food.types';

// Small in-memory cache for frequently searched items
const searchCache: Record<string, { timestamp: number; results: any }> = {};
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

export const foodService = {
  // Search for food items
  async searchFoodItems(query: string, category = 'all', limit = 20, page = 1): Promise<{
    items: FoodItem[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    }
  }> {
    try {
      // Create cache key
      const cacheKey = `search_${query}_${category}_${limit}_${page}`;
      
      // Check cache
      const now = Date.now();
      if (searchCache[cacheKey] && now - searchCache[cacheKey].timestamp < CACHE_EXPIRY) {
        console.log('Using cached search results for:', query);
        return searchCache[cacheKey].results;
      }
      
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(
        `${API_BASE_URL}/food-items/search?query=${encodeURIComponent(query)}&category=${category}&limit=${limit}&page=${page}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to search food items');
      }

      const data = await response.json();
      
      // Cache the results
      searchCache[cacheKey] = {
        timestamp: now,
        results: data
      };
      
      return data;
    } catch (error) {
      console.error('Error in searchFoodItems:', error);
      throw error;
    }
  },
  
  // Get details for a specific food item
  async getFoodItemDetails(id: string): Promise<FoodItem> {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(
        `${API_BASE_URL}/food-items/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get food item details');
      }

      return response.json();
    } catch (error) {
      console.error('Error in getFoodItemDetails:', error);
      throw error;
    }
  },
  
  // Calculate nutrition for a custom quantity
  async calculateNutrition(foodItemId: string, quantity: number, unit?: string): Promise<NutritionInfo> {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(
        `${API_BASE_URL}/food-items/calculate-nutrition`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ foodItemId, quantity, unit })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to calculate nutrition');
      }

      return response.json();
    } catch (error) {
      console.error('Error in calculateNutrition:', error);
      throw error;
    }
  }
}; 