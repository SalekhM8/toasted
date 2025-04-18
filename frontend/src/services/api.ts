import axios from 'axios';
import { LoginCredentials, RegisterData, AuthResponse, SocialAuthCredentials } from '../types/auth.types';
import { Platform } from 'react-native';

// Simple API URL configuration based on platform and environment
const getApiUrl = () => {
  if (__DEV__) {
    // For Expo Go on physical devices, we need to use the computer's network IP
    // This is important because localhost/127.0.0.1 refers to the phone itself, not your computer
    const NETWORK_IP = '192.168.1.112'; // Updated to the correct IP address
    
    // In Expo Go, we assume we're on a physical device unless we know we're in a simulator
    const isRunningInExpoGo = true; // Assuming using Expo Go as you mentioned
    
    if (Platform.OS === 'ios') {
      // If testing with Expo Go, use the network IP
      return `http://${NETWORK_IP}:3000/api`;
    } else if (Platform.OS === 'android') {
      // If testing with Expo Go, use the network IP
      return `http://${NETWORK_IP}:3000/api`;
    } else {
      // Web
      return 'http://localhost:3000/api';
    }
  }
  // Production URL
  return 'https://toasted.onrender.com/api';
};

export const API_BASE_URL = getApiUrl();
console.log('API URL:', API_BASE_URL);
console.log('Running on platform:', Platform.OS);

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000 // 10 seconds
});

// Add error interceptor for better error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Log response error details
      console.error('API Error:', {
        url: error.config.url,
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error - No response received:', error.request);
      error.message = 'Unable to reach server. Please check your connection.';
    } else {
      // Something happened in setting up the request
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      console.log('Attempting login with:', API_BASE_URL + '/auth/login');
      console.log('Login credentials (email only):', credentials.email); 
      
      // Log more details about the request configuration
      console.log('API base URL:', api.defaults.baseURL);
      console.log('API headers:', api.defaults.headers);
      
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    try {
      console.log('Attempting registration with:', API_BASE_URL + '/auth/register');
      const response = await api.post<AuthResponse>('/auth/register', data);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  socialAuth: async (credentials: SocialAuthCredentials) => {
    try {
      console.log('Social auth request:', {
        url: API_BASE_URL + '/auth/social',
        provider: credentials.provider,
        email: credentials.email
      });
      
      const response = await api.post<AuthResponse>('/auth/social', credentials);
      console.log('Social auth successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Social auth error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      // Still proceed with logout flow even if backend call fails
    }
  },

  setAuthHeader: (token: string | null) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }
};

export default { authService };