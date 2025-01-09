import { api } from './api';
import { User, ProfileUpdateData } from '../types/profile.types';

export const profileService = {
  getProfile: async () => {
    try {
      console.log('Making profile request to:', '/users/profile');
      console.log('Current headers:', api.defaults.headers);
      const response = await api.get<User>('/users/profile');  // Removed /api prefix
      console.log('Profile response:', response);
      return response.data;
    } catch (error: any) {
      console.error('Detailed error:', {
        config: error?.config,
        response: error?.response,
        status: error?.response?.status
      });
      throw error;
    }
  },

  updateProfile: async (data: ProfileUpdateData) => {
    try {
      const response = await api.put<User>('/users/profile', data);  // Removed /api prefix
      return response.data;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  deleteAccount: async () => {
    try {
      await api.delete('/users/profile');  // Removed /api prefix
    } catch (error: any) {
      console.error('Error deleting account:', error);
      throw error;
    }
  }
};