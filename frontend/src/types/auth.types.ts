export interface User {
    _id: string;
    name: string;
    email: string;
    age?: number;
    height?: number;
    weight?: number;
    goalWeight?: number;
    profilePicture?: string;
    notificationsEnabled: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    name: string;
    age: number;
    height: number;
    weight: number;
    goalWeight: number;
  }
  
  export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    accessToken: string;
  }