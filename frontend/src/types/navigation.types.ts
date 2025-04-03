import { NavigatorScreenParams } from '@react-navigation/native';
import { Meal, DayPlan } from './plan.types';
import { StructuredIngredient, Unit } from './food.types';

// Define the structure for swapped meal info
export interface SwappedMealInfo {
  mealNumber: number;
  newMealName: string;
  originalMealName: string;
}

export type BottomTabParamList = {
  Home: undefined | { 
    initialPlan?: DayPlan, 
    refresh?: boolean | number, 
    forceRefresh?: boolean,
    directPlan?: DayPlan,
    swappedMealInfo?: SwappedMealInfo,
    mealUpdated?: string
  };
  Schedule: undefined | {
    refresh?: boolean | number,
    forceRefresh?: boolean,
    swappedMealInfo?: SwappedMealInfo,
    dayIndex?: number,
    mealUpdated?: string
  };
  Tracker: undefined;
  Profile: undefined;
};

export type MealSwapScreenParams = {
  originalMeal: Meal;
  date: string;
  mealNumber: number;
  referrer?: 'Home' | 'Schedule';
  dayIndex?: number;
};

export type MealEditorScreenParams = {
  meal: Meal;
  date: string;
  mealNumber: number;
  referrer?: 'Home' | 'Schedule';
  dayIndex?: number;
};

export type FoodSearchScreenParams = {
  onSelect: (foodItem: any, quantity: number, unit: Unit) => void;
  initialCategory?: string;
};

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Register: undefined;
  PlanSelection: undefined;
  MainTabs: NavigatorScreenParams<BottomTabParamList> | { initialPlan?: DayPlan };
  ShoppingList: undefined;
  MealSwap: MealSwapScreenParams;
  MealEditor: MealEditorScreenParams;
  FoodSearch: FoodSearchScreenParams;
};