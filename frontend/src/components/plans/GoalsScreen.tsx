import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Goal {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface GoalsScreenProps {
  selectedGoal: string | null;
  onGoalChange: (goalId: string) => void;
  bodyFocusAreas: string[];
  onBodyFocusAreasChange: (areas: string[]) => void;
}

const GoalsScreen: React.FC<GoalsScreenProps> = ({
  selectedGoal,
  onGoalChange,
  bodyFocusAreas,
  onBodyFocusAreasChange
}) => {
  // Fitness and nutritional goals
  const goals: Goal[] = [
    {
      id: 'weight_loss',
      name: 'Weight Loss',
      description: 'Reduce body fat and achieve a leaner physique',
      icon: 'trending-down'
    },
    {
      id: 'weight_gain',
      name: 'Weight Gain',
      description: 'Increase weight and build mass in a healthy way',
      icon: 'trending-up'
    },
    {
      id: 'muscle_building',
      name: 'Muscle Building',
      description: 'Gain strength and increase muscle mass',
      icon: 'barbell'
    },
    {
      id: 'endurance',
      name: 'Endurance',
      description: 'Improve stamina and cardiovascular performance',
      icon: 'bicycle'
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      description: 'Maintain current weight and body composition',
      icon: 'fitness'
    },
    {
      id: 'general_health',
      name: 'General Health',
      description: 'Improve overall health and wellness',
      icon: 'heart'
    }
  ];
  
  // Body focus areas
  const focusAreas = [
    { id: 'arms', name: 'Arms' },
    { id: 'abs', name: 'Abs' },
    { id: 'back', name: 'Back' },
    { id: 'chest', name: 'Chest' },
    { id: 'legs', name: 'Legs' },
    { id: 'glutes', name: 'Glutes' },
    { id: 'shoulders', name: 'Shoulders' },
    { id: 'full_body', name: 'Full Body' }
  ];
  
  const toggleFocusArea = (areaId: string) => {
    if (bodyFocusAreas.includes(areaId)) {
      onBodyFocusAreasChange(bodyFocusAreas.filter(id => id !== areaId));
    } else {
      onBodyFocusAreasChange([...bodyFocusAreas, areaId]);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Fitness Goals</Text>
      <Text style={styles.subtitle}>
        Select your primary fitness goal. This helps us tailor your meal plan's calories and macronutrients.
      </Text>
      
      <View style={styles.goalsContainer}>
        {goals.map(goal => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.goalItem,
              selectedGoal === goal.id && styles.selectedGoal
            ]}
            onPress={() => onGoalChange(goal.id)}
          >
            <View style={styles.goalIconContainer}>
              <Ionicons 
                name={goal.icon as any} 
                size={28} 
                color={selectedGoal === goal.id ? '#FF0000' : '#666666'} 
              />
            </View>
            <View style={styles.goalContent}>
              <Text style={[
                styles.goalName,
                selectedGoal === goal.id && styles.selectedGoalText
              ]}>
                {goal.name}
              </Text>
              <Text style={[
                styles.goalDescription,
                selectedGoal === goal.id && styles.selectedGoalDescription
              ]}>
                {goal.description}
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              {selectedGoal === goal.id ? (
                <Ionicons name="checkmark-circle" size={24} color="#FF0000" />
              ) : (
                <View style={styles.emptyRadio} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Body Focus Areas</Text>
      <Text style={styles.sectionSubtitle}>
        Which areas of your body would you like to focus on? (Optional)
      </Text>
      
      <View style={styles.focusAreasContainer}>
        {focusAreas.map(area => (
          <TouchableOpacity
            key={area.id}
            style={[
              styles.focusAreaItem,
              bodyFocusAreas.includes(area.id) && styles.selectedFocusArea
            ]}
            onPress={() => toggleFocusArea(area.id)}
          >
            <Text style={[
              styles.focusAreaText,
              bodyFocusAreas.includes(area.id) && styles.selectedFocusAreaText
            ]}>
              {area.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    lineHeight: 22,
  },
  goalsContainer: {
    marginBottom: 30,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedGoal: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FFCCCC',
  },
  goalIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalContent: {
    flex: 1,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    color: '#000000',
  },
  selectedGoalText: {
    color: '#FF0000',
  },
  goalDescription: {
    fontSize: 14,
    color: '#666666',
  },
  selectedGoalDescription: {
    color: '#FF3333',
  },
  checkboxContainer: {
    marginLeft: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  focusAreasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  focusAreaItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedFocusArea: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  focusAreaText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  selectedFocusAreaText: {
    color: '#FFFFFF',
  }
});

export default GoalsScreen; 