import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import PlanDetailModal from '../plans/PlanDetailModal';
import { planService } from '../../services/planService';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PlanModificationProps {
    currentPlan: {
      workoutPlanId?: string;
      dietPlanId?: string;
    };
    onPlanUpdated: () => void;
    onClose: () => void;
}

interface CustomPlan {
  id: string;
  name: string;
  description: string;
  isCustom: true;
}

const PlanModification: React.FC<PlanModificationProps> = ({ currentPlan, onPlanUpdated }) => {
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<{
    plan: any;
    type: 'diet' | 'workout';
  } | null>(null);
  const [selectedDietPlan, setSelectedDietPlan] = useState<string | null>(currentPlan.dietPlanId || null);
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState<string | null>(currentPlan.workoutPlanId || null);
  const [loading, setLoading] = useState(false);
  const [customPlans, setCustomPlans] = useState<CustomPlan[]>([]);
  const [loadingCustomPlans, setLoadingCustomPlans] = useState(true);

  useEffect(() => {
    fetchCustomPlans();
  }, []);

  const fetchCustomPlans = async () => {
    try {
      setLoadingCustomPlans(true);
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        console.log('No token found for custom plan fetch');
        setLoadingCustomPlans(false);
        return;
      }
      
      const response = await axios.get(`${API_BASE_URL}/plans/preference`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.customDietPlanId) {
        // If user has a custom plan, add it to the options
        setCustomPlans([{
          id: response.data.customDietPlanId,
          name: "Your Personalized Plan",
          description: "Custom plan based on your preferences",
          isCustom: true
        }]);
      }
    } catch (error) {
      console.error('Error fetching custom plans:', error);
      // Don't show an alert, just fail silently
    } finally {
      setLoadingCustomPlans(false);
    }
  };

  const dietPlans = [
    { id: "dp_1500", name: "Aggressive Cut - 1500kcal", calories: 1500 },
    { id: "dp_2000", name: "Gradual Cut - 2000kcal", calories: 2000 },
    { id: "dp_2500", name: "Maintenance - 2500kcal", calories: 2500 },
    { id: "dp_3000", name: "Gradual Bulk - 3000kcal", calories: 3000 },
    { id: "dp_3500", name: "Super Bulk - 3500kcal", calories: 3500 }
  ];

  const workoutPlans = [
    { id: "wp_1day", name: "1-Day Athletic Foundation", frequency: "1day" },
    { id: "wp_2day", name: "2-Day Power Development", frequency: "2day" },
    { id: "wp_3day", name: "3-Day Complete Athlete", frequency: "3day" },
    { id: "wp_4day_gym", name: "4-Day Athletic Performance", frequency: "4day" },
    { id: "wp_4day_bw", name: "4-Day Bodyweight Mastery", frequency: "4day" }
  ];

  const handlePlanSelect = async () => {
    try {
      setLoading(true);

      // Don't allow no plans selected
      if (!selectedWorkoutPlan && !selectedDietPlan) {
        Alert.alert('Error', 'You must select at least one plan');
        return;
      }

      // Check if the selected diet plan is a custom plan
      const isCustomPlan = customPlans.some(plan => plan.id === selectedDietPlan);
      
      const response = await planService.modifyPlan({
        workoutPlanId: selectedWorkoutPlan || undefined,
        dietPlanId: isCustomPlan ? undefined : selectedDietPlan || undefined, // Only send dietPlanId if it's not a custom plan
        customDietPlanId: isCustomPlan ? selectedDietPlan || undefined : undefined // Send customDietPlanId if it's a custom plan
      });

      Alert.alert('Success', 'Plan updated successfully');
      onPlanUpdated();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modify Your Plan(s)</Text>
      
      <View style={styles.plansContainer}>
        <Text style={styles.sectionTitle}>Diet Plans</Text>
        
        {loadingCustomPlans ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FF0000" />
            <Text style={styles.loadingText}>Loading custom plans...</Text>
          </View>
        ) : (
          <>
            {/* Custom Plans */}
            {customPlans.length > 0 && (
              <View style={styles.customPlansSection}>
                <Text style={styles.customPlanLabel}>Your Custom Plans</Text>
                {customPlans.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    style={[
                      styles.planCard,
                      styles.customPlanCard,
                      selectedDietPlan === plan.id && styles.selectedCard
                    ]}
                    onPress={() => setSelectedDietPlan(plan.id)}
                  >
                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planDescription}>{plan.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            
            {/* Standard Diet Plans */}
            <Text style={styles.standardPlansLabel}>Standard Diet Plans</Text>
            {dietPlans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedDietPlan === plan.id && styles.selectedCard
                ]}
                onPress={() => setSelectedPlanForModal({ plan, type: 'diet' })}
              >
                <Text style={styles.planName}>{plan.name}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>Training Plans</Text>
        {workoutPlans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedWorkoutPlan === plan.id && styles.selectedCard
            ]}
            onPress={() => setSelectedPlanForModal({ plan, type: 'workout' })}
          >
            <Text style={styles.planName}>{plan.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.updateButton, loading && styles.disabledButton]}
        onPress={handlePlanSelect}
        disabled={loading}
      >
        <Text style={styles.updateButtonText}>
          {loading ? 'Updating...' : 'Update Plan(s)'}
        </Text>
      </TouchableOpacity>

      {selectedPlanForModal && (
        <PlanDetailModal
          visible={!!selectedPlanForModal}
          onClose={() => setSelectedPlanForModal(null)}
          onSelect={() => {
            if (selectedPlanForModal.type === 'diet') {
              setSelectedDietPlan(selectedPlanForModal.plan.id);
            } else {
              setSelectedWorkoutPlan(selectedPlanForModal.plan.id);
            }
            setSelectedPlanForModal(null);
          }}
          plan={selectedPlanForModal.plan}
          type={selectedPlanForModal.type}
          isSelected={
            selectedPlanForModal.type === 'diet'
              ? selectedDietPlan === selectedPlanForModal.plan.id
              : selectedWorkoutPlan === selectedPlanForModal.plan.id
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF0000',
  },
  plansContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#FF0000',
  },
  planCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  customPlanCard: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF0000',
    borderWidth: 1,
  },
  selectedCard: {
    borderColor: '#FF0000',
    backgroundColor: '#FFF5F5',
  },
  planName: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  planDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  updateButton: {
    backgroundColor: '#FF0000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ffcccb',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  customPlansSection: {
    marginBottom: 16,
  },
  customPlanLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 8,
  },
  standardPlansLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  }
});

export default PlanModification;