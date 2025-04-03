// types/plans.ts
import { StructuredIngredient } from './food.types';

export interface Exercise {
    name: string;
    sets: number;
    reps: string;
    progression?: string;
    notes?: string;
    tempo?: string;
    rest?: string;
    cues?: string[];
  }
  
  export interface WorkoutDay {
    dayNumber: number;
    focus: string;
    exercises: Exercise[];
  }
  
  export interface WorkoutPlan {
    id: string;
    name: string;
    frequency: '2day' | '3day' | '4day';
    weeks: WorkoutDay[][];
  }
  
  export interface Micronutrients {
    vitamins: {
      a: number; // IU
      c: number; // mg
      d: number; // IU
      e: number; // mg
      b1: number; // mg
      b2: number; // mg
      b3: number; // mg
      b6: number; // mg
      b12: number; // mcg
      folate: number; // mcg
    };
    minerals: {
      calcium: number; // mg
      iron: number; // mg
      magnesium: number; // mg
      potassium: number; // mg
      zinc: number; // mg
      sodium: number; // mg
    };
  }
  
  export interface Meal {
    _id?: string;
    name: string;
    timing?: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
    structuredIngredients?: StructuredIngredient[];
    instructions: string[];
    notes?: string;
    micronutrients?: Micronutrients;
    category?: 'home-cooked' | 'restaurant' | 'fast-food' | 'takeout';
  }
  
  export interface DietPlan {
    id: string;
    name: string;
    calories: number;
    weekCycle: Meal[][];
  }
  
  export interface UserPlan {
    userId: string;
    workoutPlanId: string;
    dietPlanId: string;
    customDietPlanId?: string;
    startDate: Date;
    progress: {
      completedWorkouts: Date[];
      completedMeals: {
        date: Date;
        mealNumber: number;
      }[];
    };
  }
  
  export interface DayPlan {
    date: Date;
    workout?: WorkoutDay;
    meals: Meal[];
    progress: {
      completedWorkouts: Date[];
      completedMeals: {
        date: Date;
        mealNumber: number;
      }[];
    };
  }

  export interface ModifyPlanRequest {
    workoutPlanId?: string;
    dietPlanId?: string;
  }
  
  export interface ModifyPlanResponse {
    message: string;
    plan: UserPlan;
  }

  export interface AlternativeMealsResponse {
    originalMeal: Meal;
    alternativeMeals: Meal[];
  }

  export interface SwapMealRequest {
    newMealId: string;
    date: string;
    mealNumber: number;
  }

  export interface SwapMealResponse {
    message: string;
    swappedMeal: Meal;
    mealDetails?: {
      dayNumber: number;
      mealNumber: number;
      originalName: string;
      newName: string;
    };
    freshPlan?: DayPlan;
    todaysPlan?: DayPlan;
  }

  export interface MacroComparison {
    value: number;
    diff: number;
    percentage: number;
    isHigher: boolean;
  }
