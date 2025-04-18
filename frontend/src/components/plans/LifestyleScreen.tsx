import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LifestyleScreenProps {
  cookingTime: string | null;
  onCookingTimeChange: (time: string) => void;
  cookingSkill: string | null;
  onCookingSkillChange: (skill: string) => void;
  mealPrep: boolean;
  onMealPrepChange: (value: boolean) => void;
  budget: string | null;
  onBudgetChange: (budget: string) => void;
}

const LifestyleScreen: React.FC<LifestyleScreenProps> = ({
  cookingTime,
  onCookingTimeChange,
  cookingSkill,
  onCookingSkillChange,
  mealPrep,
  onMealPrepChange,
  budget,
  onBudgetChange
}) => {
  // Cooking time options
  const cookingTimeOptions = [
    { id: 'minimal', name: 'Minimal (15 min)', description: 'Quick and simple meals' },
    { id: 'moderate', name: 'Moderate (30 min)', description: 'Balanced cooking time' },
    { id: 'extended', name: 'Extended (45+ min)', description: 'More elaborate recipes' }
  ];
  
  // Cooking skill options
  const cookingSkillOptions = [
    { id: 'beginner', name: 'Beginner', description: 'Simple techniques, minimal ingredients' },
    { id: 'intermediate', name: 'Intermediate', description: 'Moderate techniques, some multi-tasking' },
    { id: 'advanced', name: 'Advanced', description: 'Complex techniques, comfortable with any recipe' }
  ];
  
  // Budget options
  const budgetOptions = [
    { id: 'budget', name: 'Budget-Friendly', description: 'Economical ingredients and meals' },
    { id: 'moderate', name: 'Moderate', description: 'Balance between cost and variety' },
    { id: 'premium', name: 'Premium', description: 'High-quality, specialty ingredients' }
  ];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lifestyle Preferences</Text>
      <Text style={styles.subtitle}>
        Help us understand your lifestyle to create a meal plan that fits your schedule and resources.
      </Text>
      
      <Text style={styles.sectionTitle}>Cooking Time</Text>
      <Text style={styles.sectionSubtitle}>How much time do you have for meal preparation?</Text>
      
      <View style={styles.optionsContainer}>
        {cookingTimeOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionItem,
              cookingTime === option.id && styles.selectedOption
            ]}
            onPress={() => onCookingTimeChange(option.id)}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons 
                name={option.id === 'minimal' ? 'time-outline' : 
                      option.id === 'moderate' ? 'time-outline' : 'time-outline'} 
                size={24} 
                color={cookingTime === option.id ? '#FF0000' : '#666666'} 
              />
            </View>
            <View style={styles.optionContent}>
              <Text style={[
                styles.optionName,
                cookingTime === option.id && styles.selectedOptionText
              ]}>
                {option.name}
              </Text>
              <Text style={[
                styles.optionDescription,
                cookingTime === option.id && styles.selectedOptionDescription
              ]}>
                {option.description}
              </Text>
            </View>
            <View style={styles.radioContainer}>
              {cookingTime === option.id ? (
                <Ionicons name="checkmark-circle" size={24} color="#FF0000" />
              ) : (
                <View style={styles.emptyRadio} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Cooking Skill</Text>
      <Text style={styles.sectionSubtitle}>How would you rate your cooking abilities?</Text>
      
      <View style={styles.optionsContainer}>
        {cookingSkillOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionItem,
              cookingSkill === option.id && styles.selectedOption
            ]}
            onPress={() => onCookingSkillChange(option.id)}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons 
                name={option.id === 'beginner' ? 'cafe-outline' : 
                      option.id === 'intermediate' ? 'restaurant-outline' : 'flame-outline'} 
                size={24} 
                color={cookingSkill === option.id ? '#FF0000' : '#666666'} 
              />
            </View>
            <View style={styles.optionContent}>
              <Text style={[
                styles.optionName,
                cookingSkill === option.id && styles.selectedOptionText
              ]}>
                {option.name}
              </Text>
              <Text style={[
                styles.optionDescription,
                cookingSkill === option.id && styles.selectedOptionDescription
              ]}>
                {option.description}
              </Text>
            </View>
            <View style={styles.radioContainer}>
              {cookingSkill === option.id ? (
                <Ionicons name="checkmark-circle" size={24} color="#FF0000" />
              ) : (
                <View style={styles.emptyRadio} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Meal Preparation</Text>
      <Text style={styles.sectionSubtitle}>Do you prefer batch cooking/meal prepping?</Text>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleOption,
            mealPrep === true && styles.selectedToggleOption
          ]}
          onPress={() => onMealPrepChange(true)}
        >
          <Text style={[
            styles.toggleText,
            mealPrep === true && styles.selectedToggleText
          ]}>
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleOption,
            mealPrep === false && styles.selectedToggleOption
          ]}
          onPress={() => onMealPrepChange(false)}
        >
          <Text style={[
            styles.toggleText,
            mealPrep === false && styles.selectedToggleText
          ]}>
            No
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.sectionTitle}>Budget</Text>
      <Text style={styles.sectionSubtitle}>What's your grocery budget preference?</Text>
      
      <View style={styles.optionsContainer}>
        {budgetOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionItem,
              budget === option.id && styles.selectedOption
            ]}
            onPress={() => onBudgetChange(option.id)}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons 
                name={option.id === 'budget' ? 'wallet-outline' : 
                      option.id === 'moderate' ? 'card-outline' : 'cash-outline'} 
                size={24} 
                color={budget === option.id ? '#FF0000' : '#666666'} 
              />
            </View>
            <View style={styles.optionContent}>
              <Text style={[
                styles.optionName,
                budget === option.id && styles.selectedOptionText
              ]}>
                {option.name}
              </Text>
              <Text style={[
                styles.optionDescription,
                budget === option.id && styles.selectedOptionDescription
              ]}>
                {option.description}
              </Text>
            </View>
            <View style={styles.radioContainer}>
              {budget === option.id ? (
                <Ionicons name="checkmark-circle" size={24} color="#FF0000" />
              ) : (
                <View style={styles.emptyRadio} />
              )}
            </View>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 24,
    color: '#000000',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  optionsContainer: {
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedOption: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FFCCCC',
  },
  optionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    color: '#000000',
  },
  selectedOptionText: {
    color: '#FF0000',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
  },
  selectedOptionDescription: {
    color: '#FF3333',
  },
  radioContainer: {
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
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 4,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  selectedToggleOption: {
    backgroundColor: '#FF0000',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  selectedToggleText: {
    color: '#FFFFFF',
  }
});

export default LifestyleScreen; 