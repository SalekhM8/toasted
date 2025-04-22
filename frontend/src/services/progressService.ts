// src/services/progressService.ts
import { api } from './api';
import { Progress, WeightEntry } from '../types/tracker.types';
import { ExerciseLogData } from '../components/workout/ExerciseCompletionModal'; // Import the interface
import axios from 'axios'; // Import axios to use its types for error handling
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api'; // Import API_BASE_URL

// Define the expected payload for the backend endpoint, including workoutDate
interface ExerciseLogPayload extends ExerciseLogData {
  workoutDate: string;
}

// Interface for completed exercise data returned from the backend
interface CompletedExercise {
  id: string;
  exerciseName: string;
  date: string;
  dateFormatted: string;
  weightLifted: number | null;
  weightUnit: string | null;
  repsCompleted: string | null;
  repsLeftInTank: string;
  painReported: boolean;
  painNotes: string | null;
}

// Interface for the response from getCompletedExercises
interface CompletedExercisesResponse {
  count: number;
  exercises: CompletedExercise[];
}

// Helper function for generating name-based alternatives
const getNameBasedAlternatives = (exerciseName: string): string[] => {
  console.log(`Generating name-based alternatives for: ${exerciseName}`);
  
  // Common substitution patterns
  const substitutions = [
    { from: 'Barbell', to: 'Dumbbell' },
    { from: 'Dumbbell', to: 'Barbell' },
    { from: 'Barbell', to: 'Machine' },
    { from: 'Machine', to: 'Cable' },
    { from: 'Back Squat', to: 'Front Squat' },
    { from: 'Bench Press', to: 'Push-Up' },
    { from: 'Deadlift', to: 'Romanian Deadlift' },
    { from: 'Pull-Up', to: 'Lat Pulldown' }
  ];
  
  // Generate alternatives based on name patterns
  const alternatives = [];
  
  // Apply substitutions
  for (const sub of substitutions) {
    if (exerciseName.includes(sub.from)) {
      alternatives.push(exerciseName.replace(sub.from, sub.to));
    }
  }
  
  // Add more fallbacks based on muscle groups in the name
  if (exerciseName.match(/chest|pec|bench/i)) {
    if (!alternatives.includes('Push-Ups')) alternatives.push('Push-Ups');
    if (!alternatives.includes('Dumbbell Fly')) alternatives.push('Dumbbell Fly');
  } 
  
  if (exerciseName.match(/shoulder|delt|press/i)) {
    if (!alternatives.includes('Lateral Raise')) alternatives.push('Lateral Raise');
    if (!alternatives.includes('Front Raise')) alternatives.push('Front Raise');
  }
  
  if (exerciseName.match(/squat|leg|quad/i)) {
    if (!alternatives.includes('Lunges')) alternatives.push('Lunges');
    if (!alternatives.includes('Leg Press')) alternatives.push('Leg Press');
  }
  
  if (exerciseName.match(/back|row|pull/i)) {
    if (!alternatives.includes('Cable Row')) alternatives.push('Cable Row');
    if (!alternatives.includes('Dumbbell Row')) alternatives.push('Dumbbell Row');
  }
  
  // Ensure we return at least 3 alternatives
  if (alternatives.length < 3) {
    const defaultAlternatives = [
      'Bodyweight Squats',
      'Push-Ups',
      'Dumbbell Row',
      'Plank'
    ];
    
    for (const alt of defaultAlternatives) {
      if (!alternatives.includes(alt) && alt !== exerciseName) {
        alternatives.push(alt);
        if (alternatives.length >= 3) break;
      }
    }
  }
  
  console.log(`Generated ${alternatives.length} name-based alternatives`);
  return alternatives.slice(0, 5); // Return max 5 alternatives
};

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
  },

  // Log exercise completion - receives logData (which includes workoutDate)
  logExerciseCompletion: async (payload: ExerciseLogPayload) => { // Expect the full payload including date
    try {
      console.log('Submitting Exercise Log:', payload);
      // Send the received payload directly (it already contains workoutDate)
      const response = await api.post('/progress/exercise', payload);
      console.log('Exercise Log Response:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error logging exercise completion:', error);
      // Type checking for axios errors
      if (axios.isAxiosError(error) && error.response) {
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        throw new Error(error.response.data?.message || 'Failed to log exercise');
      } else if (axios.isAxiosError(error) && error.request) {
        console.error('Request:', error.request);
        throw new Error('No response received from server');
      } else if (error instanceof Error) {
        console.error('Error Message:', error.message);
        throw new Error('Error setting up exercise log request');
      } else {
        throw new Error('An unknown error occurred during exercise log');
      }
    }
  },

  /**
   * Get alternative exercise options for a given exercise
   */
  getExerciseAlternatives: async (exerciseName: string): Promise<string[]> => {
    console.log(`Getting alternatives for exercise: ${exerciseName}`);
    try {
      const token = await AsyncStorage.getItem('userToken');
      // The correct path is /plans/exercises/:exerciseName/alternatives
      // because planRoutes are mounted at /api/plans in server.js
      const response = await fetch(`${API_BASE_URL}/plans/exercises/${encodeURIComponent(exerciseName)}/alternatives`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.log(`Alternative fetch failed with status: ${response.status}`);
        throw new Error(`Failed to get exercise alternatives: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Found ${Array.isArray(data) ? data.length : 0} alternatives for ${exerciseName}`);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error getting exercise alternatives:', error);
      
      // Fallback to name-based alternatives when API fails
      return getNameBasedAlternatives(exerciseName);
    }
  },

  /**
   * Record an exercise swap for a specific date
   */
  swapExercise: async (originalExerciseName: string, newExerciseName: string, workoutDate: string): Promise<any> => {
    console.log(`Swapping ${originalExerciseName} with ${newExerciseName} for date ${workoutDate}`);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/progress/swap-exercise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          originalExerciseName,
          swappedExerciseName: newExerciseName,
          workoutDate
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to record exercise swap: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error recording exercise swap:', error);
      throw error;
    }
  },

  // Get completed exercises from the server
  getCompletedExercises: async (startDate?: string, endDate?: string): Promise<CompletedExercisesResponse> => {
    try {
      let url = '/progress/exercises';
      
      // Add query parameters if dates are provided
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;
      
      const response = await api.get<CompletedExercisesResponse>(url);
      console.log(`Retrieved ${response.data.count} completed exercises`);
      return response.data;
    } catch (error) {
      console.error('Error fetching completed exercises:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.message || 'Failed to fetch exercise history');
      }
      throw new Error('Could not fetch exercise history. Please try again later.');
    }
  },
};