import axios from 'axios';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

export const API_BASE_URL = 'https://toasted.onrender.com/api';

export const api = axios.create({
    baseURL: 'https://toasted.onrender.com/api',
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