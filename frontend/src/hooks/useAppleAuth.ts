import { useState, useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useAuth } from './useAuth';
import { SocialAuthCredentials } from '../types/auth.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Storage key for Apple user data
const APPLE_USER_DATA_KEY = 'apple_user_data';

export const useAppleAuth = () => {
  const { socialAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);

  // Check if Apple authentication is available on this device
  useEffect(() => {
    const checkAvailability = async () => {
      try {
        if (Platform.OS !== 'ios') {
          console.log('Apple Authentication only available on iOS');
          setIsAvailable(false);
          return;
        }
        
        const availability = await AppleAuthentication.isAvailableAsync();
        console.log('Apple Authentication available:', availability);
        setIsAvailable(availability);
      } catch (err) {
        console.error('Error checking Apple authentication availability:', err);
        setIsAvailable(false);
      }
    };
    
    checkAvailability();
  }, []);

  const handleAppleSignIn = async () => {
    try {
      if (!isAvailable) {
        console.log('Apple Authentication not available on this device');
        setError('Apple authentication is not available on this device');
        return;
      }

      setIsLoading(true);
      setError(null);
      
      console.log('Initiating Apple Sign In...');
      
      // Request Apple authentication
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log('Apple Authentication response received', {
        hasIdentityToken: !!credential.identityToken,
        hasEmail: !!credential.email,
        hasFullName: !!(credential.fullName && credential.fullName.givenName)
      });

      if (!credential.identityToken) {
        throw new Error('No identity token received from Apple');
      }

      // Apple only provides email and name on the first login
      let email = credential.email;
      let name = credential.fullName?.givenName 
        ? `${credential.fullName.givenName} ${credential.fullName.familyName || ''}`
        : '';
      
      console.log('Initial data from Apple:', { email, name });
      
      // If we have new user info, store it for future use
      if (email && name) {
        try {
          console.log('Storing Apple user data for future logins');
          await AsyncStorage.setItem(APPLE_USER_DATA_KEY, JSON.stringify({
            userIdentifier: credential.user,
            email,
            name
          }));
          console.log('Apple user data stored successfully');
        } catch (storageErr) {
          console.error('Error storing Apple user data:', storageErr);
        }
      }
      // If email or name is missing, try to retrieve from storage
      else {
        try {
          console.log('Trying to retrieve stored Apple user data...');
          const storedData = await AsyncStorage.getItem(APPLE_USER_DATA_KEY);
          if (storedData) {
            const userData = JSON.parse(storedData);
            console.log('Found stored data:', userData);
            // Only use stored data if user ID matches
            if (userData.userIdentifier === credential.user) {
              email = email || userData.email;
              name = name || userData.name;
              console.log('Using stored data:', { email, name });
            } else {
              console.log('Stored user ID does not match current user');
            }
          } else {
            console.log('No stored data found');
          }
        } catch (storageErr) {
          console.error('Error retrieving stored Apple user data:', storageErr);
        }
      }

      // Create a fallback email if none is provided
      const fallbackEmail = email || `${credential.user}@privaterelay.appleid.com`;
      
      // Create credentials for our backend
      const credentials: SocialAuthCredentials = {
        provider: 'apple',
        token: credential.identityToken,
        email: fallbackEmail,
        name: name || 'Apple User' // Use a generic name if none available
      };

      console.log('Final credentials to send to backend:', {
        provider: credentials.provider,
        hasToken: !!credentials.token,
        email: credentials.email,
        name: credentials.name
      });

      // Authenticate with our backend
      await socialAuth(credentials);
      console.log('Backend authentication successful');
      // Navigation will be handled by the login screen through the AuthContext state changes
      
    } catch (err: any) {
      // Specific Apple authentication errors
      console.error('Apple sign in error details:', err);
      if (err?.code === 1000) {
        // User cancelled
        console.log('User cancelled Apple sign in');
        setError('Authentication was cancelled');
      } else if (err?.code === 1001) {
        // Invalid response
        console.log('Invalid response from Apple');
        setError('Authentication failed: Invalid response from Apple');
      } else {
        console.log('General Apple sign in error');
        setError(err instanceof Error ? err.message : 'Apple sign in failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAppleSignIn,
    isLoading,
    error,
    isAvailable
  };
}; 