import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useAuth } from './useAuth';
import { SocialAuthCredentials } from '../types/auth.types';
import { WEB_CLIENT_ID, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env';

// Register the redirect URI handler
WebBrowser.maybeCompleteAuthSession();

// Log the client IDs for debugging
console.log('Google Auth Client IDs:', {
  webClientId: WEB_CLIENT_ID || 'Not set',
  iosClientId: IOS_CLIENT_ID || 'Not set',
  androidClientId: ANDROID_CLIENT_ID || 'Not set'
});

export const useGoogleAuth = () => {
  const { socialAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the Google Auth provider
  const [_, response, promptAsync] = Google.useAuthRequest({
    clientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ['profile', 'email']
  });

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Initiating Google Sign In...');
      const result = await promptAsync();
      console.log('Google auth result:', result);
      
      if (result.type === 'success') {
        // Extract the auth token
        const { authentication } = result;
        
        if (!authentication) {
          throw new Error('Failed to get authentication from Google');
        }
        
        console.log('Google auth successful, getting user info');
        
        // Fetch user info from Google
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${authentication.accessToken}` },
          }
        );
        
        const userInfo = await userInfoResponse.json();
        console.log('Google user info:', userInfo);
        
        // Create credentials for our backend
        const credentials: SocialAuthCredentials = {
          provider: 'google',
          token: authentication.accessToken,
          email: userInfo.email,
          name: userInfo.name || userInfo.given_name || 'Google User'
        };
        
        console.log('Sending to backend:', credentials);
        
        // Authenticate with our backend
        await socialAuth(credentials);
        console.log('Backend authentication successful');
        // Navigation will be handled by the login screen through the AuthContext state changes
      } else if (result.type === 'cancel') {
        console.log('User cancelled Google sign in');
        setError('Authentication was cancelled');
      } else {
        console.log('Google sign in failed with type:', result.type);
        setError('Google sign in failed');
      }
    } catch (err) {
      console.error('Google sign in error details:', err);
      setError(err instanceof Error ? err.message : 'Google sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleGoogleSignIn,
    isLoading,
    error
  };
}; 