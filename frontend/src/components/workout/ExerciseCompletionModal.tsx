import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the data structure for exercise log
export interface ExerciseLogData {
  exerciseName: string;
  weightLifted: number | null;
  weightUnit: 'kg' | 'lbs';
  repsCompleted: number; 
  repsLeftInTank: '0' | '1' | '2' | '3' | '4+' | 'couldn\'t complete';
  painReported: boolean;
  painLocation?: string;
  notes?: string;
}

interface ExerciseCompletionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (logData: ExerciseLogData) => void;
  exerciseName: string;
  targetSets: number;
  targetReps: number;
  previousWeight?: number | null;
  previousWeightUnit?: 'kg' | 'lbs' | null;
}

const ExerciseCompletionModal: React.FC<ExerciseCompletionModalProps> = ({
  visible,
  onClose,
  onSubmit,
  exerciseName,
  targetSets,
  targetReps,
  previousWeight,
  previousWeightUnit = 'kg'
}) => {
  // Form state
  const [weight, setWeight] = useState(previousWeight ? previousWeight.toString() : '');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>(previousWeightUnit || 'kg');
  const [repsCompleted, setRepsCompleted] = useState(targetReps.toString());
  const [repsLeftInTank, setRepsLeftInTank] = useState<'0' | '1' | '2' | '3' | '4+' | 'couldn\'t complete'>('1');
  const [painReported, setPainReported] = useState(false);
  const [painLocation, setPainLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Validate input
    if (painReported && !painLocation) {
      Alert.alert('Input Required', 'Please specify the pain location (e.g., shoulder, knee, lower back)');
      return;
    }

    setSubmitting(true);
    try {
      // Parse weight as number or null if empty
      const weightValue = weight ? parseFloat(weight) : null;
      const repsValue = parseInt(repsCompleted, 10) || targetReps;

      const logData: ExerciseLogData = {
        exerciseName,
        weightLifted: weightValue,
        weightUnit,
        repsCompleted: repsValue,
        repsLeftInTank,
        painReported,
        painLocation: painReported ? painLocation : undefined,
        notes: notes.trim() || undefined
      };

      await onSubmit(logData);
      resetForm();
    } catch (error) {
      console.error('Error submitting exercise log:', error);
      Alert.alert('Submission Error', error instanceof Error ? error.message : 'Failed to submit log');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setWeight(previousWeight ? previousWeight.toString() : '');
    setWeightUnit(previousWeightUnit || 'kg');
    setRepsCompleted(targetReps.toString());
    setRepsLeftInTank('1');
    setPainReported(false);
    setPainLocation('');
    setNotes('');
  };

  const handleClose = () => {
    resetForm();
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
            <Text style={styles.headerTitle}>Log Exercise</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#555" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            <Text style={styles.exerciseName}>{exerciseName}</Text>
            <Text style={styles.targetInfo}>Target: {targetSets} sets × {targetReps} reps</Text>

            {/* Weight and Unit */}
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Weight</Text>
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="Enter weight"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.unitSelector}>
                <TouchableOpacity 
                  style={[
                    styles.unitButton, 
                    weightUnit === 'kg' && styles.activeUnitButton
                  ]}
                  onPress={() => setWeightUnit('kg')}
                >
                  <Text style={[
                    styles.unitText,
                    weightUnit === 'kg' && styles.activeUnitText
                  ]}>kg</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.unitButton, 
                    weightUnit === 'lbs' && styles.activeUnitButton
                  ]}
                  onPress={() => setWeightUnit('lbs')}
                >
                  <Text style={[
                    styles.unitText,
                    weightUnit === 'lbs' && styles.activeUnitText
                  ]}>lbs</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Reps Completed */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Reps Completed</Text>
              <TextInput
                style={styles.input}
                value={repsCompleted}
                onChangeText={setRepsCompleted}
                placeholder={`Target: ${targetReps}`}
                keyboardType="number-pad"
              />
            </View>

            {/* Reps Left in Tank */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Reps Left in Tank</Text>
              <View style={styles.buttonGroup}>
                {['0', '1', '2', '3', '4+', 'couldn\'t complete'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.repsButton,
                      repsLeftInTank === option && styles.activeRepsButton
                    ]}
                    onPress={() => setRepsLeftInTank(option as any)}
                  >
                    <Text style={[
                      styles.repsButtonText,
                      repsLeftInTank === option && styles.activeRepsButtonText,
                      option === 'couldn\'t complete' && styles.cantCompleteText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Pain Toggle */}
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Experienced Pain?</Text>
              <Switch
                value={painReported}
                onValueChange={setPainReported}
                trackColor={{ false: '#e0e0e0', true: '#ffcccc' }}
                thumbColor={painReported ? '#FF0000' : '#f4f3f4'}
              />
            </View>

            {/* Pain Location (conditional) */}
            {painReported && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Pain Location</Text>
                <TextInput
                  style={styles.input}
                  value={painLocation}
                  onChangeText={setPainLocation}
                  placeholder="e.g., shoulder, knee, lower back"
                />
              </View>
            )}

            {/* Notes */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Notes (Optional)</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Any additional notes about this set"
                multiline
                numberOfLines={3}
              />
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, submitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
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
    paddingBottom: 10,
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
  scrollView: {
    maxHeight: 450,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  targetInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  inputGroup: {
    flex: 1,
    marginRight: 10,
  },
  unitSelector: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  unitButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeUnitButton: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  unitText: {
    fontSize: 16,
    color: '#333',
  },
  activeUnitText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  repsButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  activeRepsButton: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  repsButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeRepsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cantCompleteText: {
    fontSize: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  submitButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default ExerciseCompletionModal; 