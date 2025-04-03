import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/useAuth';
import { RootStackParamList } from '../../types/navigation.types';
import { RegisterData } from '../../types/auth.types';
import { AntDesign } from '@expo/vector-icons';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { useAppleAuth } from '../../hooks/useAppleAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    age: 0,
    height: 0,
    weight: 0,
    goalWeight: 0
  });

  const { register, error: authError, loading: authLoading, user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Social auth hooks
  const { handleGoogleSignIn, isLoading: googleLoading, error: googleError } = useGoogleAuth();
  const { handleAppleSignIn, isLoading: appleLoading, isAvailable: isAppleAvailable, error: appleError } = useAppleAuth();

  // Set loading state based on auth context
  useEffect(() => {
    setLoading(authLoading || googleLoading || appleLoading);
  }, [authLoading, googleLoading, appleLoading]);

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

  // Watch for successful authentication and navigate
  useEffect(() => {
    if (user && token) {
      console.log("User registered, navigating to Loading screen to check plan status");
      // Navigate to Loading screen which will check if user has plans and direct accordingly
      navigation.reset({
        index: 0,
        routes: [{ name: 'Loading' }]
      });
    }
  }, [user, token, navigation]);

  const handleChange = (key: keyof RegisterData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: key === 'email' || key === 'name' || key === 'password' 
        ? value 
        : Number(value)
    }));
  };

  const handleRegister = async () => {
    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }

      await register(formData);
      // Navigation handled by useEffect when user and token are available
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
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.logo}>toasted</Text>
              <Text style={styles.title}>Create an Account</Text>
            </View>
            
            <View style={styles.formContainer}>
              {/* Basic Information */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Basic Information</Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChangeText={handleChange('name')}
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChangeText={handleChange('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    value={formData.password}
                    onChangeText={handleChange('password')}
                    secureTextEntry
                  />
                  <Text style={styles.helperText}>Password must be at least 6 characters</Text>
                </View>
              </View>

              {/* Personal Stats (Optional) */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Personal Stats <Text style={styles.optional}>(Optional)</Text></Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Age</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your age"
                    value={formData.age === 0 ? '' : formData.age.toString()}
                    onChangeText={handleChange('age')}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Height (cm)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your height in cm"
                    value={formData.height === 0 ? '' : formData.height.toString()}
                    onChangeText={handleChange('height')}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Current Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your current weight in kg"
                    value={formData.weight === 0 ? '' : formData.weight.toString()}
                    onChangeText={handleChange('weight')}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Goal Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your goal weight in kg"
                    value={formData.goalWeight === 0 ? '' : formData.goalWeight.toString()}
                    onChangeText={handleChange('goalWeight')}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {error && <Text style={styles.error}>{error}</Text>}
              
              <TouchableOpacity 
                style={styles.registerButton}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.registerButtonText}>Register</Text>
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

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
    padding: 24,
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 30,
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
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  optional: {
    fontWeight: 'normal',
    color: '#888',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
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
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    marginLeft: 5,
  },
  error: {
    color: '#FF0000',
    marginBottom: 15,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#FF0000',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: 20,
    marginBottom: 40,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
  }
});

export default RegisterScreen;