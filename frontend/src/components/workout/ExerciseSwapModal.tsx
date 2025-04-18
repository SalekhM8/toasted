import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ExerciseSwapModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectSwap: (exerciseName: string) => void;
  alternativeOptions: string[];
  originalExerciseName: string;
}

const ExerciseSwapModal: React.FC<ExerciseSwapModalProps> = ({
  visible,
  onClose,
  onSelectSwap,
  alternativeOptions,
  originalExerciseName
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = (exercise: string) => {
    setSelectedAlternative(exercise);
  };

  const handleSubmit = async () => {
    if (!selectedAlternative) {
      Alert.alert('Selection Required', 'Please select an alternative exercise first.');
      return;
    }

    setSubmitting(true);
    try {
      await onSelectSwap(selectedAlternative);
      // Reset state
      setSelectedAlternative(null);
    } catch (error) {
      console.error('Error during exercise swap:', error);
      Alert.alert('Swap Error', error instanceof Error ? error.message : 'Failed to swap exercise');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedAlternative(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Swap Exercise</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#555" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Choose an alternative for:
          </Text>
          <Text style={styles.originalExercise}>
            {originalExerciseName}
          </Text>

          {alternativeOptions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No alternatives available</Text>
            </View>
          ) : (
            <ScrollView style={styles.optionsContainer}>
              {alternativeOptions.map((exercise, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionItem,
                    selectedAlternative === exercise && styles.selectedOption
                  ]}
                  onPress={() => handleSelect(exercise)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedAlternative === exercise && styles.selectedOptionText
                  ]}>
                    {exercise}
                  </Text>
                  {selectedAlternative === exercise && (
                    <Ionicons name="checkmark-circle" size={22} color="#FF0000" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.swapButton,
                (!selectedAlternative || submitting) && styles.disabledButton
              ]}
              onPress={handleSubmit}
              disabled={!selectedAlternative || submitting}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.swapButtonText}>Confirm Swap</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  originalExercise: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  optionsContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  selectedOption: {
    backgroundColor: '#F8E6E6', // Light red
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: '#FF0000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#555',
    fontSize: 16,
  },
  swapButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  swapButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ExerciseSwapModal; 