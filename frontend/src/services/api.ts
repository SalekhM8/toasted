import axios from 'axios';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

const API_BASE_URL = 'http://192.168.1.174:5000/api';  // Keeping your IP address

export const api = axios.create({
    baseURL: 'http://192.168.1.174:5000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      console.log('Attempting login with URL:', `${API_BASE_URL}/auth/login`);
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
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