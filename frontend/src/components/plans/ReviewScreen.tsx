import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReviewScreenProps {
  preferences: {
    healthConditions: string[];
    goal: string | null;
    bodyFocusAreas: string[];
    dietType: string | null;
    cuisinePreferences: string[];
    excludedIngredients: string[];
    cookingTime: string | null;
    cookingSkill: string | null;
    mealPrep: boolean;
    budget: string | null;
  };
  conditionsData: any[];
  goalsData: any[];
  dietTypesData: any[];
  onEditSection: (section: string) => void;
  testConnection?: () => void; // Optional prop for testing connection
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({
  preferences,
  conditionsData,
  goalsData,
  dietTypesData,
  onEditSection,
  testConnection
}) => {
  
  // Helper to find option details by ID
  const findOptionById = (options: any[], id: string) => {
    return options.find(option => option.id === id) || null;
  };
  
  // Format health conditions
  const getConditionNames = () => {
    if (preferences.healthConditions.length === 0) {
      return 'None selected';
    }
    return preferences.healthConditions
      .map(id => {
        const condition = conditionsData.find(c => c.id === id);
        return condition ? condition.name : id;
      })
      .join(', ');
  };
  
  // Format goal
  const getGoalName = () => {
    if (!preferences.goal) return 'Not selected';
    const goal = findOptionById(goalsData, preferences.goal);
    return goal ? goal.name : preferences.goal;
  };
  
  // Format body focus areas
  const getBodyFocusAreas = () => {
    if (preferences.bodyFocusAreas.length === 0) {
      return 'None selected';
    }
    return preferences.bodyFocusAreas.join(', ');
  };
  
  // Format diet type
  const getDietTypeName = () => {
    if (!preferences.dietType) return 'Not selected';
    const dietType = findOptionById(dietTypesData, preferences.dietType);
    return dietType ? dietType.name : preferences.dietType;
  };
  
  // Format cuisine preferences
  const getCuisinePreferences = () => {
    if (preferences.cuisinePreferences.length === 0) {
      return 'No preferences';
    }
    return preferences.cuisinePreferences
      .map(id => id.charAt(0).toUpperCase() + id.slice(1).replace('_', ' '))
      .join(', ');
  };
  
  // Format excluded ingredients
  const getExcludedIngredients = () => {
    if (preferences.excludedIngredients.length === 0) {
      return 'None excluded';
    }
    return preferences.excludedIngredients
      .map(id => id.charAt(0).toUpperCase() + id.slice(1).replace('_', ' '))
      .join(', ');
  };
  
  // Format cooking time
  const getCookingTime = () => {
    const times: Record<string, string> = {
      'minimal': 'Minimal (15 min)',
      'moderate': 'Moderate (30 min)',
      'extended': 'Extended (45+ min)'
    };
    return preferences.cookingTime ? times[preferences.cookingTime] || preferences.cookingTime : 'Not selected';
  };
  
  // Format cooking skill
  const getCookingSkill = () => {
    const skills: Record<string, string> = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced'
    };
    return preferences.cookingSkill ? skills[preferences.cookingSkill] || preferences.cookingSkill : 'Not selected';
  };
  
  // Format meal prep preference
  const getMealPrep = () => {
    return preferences.mealPrep ? 'Yes' : 'No';
  };
  
  // Format budget
  const getBudget = () => {
    const budgets: Record<string, string> = {
      'budget': 'Budget-Friendly',
      'moderate': 'Moderate',
      'premium': 'Premium'
    };
    return preferences.budget ? budgets[preferences.budget] || preferences.budget : 'Not selected';
  };
  
  // Section component for display
  const Section = ({ title, value, section }: { title: string; value: string; section: string }) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEditSection(section)}
        >
          <Ionicons name="pencil" size={16} color="#FF0000" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Review Your Preferences</Text>
      <Text style={styles.subtitle}>
        Please review your selections before we create your personalized meal plan. You can edit any section by tapping the Edit button.
      </Text>
      
      <View style={styles.sectionsContainer}>
        <Section 
          title="Health Conditions & Nutritional Needs" 
          value={getConditionNames()} 
          section="health" 
        />
        
        <Section 
          title="Primary Fitness Goal" 
          value={getGoalName()} 
          section="goals" 
        />
        
        <Section 
          title="Body Focus Areas" 
          value={getBodyFocusAreas()} 
          section="goals" 
        />
        
        <Section 
          title="Diet Type" 
          value={getDietTypeName()} 
          section="dietary" 
        />
        
        <Section 
          title="Cuisine Preferences" 
          value={getCuisinePreferences()} 
          section="dietary" 
        />
        
        <Section 
          title="Excluded Ingredients" 
          value={getExcludedIngredients()} 
          section="dietary" 
        />
        
        <Section 
          title="Cooking Time" 
          value={getCookingTime()} 
          section="lifestyle" 
        />
        
        <Section 
          title="Cooking Skill" 
          value={getCookingSkill()} 
          section="lifestyle" 
        />
        
        <Section 
          title="Meal Prep Preference" 
          value={getMealPrep()} 
          section="lifestyle" 
        />
        
        <Section 
          title="Budget" 
          value={getBudget()} 
          section="lifestyle" 
        />
      </View>
      
      <View style={styles.noteContainer}>
        <Ionicons name="information-circle-outline" size={20} color="#666666" style={styles.noteIcon} />
        <Text style={styles.noteText}>
          Your personalized meal plan will be created based on these preferences. You can always modify them later from your profile.
        </Text>
      </View>
      
      {/* Add a diagnostic button if testConnection is provided */}
      {testConnection && (
        <View style={styles.diagnosticContainer}>
          <TouchableOpacity 
            style={styles.diagnosticButton}
            onPress={testConnection}
          >
            <Ionicons name="pulse" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.diagnosticButtonText}>Test Connection</Text>
          </TouchableOpacity>
          <Text style={styles.diagnosticText}>
            Having issues? Test your connection to our servers.
          </Text>
        </View>
      )}
    </ScrollView>
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
    marginBottom: 24,
    lineHeight: 22,
  },
  sectionsContainer: {
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  editText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#FF0000',
    fontWeight: '500',
  },
  valueContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  valueText: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 20,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  noteIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  diagnosticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  diagnosticButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
  diagnosticButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  diagnosticText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  }
});

export default ReviewScreen; 