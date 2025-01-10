import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User } from '../types/auth.types';
import { authService } from '../services/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (registerData: any) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
  error: null,
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

type AuthAction =
  | { type: 'SET_USER'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        authService.setAuthHeader(token);
        // You might want to validate the token here
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error loading auth state' });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authService.login({ email, password });
      await AsyncStorage.setItem('userToken', response.accessToken);
      authService.setAuthHeader(response.accessToken);
      dispatch({
        type: 'SET_USER',
        payload: { user: response as unknown as User, token: response.accessToken },
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Invalid email or password',
      });
      throw error;
    }
  };

  // Similar implementation for register and logout...
  const logout = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Call backend logout endpoint
      await authService.logout();
      
      // Clear local storage
      await AsyncStorage.removeItem('userToken');
      
      // Reset auth service header
      authService.setAuthHeader(null);
      
      // Reset auth state
      dispatch({ type: 'LOGOUT' });
      
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout on frontend even if backend fails
      await AsyncStorage.removeItem('userToken');
      authService.setAuthHeader(null);
      dispatch({ type: 'LOGOUT' });
    }
  };

    return (
      <AuthContext.Provider value={{ ...state, login, register: async () => {}, logout }}>
        {children}
      </AuthContext.Provider>
    );
  
};