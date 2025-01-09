// services/planService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types for the service
interface PlanSelection {
  workoutPlanId: string;
  dietPlanId: string;
  startDate: Date;
}

const API_URL = 'http://192.168.1.174:5000'; 

export const planService = {
  async selectPlans(data: PlanSelection) {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/api/plans/select`, {
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

  async getTodaysPlan() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/api/plans/today`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch today\'s plan');
      }

      return response.json();
    } catch (error) {
      console.error('Error in getTodaysPlan:', error);
      throw error;
    }
  },

  async getWeekPlan() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/api/plans/week`, {
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
      const response = await fetch(`${API_URL}/api/plans/complete/workout`, {
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
      const response = await fetch(`${API_URL}/api/plans/complete/meal`, {
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
      const response = await fetch(`${API_URL}/api/plans/select`, {
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

  // Helper function to check if a plan is expired
  async checkPlanExpiration(startDate: Date): Promise<boolean> {
    const now = new Date();
    const weeksSinceStart = Math.floor(
      (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    return weeksSinceStart >= 6;
  }
};