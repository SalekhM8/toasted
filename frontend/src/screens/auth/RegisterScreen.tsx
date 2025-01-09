import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
          
          <Text style={styles.sectionTitle}>Account Information</Text>
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
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={handleChange('password')}
            secureTextEntry
          />

          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={formData.age.toString()}
            onChangeText={handleChange('age')}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            value={formData.height.toString()}
            onChangeText={handleChange('height')}
            keyboardType="numeric"
          />

          <Text style={styles.sectionTitle}>Weight Goals</Text>
          <TextInput
            style={styles.input}
            placeholder="Current Weight (kg)"
            value={formData.weight.toString()}
            onChangeText={handleChange('weight')}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Goal Weight (kg)"
            value={formData.goalWeight.toString()}
            onChangeText={handleChange('goalWeight')}
            keyboardType="numeric"
          />

          {error && <Text style={styles.error}>{error}</Text>}
          <Button title="Register" onPress={handleRegister} />
          <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default RegisterScreen;