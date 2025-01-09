// src/types/home.types.ts
export interface Nutrition {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }
  
  export interface Meal {
    name: string;
    date: string;
    nutrition: Nutrition;
    prepTime: number;
  }
  
  export interface Exercise {
    name: string;
    date: string;
    sets: number;
    reps: string;
    targetMuscleGroup: string;
    difficultyLevel?: string;
  }