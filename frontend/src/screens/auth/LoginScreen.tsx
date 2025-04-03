// src/screens/auth/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/useAuth';
import { RootStackParamList } from '../../types/navigation.types';
import { AntDesign } from '@expo/vector-icons';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { useAppleAuth } from '../../hooks/useAppleAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error: authError, loading: authLoading, user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Social auth hooks
  const { handleGoogleSignIn, isLoading: googleLoading, error: googleError } = useGoogleAuth();
  const { handleAppleSignIn, isLoading: appleLoading, isAvailable: isAppleAvailable, error: appleError } = useAppleAuth();

  // Set loading state based on auth context
  useEffect(() => {
    setLoading(authLoading || googleLoading || appleLoading);
  }, [authLoading, googleLoading, appleLoading]);

  // Watch for successful authentication and navigate
  useEffect(() => {
    if (user && token) {
      console.log("User authenticated, navigating to Loading screen to check plan status");
      // Navigate to Loading screen which will check if user has plans and direct accordingly
      navigation.reset({
        index: 0,
        routes: [{ name: 'Loading' }]
      });
    }
  }, [user, token, navigation]);

  // Set error state based on auth context and social auth
  useEffect(() => {
    if (authError) {
      setError(authError);
    } else if (googleError) {
      setError(`Google: ${googleError}`);
    } else if (appleError) {
      setError(`Apple: ${appleError}`);
    } else {
      setError(null);
    }
  }, [authError, googleError, appleError]);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      await login(email, password);
    } catch (err) {
      console.error(err);
      // Error is already set in the auth context
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.logo}>toasted</Text>
            <Text style={styles.title}>Login to your Account</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
            {error && <Text style={styles.error}>{error}</Text>}
            
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialContainer}>
              {/* Google Sign-In */}
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={handleGoogleSignIn}
                disabled={loading}
              >
                <AntDesign name="google" size={24} color="#EA4335" />
              </TouchableOpacity>

              {/* Apple Sign-In (iOS only) */}
              {(Platform.OS === 'ios' && isAppleAvailable) && (
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={handleAppleSignIn}
                  disabled={loading}
                >
                  <AntDesign name="apple1" size={24} color="#000" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  error: {
    color: '#FF0000',
    marginBottom: 15,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#FF0000',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: 40,
    width: '100%',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
    fontSize: 14,
  },
  registerLink: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;