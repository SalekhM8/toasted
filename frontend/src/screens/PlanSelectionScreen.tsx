import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import { planService } from '../services/planService';
import PlanDetailModal from '../components/plans/PlanDetailModal';
import { Linking } from 'react-native';

interface DietPlan {
  id: string;
  name: string;
  calories: number;
}

interface WorkoutPlan {
  id: string;
  name: string;
  frequency: string;
}

type PlanSelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PlanSelectionScreen = () => {
  const navigation = useNavigation<PlanSelectionScreenNavigationProp>();
  const [selectedDietPlan, setSelectedDietPlan] = useState<DietPlan | null>(null);
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<{
    plan: DietPlan | WorkoutPlan;
    type: 'diet' | 'workout';
  } | null>(null);

  // BMR Calculator States
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [bmr, setBmr] = useState<number | null>(null);

  const calculateBMR = () => {
    if (!weight || !height || !age || !activityLevel) {
      return;
    }

    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseFloat(age);

    // Harris-Benedict Equation
    let bmrValue;
    if (gender === 'male') {
      bmrValue = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageYears);
    } else {
      bmrValue = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageYears);
    }

    // Activity level multipliers
    const multipliers = {
      'never': 1.2,
      'sometimes': 1.375,
      'regularly': 1.55,
      'athlete': 1.725
    };

    bmrValue *= multipliers[activityLevel as keyof typeof multipliers];
    setBmr(Math.round(bmrValue));
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

  const handlePlanSelect = (plan: DietPlan | WorkoutPlan, type: 'diet' | 'workout') => {
    if (type === 'diet') {
      setSelectedDietPlan(selectedDietPlan?.id === plan.id ? null : plan);
    } else {
      setSelectedWorkoutPlan(selectedWorkoutPlan?.id === plan.id ? null : plan);
    }
    setSelectedPlanForModal(null);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await planService.selectPlans({
        workoutPlanId: selectedWorkoutPlan?.id,
        dietPlanId: selectedDietPlan?.id,
        startDate: new Date()
      });
      navigation.navigate('MainTabs');
    } catch (error) {
      console.error('Error saving plan selection:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* BMR Calculator Section */}
        <View style={styles.bmrSection}>
          <Text style={styles.sectionTitle}>Calculate Your Daily Calories</Text>
          
          <View style={styles.genderButtons}>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
              onPress={() => setGender('male')}
            >
              <Text style={[styles.genderButtonText, gender === 'male' && styles.selectedGenderText]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
              onPress={() => setGender('female')}
            >
              <Text style={[styles.genderButtonText, gender === 'female' && styles.selectedGenderText]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            placeholderTextColor="#666666"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />

          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            placeholderTextColor="#666666"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />

          <TextInput
            style={styles.input}
            placeholder="Age (years)"
            placeholderTextColor="#666666"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />

          <Text style={styles.inputLabel}>How often do you train?</Text>
          <View style={styles.activityButtons}>
            {['never', 'sometimes', 'regularly', 'athlete'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.activityButton, activityLevel === level && styles.selectedActivity]}
                onPress={() => setActivityLevel(level)}
              >
                <Text style={[styles.activityButtonText, activityLevel === level && styles.selectedActivityText]}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateBMR}
            >
            <Text style={styles.calculateButtonText}>Calculate BMR</Text>
          </TouchableOpacity>
          
          <View style={styles.citationsBox}>
            <Text style={styles.citationsHeader}>Medical References:</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/2305711/')}
            >
              <Text style={styles.citationText}>
                BMR: Mifflin-St Jeor Equation (1990) - View Source
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/9550168/')}
            >
              <Text style={styles.citationText}>
                Activity Levels: Harris-Benedict Equation (1984) - View Source
              </Text>
            </TouchableOpacity>
            <Text style={styles.disclaimer}>
              Please consult healthcare provider for personalized advice.
            </Text>
          </View>
          
          {bmr !== null && (
            <View style={styles.bmrResult}>
              <Text style={styles.bmrText}>Your Daily Calories:</Text>
              <Text style={styles.bmrNumber}>{bmr} kcal/day</Text>
            </View>
          )}
        </View>

        <Text style={styles.title}>Choose Your Plan(s)</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diet Plans</Text>
          {dietPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedDietPlan?.id === plan.id && styles.selectedCard
              ]}
              onPress={() => setSelectedPlanForModal({ plan, type: 'diet' })}
            >
              <View style={styles.planDetails}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={[
                  styles.checkbox,
                  selectedDietPlan?.id === plan.id && styles.checkedBox
                ]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training Plans</Text>
          {workoutPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedWorkoutPlan?.id === plan.id && styles.selectedCard
              ]}
              onPress={() => setSelectedPlanForModal({ plan, type: 'workout' })}
            >
              <View style={styles.planDetails}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={[
                  styles.checkbox,
                  selectedWorkoutPlan?.id === plan.id && styles.checkedBox
                ]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {(selectedDietPlan || selectedWorkoutPlan) && (
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.selectButtonText}>
                {loading ? 'Processing...' : 'Select Plan(s)'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedPlanForModal && (
          <PlanDetailModal
            visible={!!selectedPlanForModal}
            onClose={() => setSelectedPlanForModal(null)}
            onSelect={() => handlePlanSelect(selectedPlanForModal.plan, selectedPlanForModal.type)}
            plan={selectedPlanForModal.plan}
            type={selectedPlanForModal.type}
            isSelected={
              selectedPlanForModal.type === 'diet'
                ? selectedDietPlan?.id === selectedPlanForModal.plan.id
                : selectedWorkoutPlan?.id === selectedPlanForModal.plan.id
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  // Original styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#FF0000',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
 citationText: {
  fontSize: 12,
  color: '#666',
  textAlign: 'center',
  marginTop: 10,
  textDecorationLine: 'underline',
},
  selectedCard: {
    borderColor: '#FF0000',
    backgroundColor: '#FFF5F5',
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  checkedBox: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  priceSection: {
    backgroundColor: '#FFF5F5',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  bundleText: {
    color: '#FF0000',
    marginTop: 5,
  },
  subscribeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 15,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionSection: {
    backgroundColor: '#FFF5F5',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  selectButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 15,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // New BMR Calculator styles
  bmrSection: {
    marginBottom: 30,
    backgroundColor: '#FFF5F5',
    padding: 15,
    borderRadius: 10,
  },
  citationsBox: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  citationsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF0000',
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#FF0000',
  },
  genderButtonText: {
    color: '#FF0000',
    fontWeight: '500',
  },
  selectedGenderText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  activityButton: {
    width: '48%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF0000',
    alignItems: 'center',
  },
  selectedActivity: {
    backgroundColor: '#FF0000',
  },
  activityButtonText: {
    color: '#FF0000',
    fontWeight: '500',
  },
  selectedActivityText: {
    color: '#fff',
  },
  calculateButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bmrResult: {
    marginTop: 15,
    alignItems: 'center',
  },
  bmrText: {
    fontSize: 16,
    color: '#333',
  },
  bmrNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  }
});

export default PlanSelectionScreen;
