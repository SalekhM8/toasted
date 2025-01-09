// src/types/tracker.types.ts
export interface WeightEntry {
    weight: number;
    date: string;
  }
  
  export interface Progress {
    weights: WeightEntry[];
    streak: {
      current: number;
    };
    completedWorkouts: any[]; // Replace 'any' with proper type if you have it
    completedMeals: any[];    // Replace 'any' with proper type if you have it
  }
  
  export interface ProgressData {
    streak: number;
    completedWorkouts: number;
    completedMeals: number;
    weights?: WeightEntry[];
  }