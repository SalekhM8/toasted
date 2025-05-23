// src/types/profile.types.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  workoutPlanId: string;
   dietPlanId: string;
  age?: number;
  height?: number;
  weight?: number;
  goalWeight?: number;
  profilePicture?: string;
  settings: {
    notifications: {
      enabled: boolean;
      workoutReminders: boolean;
      mealReminders: boolean;
      progressReminders: boolean;
    };
    theme: 'light' | 'dark';
  };
}

export interface ProfileUpdateData {
  name?: string;
  age?: number;
  height?: number;
  weight?: number;
  goalWeight?: number;
  settings?: User['settings'];
}