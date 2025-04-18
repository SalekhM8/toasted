import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DietaryPreferencesScreenProps {
  dietType: string | null;
  onDietTypeChange: (type: string) => void;
  cuisinePreferences: string[];
  onCuisinePreferencesChange: (cuisines: string[]) => void;
  excludedIngredients: string[];
  onExcludedIngredientsChange: (ingredients: string[]) => void;
}

const DietaryPreferencesScreen: React.FC<DietaryPreferencesScreenProps> = ({
  dietType,
  onDietTypeChange,
  cuisinePreferences,
  onCuisinePreferencesChange,
  excludedIngredients,
  onExcludedIngredientsChange
}) => {
  // Diet types
  const dietTypes = [
    { id: 'omnivore', name: 'Omnivore', description: 'Includes all food groups' },
    { id: 'flexitarian', name: 'Flexitarian', description: 'Mostly plant-based with occasional meat' },
    { id: 'pescatarian', name: 'Pescatarian', description: 'Fish but no other meat' },
    { id: 'vegetarian', name: 'Vegetarian', description: 'No meat but includes dairy and eggs' },
    { id: 'vegan', name: 'Vegan', description: 'No animal products' },
    { id: 'keto', name: 'Keto', description: 'High fat, low carb' },
    { id: 'paleo', name: 'Paleo', description: 'Based on foods presumed to be eaten by early humans' },
    { id: 'mediterranean', name: 'Mediterranean', description: 'Emphasizes healthy fats, whole grains, and lean protein' },
    { id: 'halal', name: 'Halal', description: 'Adheres to Islamic dietary guidelines' },
    { id: 'kosher', name: 'Kosher', description: 'Adheres to Jewish dietary guidelines' }
  ];
  
  // Cuisine preferences
  const cuisines = [
    { id: 'american', name: 'American' },
    { id: 'italian', name: 'Italian' },
    { id: 'mexican', name: 'Mexican' },
    { id: 'asian', name: 'Asian' },
    { id: 'indian', name: 'Indian' },
    { id: 'mediterranean', name: 'Mediterranean' },
    { id: 'middle_eastern', name: 'Middle Eastern' },
    { id: 'thai', name: 'Thai' },
    { id: 'japanese', name: 'Japanese' },
    { id: 'french', name: 'French' },
    { id: 'korean', name: 'Korean' },
    { id: 'spanish', name: 'Spanish' }
  ];
  
  // Common excluded ingredients
  const commonExcludedIngredients = [
    { id: 'nuts', name: 'Nuts' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'gluten', name: 'Gluten' },
    { id: 'soy', name: 'Soy' },
    { id: 'shellfish', name: 'Shellfish' },
    { id: 'eggs', name: 'Eggs' },
    { id: 'pork', name: 'Pork' },
    { id: 'beef', name: 'Beef' },
    { id: 'nightshades', name: 'Nightshades' },
    { id: 'processed_sugar', name: 'Processed Sugar' },
    { id: 'alcohol', name: 'Alcohol' }
  ];
  
  const toggleCuisine = (cuisineId: string) => {
    if (cuisinePreferences.includes(cuisineId)) {
      onCuisinePreferencesChange(cuisinePreferences.filter(id => id !== cuisineId));
    } else {
      onCuisinePreferencesChange([...cuisinePreferences, cuisineId]);
    }
  };
  
  const toggleExcludedIngredient = (ingredientId: string) => {
    if (excludedIngredients.includes(ingredientId)) {
      onExcludedIngredientsChange(excludedIngredients.filter(id => id !== ingredientId));
    } else {
      onExcludedIngredientsChange([...excludedIngredients, ingredientId]);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dietary Preferences</Text>
      <Text style={styles.subtitle}>
        Tell us about your dietary preferences so we can tailor your meal plan accordingly.
      </Text>
      
      <Text style={styles.sectionTitle}>Diet Type</Text>
      <Text style={styles.sectionSubtitle}>Select the diet that best describes your eating pattern:</Text>
      
      <View style={styles.dietTypesContainer}>
        {dietTypes.map(type => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.dietTypeItem,
              dietType === type.id && styles.selectedDietType
            ]}
            onPress={() => onDietTypeChange(type.id)}
          >
            <View style={styles.dietTypeContent}>
              <Text style={[
                styles.dietTypeName,
                dietType === type.id && styles.selectedDietTypeName
              ]}>
                {type.name}
              </Text>
              <Text style={[
                styles.dietTypeDescription,
                dietType === type.id && styles.selectedDietTypeDescription
              ]}>
                {type.description}
              </Text>
            </View>
            <View style={styles.radioContainer}>
              {dietType === type.id ? (
                <Ionicons name="checkmark-circle" size={24} color="#FF0000" />
              ) : (
                <View style={styles.emptyRadio} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Cuisine Preferences</Text>
      <Text style={styles.sectionSubtitle}>
        Select the cuisines you enjoy (choose as many as you like):
      </Text>
      
      <View style={styles.cuisinesContainer}>
        {cuisines.map(cuisine => (
          <TouchableOpacity
            key={cuisine.id}
            style={[
              styles.cuisineItem,
              cuisinePreferences.includes(cuisine.id) && styles.selectedCuisine
            ]}
            onPress={() => toggleCuisine(cuisine.id)}
          >
            <Text style={[
              styles.cuisineName,
              cuisinePreferences.includes(cuisine.id) && styles.selectedCuisineName
            ]}>
              {cuisine.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Excluded Ingredients</Text>
      <Text style={styles.sectionSubtitle}>
        Select any ingredients you want to avoid in your meals:
      </Text>
      
      <View style={styles.excludedIngredientsContainer}>
        {commonExcludedIngredients.map(ingredient => (
          <TouchableOpacity
            key={ingredient.id}
            style={[
              styles.ingredientItem,
              excludedIngredients.includes(ingredient.id) && styles.selectedIngredient
            ]}
            onPress={() => toggleExcludedIngredient(ingredient.id)}
          >
            <Text style={[
              styles.ingredientName,
              excludedIngredients.includes(ingredient.id) && styles.selectedIngredientName
            ]}>
              {ingredient.name}
            </Text>
            <View style={styles.checkboxContainer}>
              {excludedIngredients.includes(ingredient.id) ? (
                <Ionicons name="close-circle" size={20} color="#FFFFFF" />
              ) : null}
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
  dietTypesContainer: {
    marginBottom: 16,
  },
  dietTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedDietType: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FFCCCC',
  },
  dietTypeContent: {
    flex: 1,
  },
  dietTypeName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    color: '#000000',
  },
  selectedDietTypeName: {
    color: '#FF0000',
  },
  dietTypeDescription: {
    fontSize: 14,
    color: '#666666',
  },
  selectedDietTypeDescription: {
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
  cuisinesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginBottom: 16,
  },
  cuisineItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCuisine: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  cuisineName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  selectedCuisineName: {
    color: '#FFFFFF',
  },
  excludedIngredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedIngredient: {
    backgroundColor: '#FF4D4D',
    borderColor: '#FF4D4D',
  },
  ingredientName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  selectedIngredientName: {
    color: '#FFFFFF',
  },
  checkboxContainer: {
    marginLeft: 6,
  },
});

export default DietaryPreferencesScreen; 