import { Micronutrients } from './plan.types';

export type FoodCategory = 
  | 'fruits' 
  | 'vegetables' 
  | 'grains' 
  | 'protein' 
  | 'dairy' 
  | 'snacks' 
  | 'beverages' 
  | 'condiments'
  | 'baked-goods'
  | 'packaged-foods'
  | 'fast-food'
  | 'restaurant'
  | 'desserts'
  | 'supplements'
  | 'nuts-seeds'
  | 'oils-fats'
  | 'other';

export type Unit = 'g' | 'ml' | 'oz' | 'cup' | 'tbsp' | 'tsp' | 'piece' | 'serving';

export interface FoodItem {
  _id: string;
  name: string;
  category: FoodCategory;
  baseQuantity: number;
  baseUnit: Unit;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  sugar?: number;
  saturatedFat?: number;
  unsaturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  micronutrients?: Micronutrients;
  commonServingSize?: number;
  commonServingUnit?: Unit;
  brand?: string;
  description?: string;
  isPackaged?: boolean;
  barcode?: string;
  alternateNames?: string[];
  searchTags?: string[];
  popularity?: number;
  isGlutenFree?: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isKeto?: boolean;
  isPaleo?: boolean;
  isNutFree?: boolean;
  isDairyFree?: boolean;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  sugar?: number;
  saturatedFat?: number;
  name?: string;
  quantity?: number;
  unit?: Unit;
}

export interface StructuredIngredient {
  name: string;
  quantity: number;
  unit: Unit;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  // Reference values for scaling calculations
  referenceQuantity?: number;
  referenceCalories?: number;
  referenceProtein?: number;
  referenceCarbs?: number;
  referenceFats?: number;
  foodItemId?: string;
  originalString?: string;
}

export interface FoodSearchResponse {
  items: FoodItem[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
} 