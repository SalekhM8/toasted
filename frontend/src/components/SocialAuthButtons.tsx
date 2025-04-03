import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { useAppleAuth } from '../hooks/useAppleAuth';

interface SocialAuthButtonsProps {
  loading: boolean;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ loading }) => {
  const { handleGoogleSignIn, isLoading: googleLoading } = useGoogleAuth();
  const { 
    handleAppleSignIn, 
    isLoading: appleLoading,
    isAvailable: isAppleAvailable 
  } = useAppleAuth();

  return (
    <View style={styles.socialContainer}>
      {/* Google Sign-In */}
      <TouchableOpacity 
        style={styles.socialButton}
        onPress={handleGoogleSignIn}
        disabled={loading || googleLoading}
      >
        <AntDesign name="google" size={20} color="#EA4335" style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Apple Sign-In (iOS only) */}
      {(Platform.OS === 'ios' && isAppleAvailable) && (
        <TouchableOpacity 
          style={[styles.socialButton, styles.appleButton]}
          onPress={handleAppleSignIn}
          disabled={loading || appleLoading}
        >
          <AntDesign name="apple1" size={20} color="#000" style={styles.socialIcon} />
          <Text style={[styles.socialButtonText, styles.appleButtonText]}>Continue with Apple</Text>
        </TouchableOpacity>
      )}

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    marginBottom: 20,
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
  },
  appleButton: {
    backgroundColor: '#000',
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  appleButtonText: {
    color: '#fff',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 14,
  },
});

export default SocialAuthButtons; 