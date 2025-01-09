import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { User, ProfileUpdateData } from '../../types/profile.types';

interface EditProfileFormProps {
  user: User;
  onSubmit: (data: ProfileUpdateData) => void;
  onCancel: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState<ProfileUpdateData>({
    name: user.name,
    age: user.age,
    height: user.height,
    weight: user.weight,
    goalWeight: user.goalWeight,
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Basic Information</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={formData.age?.toString()}
        onChangeText={(text) => setFormData({ ...formData, age: parseInt(text) || undefined })}
        placeholder="Age"
        keyboardType="numeric"
      />

      <Text style={styles.sectionTitle}>Body Measurements</Text>
      <TextInput
        style={styles.input}
        value={formData.height?.toString()}
        onChangeText={(text) => setFormData({ ...formData, height: parseInt(text) || undefined })}
        placeholder="Height (cm)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={formData.weight?.toString()}
        onChangeText={(text) => setFormData({ ...formData, weight: parseInt(text) || undefined })}
        placeholder="Current Weight (kg)"
        keyboardType="numeric"
      />

      <Text style={styles.sectionTitle}>Weight Goal</Text>
      <TextInput
        style={styles.input}
        value={formData.goalWeight?.toString()}
        onChangeText={(text) => setFormData({ ...formData, goalWeight: parseInt(text) || undefined })}
        placeholder="Goal Weight (kg)"
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  cancelButtonText: {
    color: '#FF0000',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default EditProfileForm;