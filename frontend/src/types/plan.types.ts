// types/plans.ts
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
  
  export interface Meal {
    name: string;
    timing?: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
    instructions: string[];
    notes?: string;
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
