// src/components/TrackerComponents/WeightInput.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { progressService } from '../../services/progressService';

interface WeightInputProps {
  onWeightLogged: () => void;
}

const WeightInput: React.FC<WeightInputProps> = ({ onWeightLogged }) => {
  const [weight, setWeight] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogWeight = async () => {
    if (!weight || isNaN(Number(weight))) {
      Alert.alert('Error', 'Please enter a valid weight');
      return;
    }

    setIsLoading(true);
    try {
      await progressService.updateWeight(Number(weight));
      setWeight(''); // Clear input
      onWeightLogged(); // Refresh parent
      Alert.alert('Success', 'Weight logged successfully');
    } catch (error) {
      console.error('Error logging weight:', error);
      Alert.alert('Error', 'Failed to log weight');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter weight (kg)"
        keyboardType="decimal-pad"
        editable={!isLoading}
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogWeight}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Logging...' : 'Log Weight'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    minWidth: 100,
  },
  buttonDisabled: {
    backgroundColor: '#ffcccb',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default WeightInput;