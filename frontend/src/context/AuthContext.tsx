import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User, SocialAuthCredentials } from '../types/auth.types';
import { authService } from '../services/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (registerData: any) => Promise<void>;
  socialAuth: (credentials: SocialAuthCredentials) => Promise<void>;
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
  socialAuth: async () => {},
  logout: async () => {},
});

type AuthAction =
  | { type: 'SET_USER'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
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
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
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

  const socialAuth = async (credentials: SocialAuthCredentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      console.log(`Starting ${credentials.provider} authentication with backend...`);
      
      console.log(`${credentials.provider} auth details:`, {
        provider: credentials.provider,
        hasToken: !!credentials.token,
        tokenLength: credentials.token ? credentials.token.length : 0,
        email: credentials.email,
        hasName: !!credentials.name
      });
      
      const response = await authService.socialAuth(credentials);
      console.log('Social auth response from backend:', response);
      
      await Promise.all([
        AsyncStorage.setItem('userToken', response.accessToken),
        AsyncStorage.setItem('userData', JSON.stringify(response))
      ]);
      console.log('Saved token and user data to AsyncStorage');
  
      authService.setAuthHeader(response.accessToken);
      dispatch({
        type: 'SET_USER',
        payload: { user: response as unknown as User, token: response.accessToken },
      });
      console.log(`${credentials.provider} authentication successful`);
    } catch (error: any) {
      console.error(`${credentials.provider} authentication error:`, error);
      
      let errorMessage = `${credentials.provider} authentication failed`;
      
      if (error.response) {
        if (error.response.status === 400 && error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage = 'Invalid credentials. Please try again.';
        } else if (error.response.status === 409) {
          errorMessage = `This email is already registered. Please log in with your existing account.`;
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      dispatch({
        type: 'SET_ERROR',
        payload: errorMessage,
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
      // Clear all authentication and plan-related data from storage
      const keysToRemove = [
        'userToken', 
        'userData',
        'cachedTodayPlan',
        'lastPlanRefresh',
        'redirectHistory',
        'cachedPlanUserId'
      ];
      
      await Promise.all(keysToRemove.map(key => AsyncStorage.removeItem(key)));
      console.log('Cleared all user data and cached plans');
      
      authService.setAuthHeader(null);
      dispatch({ type: 'LOGOUT' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      login, 
      register, 
      socialAuth,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};