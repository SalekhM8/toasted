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
    loadPersistedAuth();
  }, []);

  const loadPersistedAuth = async () => {
    try {
      const [token, userDataStr] = await Promise.all([
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('userData')
      ]);
  
      if (token && userDataStr) {
        const userData = JSON.parse(userDataStr);
        authService.setAuthHeader(token);
        dispatch({
          type: 'SET_USER',
          payload: { user: userData, token }
        });
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authService.login({ email, password });
      
      await Promise.all([
        AsyncStorage.setItem('userToken', response.accessToken),
        AsyncStorage.setItem('userData', JSON.stringify(response))
      ]);
  
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

  const register = async (registerData: any) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authService.register(registerData);
      
      await Promise.all([
        AsyncStorage.setItem('userToken', response.accessToken),
        AsyncStorage.setItem('userData', JSON.stringify(response))
      ]);
  
      authService.setAuthHeader(response.accessToken);
      dispatch({
        type: 'SET_USER',
        payload: { user: response as unknown as User, token: response.accessToken },
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Registration failed',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await Promise.all([
        AsyncStorage.removeItem('userToken'),
        AsyncStorage.removeItem('userData')
      ]);
      authService.setAuthHeader(null);
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};