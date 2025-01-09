// src/services/progressService.ts
import { api } from './api';
import { Progress, WeightEntry } from '../types/tracker.types';

export const progressService = {
  getProgress: async () => {  // Remove userId parameter since we'll get it from auth token
    try {
      const response = await api.get<Progress>('/progress');
      return response.data;
    } catch (error) {
      console.error('Error fetching progress:', error);
      throw error;
    }
  },

  updateWeight: async (weight: number) => {  // Remove userId parameter
    try {
      const response = await api.post<WeightEntry[]>('/progress/weight', { weight });
      return response.data;
    } catch (error) {
      console.error('Error updating weight:', error);
      throw error;
    }
  },

  updateCompletion: async (type: 'meal' | 'workout', itemId: string, planId: number) => {
    try {
      const data = { type, itemId, planId };
      await api.post('/progress/completion', data);
    } catch (error) {
      console.error(`Error updating ${type} completion:`, error);
      throw error;
    }
  }
};