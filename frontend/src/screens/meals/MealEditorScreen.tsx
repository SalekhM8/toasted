import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types/navigation.types';
import { Meal } from '../../types/plan.types';
import { StructuredIngredient, Unit } from '../../types/food.types';
import { planService } from '../../services/planService';
import IngredientItem from '../../components/meals/IngredientItem';
import NutritionSummary from '../../components/meals/NutritionSummary';
import Toast from 'react-native-toast-message';

type MealEditorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type MealEditorScreenRouteProp = RouteProp<RootStackParamList, 'MealEditor'>;

const MealEditorScreen = () => {
  const navigation = useNavigation<MealEditorScreenNavigationProp>();
  const route = useRoute<MealEditorScreenRouteProp>();
  
  // Extract params
  const { meal, date, mealNumber, referrer = 'Home', dayIndex } = route.params;
  
  // State variables
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editedMeal, setEditedMeal] = useState<Meal>(meal);
  const [structuredIngredients, setStructuredIngredients] = useState<StructuredIngredient[]>([]);
  const [originalNutrition, setOriginalNutrition] = useState({
    calories: meal.calories,
    protein: meal.protein,
    carbs: meal.carbs,
    fats: meal.fats
  });
  const [currentNutrition, setCurrentNutrition] = useState({
    calories: meal.calories,
    protein: meal.protein,
    carbs: meal.carbs,
    fats: meal.fats
  });
  
  // Load or migrate structured ingredients when component mounts
  useEffect(() => {
    const initializeIngredients = async () => {
      setLoading(true);
      try {
        // If meal already has structured ingredients, use them
        if (meal.structuredIngredients && meal.structuredIngredients.length > 0) {
          console.log('Using existing structured ingredients:', meal.structuredIngredients.length);
          setStructuredIngredients(meal.structuredIngredients);
        } else if (meal._id) {
          // Only migrate if we have a meal ID
          console.log('No structured ingredients, attempting to migrate from string ingredients');
          try {
            const result = await planService.migrateMealIngredients(meal._id);
            if (result && result.meal && result.meal.structuredIngredients) {
              console.log('Migration successful, got', result.meal.structuredIngredients.length, 'ingredients');
              setStructuredIngredients(result.meal.structuredIngredients);
              // Update the edited meal with the migrated data
              setEditedMeal(result.meal);
            } else {
              console.log('Migration returned empty or invalid result, creating basic ingredients');
              // Create basic structured ingredients from string ingredients
              const basicIngredients = createBasicStructuredIngredients(meal.ingredients);
              setStructuredIngredients(basicIngredients);
            }
          } catch (migrationError) {
            console.error('Error during migration:', migrationError);
            // Fall back to manual conversion from string ingredients
            console.log('Falling back to manual conversion of string ingredients');
            const basicIngredients = createBasicStructuredIngredients(meal.ingredients);
            setStructuredIngredients(basicIngredients);
          }
        } else {
          // No meal ID, just use empty array
          console.log('No meal ID available, starting with empty ingredients');
          setStructuredIngredients([]);
        }
      } catch (error) {
        console.error('Error initializing ingredients:', error);
        // Fall back to empty ingredients without showing alert
        setStructuredIngredients([]);
      } finally {
        setLoading(false);
      }
    };
    
    initializeIngredients();
  }, [meal]);
  
  // Function to create basic structured ingredients from string ingredients
  const createBasicStructuredIngredients = (stringIngredients: string[]): StructuredIngredient[] => {
    if (!stringIngredients || !Array.isArray(stringIngredients) || stringIngredients.length === 0) {
      console.log('No string ingredients available, creating a default placeholder');
      // Return a single default ingredient based on the meal name
      return [{
        name: meal.name || 'Unknown meal',
        quantity: 1,
        unit: 'serving' as Unit,
        calories: meal.calories || 100,
        protein: meal.protein || 5,
        carbs: meal.carbs || 10,
        fats: meal.fats || 2
      }];
    }
    
    console.log(`Creating structured ingredients from ${stringIngredients.length} string ingredients`);
    
    return stringIngredients.map((ingredientStr, index) => {
      // Skip empty strings
      if (!ingredientStr || typeof ingredientStr !== 'string' || ingredientStr.trim() === '') {
        console.warn(`Empty ingredient at index ${index}, creating default`);
        return {
          name: `Ingredient ${index + 1}`,
          quantity: 1,
          unit: 'serving' as Unit,
          calories: 50,
          protein: 2,
          carbs: 5,
          fats: 2
        };
      }
      
      const trimmedStr = ingredientStr.trim();
      
      // Try to extract quantity and unit with an improved regex
      // This matches patterns like: "1 cup rice", "1.5 cups of rice", "100g chicken", "1/2 tsp salt"
      const regex = /^([\d./]+)?\s*([a-zA-Z]+)?\s*(?:of\s+)?(.+)$/i;
      const matches = trimmedStr.match(regex);
      
      if (matches && matches.length >= 4) {
        let [_, quantityStr, unit, name] = matches;
        
        // Parse quantity, handling fractions
        let quantity = 1; // Default
        if (quantityStr) {
          if (quantityStr.includes('/')) {
            const [numerator, denominator] = quantityStr.split('/');
            quantity = parseFloat(numerator) / parseFloat(denominator);
          } else {
            quantity = parseFloat(quantityStr);
          }
          
          // Safety check for NaN
          if (isNaN(quantity)) quantity = 1;
        }
        
        // Normalize unit
        let normalizedUnit: Unit = 'serving';
        if (unit) {
          unit = unit.toLowerCase();
          if (['g', 'gram', 'grams'].includes(unit)) normalizedUnit = 'g';
          else if (['kg', 'kilogram', 'kilograms'].includes(unit)) normalizedUnit = 'g'; // Convert to g
          else if (['ml', 'milliliter', 'milliliters'].includes(unit)) normalizedUnit = 'ml';
          else if (['l', 'liter', 'liters'].includes(unit)) normalizedUnit = 'ml'; // Convert to ml
          else if (['tbsp', 'tablespoon', 'tablespoons'].includes(unit)) normalizedUnit = 'tbsp';
          else if (['tsp', 'teaspoon', 'teaspoons'].includes(unit)) normalizedUnit = 'tsp';
          else if (['cup', 'cups'].includes(unit)) normalizedUnit = 'cup';
          else if (['oz', 'ounce', 'ounces'].includes(unit)) normalizedUnit = 'oz';
          else if (['piece', 'pieces'].includes(unit)) normalizedUnit = 'piece';
          else if (['serving', 'servings'].includes(unit)) normalizedUnit = 'serving';
          else normalizedUnit = 'serving'; // Default
        }
        
        // Clean up name
        name = name.trim();
        
        // Set default nutritional values based on the ingredient
        let calories = 50, protein = 2, carbs = 5, fats = 2;
        
        // Adjust nutrition based on some common ingredients
        const lowerName = name.toLowerCase();
        
        if (lowerName.includes('chicken') || lowerName.includes('beef') || lowerName.includes('fish')) {
          // Protein-rich foods
          calories = quantity * 150;
          protein = quantity * 25;
          carbs = quantity * 0;
          fats = quantity * 8;
        } else if (lowerName.includes('rice') || lowerName.includes('pasta') || lowerName.includes('bread')) {
          // Carb-rich foods
          calories = quantity * 130;
          protein = quantity * 3;
          carbs = quantity * 25;
          fats = quantity * 1;
        } else if (lowerName.includes('oil') || lowerName.includes('butter') || lowerName.includes('nuts')) {
          // Fat-rich foods
          calories = quantity * 120;
          protein = quantity * 0;
          carbs = quantity * 0;
          fats = quantity * 14;
        } else if (lowerName.includes('vegetable') || lowerName.includes('broccoli') || lowerName.includes('spinach')) {
          // Vegetables
          calories = quantity * 30;
          protein = quantity * 2;
          carbs = quantity * 5;
          fats = quantity * 0;
        } else if (lowerName.includes('fruit') || lowerName.includes('apple') || lowerName.includes('banana')) {
          // Fruits
          calories = quantity * 60;
          protein = quantity * 0;
          carbs = quantity * 15;
          fats = quantity * 0;
        }
        
        return {
          name,
          quantity,
          unit: normalizedUnit,
          calories,
          protein,
          carbs,
          fats,
          // Store reference values for future
          referenceQuantity: quantity,
          referenceCalories: calories,
          referenceProtein: protein,
          referenceCarbs: carbs,
          referenceFats: fats
        };
      }
      
      // Fallback for strings that don't match the pattern
      return {
        name: trimmedStr,
        quantity: 1,
        unit: 'serving' as Unit,
        calories: 50,
        protein: 2,
        carbs: 5,
        fats: 2
      };
    });
  };
  
  // Recalculate nutrition when structured ingredients change
  useEffect(() => {
    if (structuredIngredients.length > 0) {
      // Calculate totals
      const totals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
      };
      
      structuredIngredients.forEach(ingredient => {
        totals.calories += ingredient.calories || 0;
        totals.protein += ingredient.protein || 0;
        totals.carbs += ingredient.carbs || 0;
        totals.fats += ingredient.fats || 0;
      });
      
      // Round values
      totals.calories = Math.round(totals.calories);
      totals.protein = Number(totals.protein.toFixed(1));
      totals.carbs = Number(totals.carbs.toFixed(1));
      totals.fats = Number(totals.fats.toFixed(1));
      
      setCurrentNutrition(totals);
    }
  }, [structuredIngredients]);
  
  // Handle adding a new food item
  const handleAddFoodItem = useCallback(() => {
    navigation.navigate('FoodSearch', {
      onSelect: (foodItem: any, quantity: number, unit: Unit) => {
        // Calculate nutrition based on the selected quantity
        const scaleFactor = quantity / foodItem.baseQuantity;
        let calories = Math.round(foodItem.calories * scaleFactor);
        let protein = Number((foodItem.protein * scaleFactor).toFixed(1));
        let carbs = Number((foodItem.carbs * scaleFactor).toFixed(1));
        let fats = Number((foodItem.fats * scaleFactor).toFixed(1));
        
        // Enforce maximum quantity based on unit to prevent unreasonable values
        // This prevents users from adding billions of calories
        const maxAllowedByUnit: Record<string, number> = {
          g: 2000, // 2kg max
          ml: 2000, // 2L max
          oz: 70, // ~2kg
          lb: 4.4, // ~2kg
          cup: 8, // 8 cups (half gallon)
          tbsp: 32, // 2 cups
          tsp: 96, // 2 cups
          serving: 10, // 10 servings max
          piece: 50, // 50 pieces max
          slice: 50, // 50 slices max
        };
        
        let adjustedQuantity = quantity;
        const maxForUnit = maxAllowedByUnit[unit] || 10;
        
        if (quantity > maxForUnit) {
          console.log(`Quantity ${quantity} exceeds maximum ${maxForUnit} for unit ${unit}, capping`);
          adjustedQuantity = maxForUnit;
          
          // Show toast notification about the cap
          Toast.show({
            type: 'info',
            text1: 'Quantity adjusted',
            text2: `Maximum allowed for ${unit} is ${maxForUnit}`,
            position: 'bottom'
          });
          
          // Recalculate nutrition with adjusted quantity
          const newScaleFactor = adjustedQuantity / foodItem.baseQuantity;
          calories = Math.round(foodItem.calories * newScaleFactor);
          protein = Number((foodItem.protein * newScaleFactor).toFixed(1));
          carbs = Number((foodItem.carbs * newScaleFactor).toFixed(1));
          fats = Number((foodItem.fats * newScaleFactor).toFixed(1));
        }
        
        // Create a new structured ingredient
        const newIngredient: StructuredIngredient = {
          name: foodItem.name,
          quantity: adjustedQuantity,
          unit: unit as Unit,
          calories: calories,
          protein: protein,
          carbs: carbs,
          fats: fats,
          foodItemId: foodItem._id,
          // Add reference values for future
          referenceQuantity: adjustedQuantity,
          referenceCalories: calories,
          referenceProtein: protein,
          referenceCarbs: carbs,
          referenceFats: fats
        };
        
        // Add to the state
        const updatedIngredients = [...structuredIngredients, newIngredient];
        setStructuredIngredients(updatedIngredients);
        
        // Flash a success message
        Toast.show({
          type: 'success',
          text1: 'Added to meal',
          text2: `${foodItem.name} - ${adjustedQuantity} ${unit}`,
          position: 'bottom'
        });
        
        // Make sure the cache is updated immediately
        try {
          planService.invalidateCache();
        } catch (error) {
          console.warn("Failed to invalidate cache after adding ingredient:", error);
        }
      }
    });
  }, [structuredIngredients, navigation]);
  
  // Calculate total nutrition from ingredients
  const calculateTotalNutrition = (ingredients: StructuredIngredient[]) => {
    const total = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    };
    
    ingredients.forEach(ingredient => {
      total.calories += ingredient.calories || 0;
      total.protein += ingredient.protein || 0;
      total.carbs += ingredient.carbs || 0;
      total.fats += ingredient.fats || 0;
    });
    
    // Apply final meal-level caps
    const MAX_MEAL_CALORIES = 3000;
    const MAX_MEAL_PROTEIN = 250;
    const MAX_MEAL_CARBS = 300;
    const MAX_MEAL_FATS = 150;
    
    if (total.calories > MAX_MEAL_CALORIES) {
      console.log(`WARNING: Total calories (${total.calories}) exceeds maximum allowed (${MAX_MEAL_CALORIES})`);
      total.calories = MAX_MEAL_CALORIES;
    }
    
    if (total.protein > MAX_MEAL_PROTEIN) {
      console.log(`WARNING: Total protein (${total.protein}) exceeds maximum allowed (${MAX_MEAL_PROTEIN})`);
      total.protein = MAX_MEAL_PROTEIN;
    }
    
    if (total.carbs > MAX_MEAL_CARBS) {
      console.log(`WARNING: Total carbs (${total.carbs}) exceeds maximum allowed (${MAX_MEAL_CARBS})`);
      total.carbs = MAX_MEAL_CARBS;
    }
    
    if (total.fats > MAX_MEAL_FATS) {
      console.log(`WARNING: Total fats (${total.fats}) exceeds maximum allowed (${MAX_MEAL_FATS})`);
      total.fats = MAX_MEAL_FATS;
    }
    
    return {
      calories: parseFloat(total.calories.toFixed(1)),
      protein: parseFloat(total.protein.toFixed(1)),
      carbs: parseFloat(total.carbs.toFixed(1)),
      fats: parseFloat(total.fats.toFixed(1))
    };
  };
  
  // Handle removing an ingredient
  const handleRemoveIngredient = useCallback((index: number) => {
    Alert.alert(
      'Remove Ingredient',
      'Are you sure you want to remove this ingredient?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setStructuredIngredients(prev => 
              prev.filter((_, i) => i !== index)
            );
          }
        }
      ]
    );
  }, []);
  
  // Save meal with updated ingredients
  const handleSave = async () => {
    try {
      setSaving(true);
      
      console.log(`Saving meal changes with structured ingredients: ${structuredIngredients.length}`);
      
      // First - completely clear all caches BEFORE saving
      try {
        await planService.invalidateCache();
        console.log("Cache invalidated before saving");
      } catch (cacheError) {
        console.warn('Initial cache invalidation warning:', cacheError);
      }
      
      // Make a single API call to update all ingredients at once
      const response = await planService.updateMealIngredients(meal._id || '', structuredIngredients);
      
      if (response && response.meal) {
        console.log(`Meal saved successfully with ${response.meal.structuredIngredients?.length || 0} ingredients`);
        console.log(`Server returned nutrition: cal=${response.meal.calories}, p=${response.meal.protein}, c=${response.meal.carbs}, f=${response.meal.fats}`);
        
        try {
          // Perform a STRONG cache refresh - this is more aggressive than just invalidation
          await planService.strongRefresh();
          console.log("Strong refresh completed after meal update");
        } catch (refreshError) {
          console.error("Strong refresh failed:", refreshError);
          // If strong refresh fails, try normal invalidation as backup
          await planService.invalidateCache();
        }
        
        // Create a timestamp to force refresh at the destination
        const timestamp = Date.now();
        
        // Show success message
        Toast.show({
          type: 'success',
          text1: 'Changes saved',
          position: 'bottom'
        });
        
        // Navigate with force refresh to ensure the UI updates
        // Use resetTo to make sure we get a fresh version of the screens
        if (referrer === 'Home') {
          navigation.reset({
            index: 0,
            routes: [
              { 
                name: 'MainTabs', 
                params: { 
                  screen: 'Home', 
                  params: { 
                    forceRefresh: true, 
                    refresh: timestamp, 
                    mealUpdated: meal._id 
                  } 
                } 
              }
            ]
          });
        } else if (referrer === 'Schedule') {
          navigation.reset({
            index: 0,
            routes: [
              { 
                name: 'MainTabs', 
                params: { 
                  screen: 'Schedule', 
                  params: { 
                    forceRefresh: true, 
                    refresh: timestamp, 
                    dayIndex, 
                    mealUpdated: meal._id 
                  } 
                } 
              }
            ]
          });
        } else {
          // For other screens, go back with a delay to ensure cache is cleared
          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }
      } else {
        throw new Error('Failed to save meal changes: No response data');
      }
    } catch (error) {
      console.error(`Error saving meal changes:`, error);
      
      // Show error message with more details
      Toast.show({
        type: 'error',
        text1: 'Failed to save changes',
        text2: error instanceof Error ? error.message : 'Network or server error',
        position: 'bottom',
        visibilityTime: 4000, // Show longer for errors
      });
      
      // Try to invalidate cache even if save failed
      try {
        await planService.invalidateCache();
      } catch (cacheError) {
        console.error(`Error invalidating cache:`, cacheError);
      }
    } finally {
      setSaving(false);
    }
  };
  
  // Calculate nutrition differences
  const getNutritionDiff = () => {
    return {
      calories: currentNutrition.calories - originalNutrition.calories,
      protein: Number((currentNutrition.protein - originalNutrition.protein).toFixed(1)),
      carbs: Number((currentNutrition.carbs - originalNutrition.carbs).toFixed(1)),
      fats: Number((currentNutrition.fats - originalNutrition.fats).toFixed(1))
    };
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={styles.loadingText}>Loading meal ingredients...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Ingredients</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FF0000" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Meal Name and Info */}
      <View style={styles.mealInfoContainer}>
        <Text style={styles.mealName}>{meal.name}</Text>
        <Text style={styles.mealTiming}>{meal.timing || 'No specific timing'}</Text>
      </View>
      
      {/* Nutrition Summary */}
      <NutritionSummary 
        current={currentNutrition}
        original={originalNutrition}
        differences={getNutritionDiff()}
      />
      
      <Text style={styles.sectionTitle}>Ingredients</Text>
      
      {/* Ingredients List */}
      <ScrollView style={styles.ingredientsList}>
        {structuredIngredients.map((ingredient, index) => (
          <IngredientItem
            key={`${ingredient.name}-${index}`}
            ingredient={ingredient}
            index={index}
            onRemove={handleRemoveIngredient}
          />
        ))}
        
        {/* Add New Ingredient Button */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddFoodItem}
        >
          <Ionicons name="add-circle" size={22} color="#FF0000" />
          <Text style={styles.addButtonText}>Add New Food Item</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Bottom Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.confirmButton]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.confirmButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    color: '#FF0000',
    fontWeight: '600',
    fontSize: 16,
  },
  mealInfoContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealTiming: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  ingredientsList: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF0000',
    borderStyle: 'dashed',
  },
  addButtonText: {
    marginLeft: 8,
    color: '#FF0000',
    fontWeight: '500',
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F2F2F2',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#FF0000',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default MealEditorScreen; 