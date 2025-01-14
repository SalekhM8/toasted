import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/useAuth';
import { RootStackParamList } from '../../types/navigation.types';
import { RegisterData } from '../../types/auth.types';

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

  const { register, error } = useAuth();

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
      await register(formData);
      navigation.navigate('Login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            
            <Text style={styles.sectionTitle}>Account Information (Required)</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={handleChange('name')}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>Email must be a valid email</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={handleChange('password')}
              secureTextEntry
            />
            <Text style={styles.helperText}>Password must be at least 6 characters</Text>

            <Text style={styles.sectionTitle}>Personal Information (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              placeholderTextColor="#999"
              value={formData.age === 0 ? '' : formData.age.toString()}
              onChangeText={handleChange('age')}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your height in cm"
              placeholderTextColor="#999"
              value={formData.height === 0 ? '' : formData.height.toString()}
              onChangeText={handleChange('height')}
              keyboardType="numeric"
            />

            <Text style={styles.sectionTitle}>Weight Goals (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your current weight in kg"
              placeholderTextColor="#999"
              value={formData.weight === 0 ? '' : formData.weight.toString()}
              onChangeText={handleChange('weight')}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your goal weight in kg"
              placeholderTextColor="#999"
              value={formData.goalWeight === 0 ? '' : formData.goalWeight.toString()}
              onChangeText={handleChange('goalWeight')}
              keyboardType="numeric"
            />

            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Register" onPress={handleRegister} />
            <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 5,
  },
  errorText: {
    color: '#FF0000',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default RegisterScreen;