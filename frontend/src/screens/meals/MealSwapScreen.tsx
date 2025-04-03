import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Platform,
  StatusBar
} from 'react-native';
import { useNavigation, useRoute, CommonActions, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { planService } from '../../services/planService';
import { Meal, MacroComparison } from '../../types/plan.types';
import { BottomTabParamList, RootStackParamList } from '../../types/navigation.types';

interface MealSwapScreenParams {
  originalMeal: Meal;
  date: string;
  mealNumber: number;
  referrer?: 'Home' | 'Schedule';
  dayIndex?: number;
}

const MealSwapScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { originalMeal, date, mealNumber, referrer = 'Home', dayIndex } = route.params as MealSwapScreenParams;
  
  const [loading, setLoading] = useState(true);
  const [alternativeMeals, setAlternativeMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
  const [swapError, setSwapError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchAlternativeMeals();
  }, []);
  
  const fetchAlternativeMeals = async () => {
    try {
      setLoading(true);
      const response = await planService.findAlternativeMeals(date, mealNumber);
      console.log('Found alternative meals:', response.alternativeMeals.length);
      setAlternativeMeals(response.alternativeMeals);
    } catch (error) {
      console.error('Error fetching alternative meals:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleMealSelect = (meal: Meal) => {
    setSelectedMeal(meal);
    setConfirmModalVisible(true);
  };
  
  const handleConfirmSwap = async () => {
    if (!selectedMeal || !selectedMeal._id) {
      setSwapError("Cannot swap meal: missing meal ID");
      return;
    }
    
    try {
      setLoading(true);
      setSwapError(null);
      
      console.log(`Swapping meal ${mealNumber} with ${selectedMeal.name} (ID: ${selectedMeal._id})`);
      
      const response = await planService.swapMeal({
        newMealId: selectedMeal._id,
        date,
        mealNumber
      });
      
      console.log('MEAL SWAP - SWAP RESPONSE FULL DATA:', JSON.stringify(response));
      
      // Check for plan data - prefer server-provided data if available
      const directPlan = response.todaysPlan || response.freshPlan;
      
      console.log('MEAL SWAP - DIRECT PLAN STRUCTURE:', JSON.stringify({
        planExists: !!directPlan,
        mealsExists: !!directPlan?.meals,
        mealsType: typeof directPlan?.meals,
        mealsIsArray: Array.isArray(directPlan?.meals),
        firstItemType: typeof directPlan?.meals?.[0],
        firstItemIsArray: Array.isArray(directPlan?.meals?.[0]),
        firstMealName: directPlan?.meals?.[0]?.name || 
          (Array.isArray(directPlan?.meals?.[0]) ? directPlan?.meals?.[0][0]?.name : 'No name')
      }));
      
      if (!directPlan) {
        console.log('No direct plan data available from response, will force refresh on home screen');
      } else {
        console.log(`Using direct plan data from server-side or client-side fetch to update ${referrer} screen`);
      }
      
      // Thoroughly invalidate any cached plan data to ensure a fresh fetch
      await planService.invalidateCache();
      
      setSwapSuccess(true);
      console.log(`Meal swap successful, preparing to navigate back to ${referrer} screen`);
      
      // Simplified navigation with explicit forceRefresh flag and freshPlan data
      setTimeout(() => {
        try {
          console.log('MEAL SWAP - BEFORE NAVIGATION, plan to pass:', JSON.stringify({
            directPlanExists: !!directPlan,
            mealsCount: directPlan?.meals?.length || 0,
            firstMealName: directPlan?.meals?.[0]?.name || 
              (Array.isArray(directPlan?.meals?.[0]) ? directPlan?.meals?.[0][0]?.name : 'No name')
          }));
          
          // Navigate back to the appropriate screen based on referrer
          if (referrer === 'Schedule') {
            console.log('Navigating to Schedule with forceRefresh parameter');
            navigation.navigate('MainTabs', {
              screen: 'Schedule',
              params: { 
                refresh: Date.now(),
                forceRefresh: true,
                swappedMealInfo: {
                  mealNumber,
                  newMealName: selectedMeal.name,
                  originalMealName: originalMeal.name
                },
                dayIndex
              }
            });
          } else {
            console.log('Navigating to Home with forceRefresh parameter and direct plan data');
            // Use a simpler navigation approach with direct plan data
            navigation.navigate('MainTabs', {
              screen: 'Home',
              params: { 
                refresh: Date.now(),
                forceRefresh: true,
                // Pass the fresh plan directly to avoid any fetching issues
                directPlan, 
                swappedMealInfo: {
                  mealNumber,
                  newMealName: selectedMeal.name,
                  originalMealName: originalMeal.name
                }
              }
            });
          }
        } catch (error) {
          console.error('Navigation error:', error);
          // Fallback navigation
          navigation.dispatch(
            CommonActions.navigate({
              name: referrer,
              params: { 
                refresh: Date.now(),
                forceRefresh: true,
                directPlan: referrer === 'Home' ? directPlan : undefined
              }
            })
          );
        }
      }, 1500);
    } catch (error) {
      console.error('Error swapping meal:', error);
      setSwapError("Failed to swap meal. Please try again.");
    } finally {
      setLoading(false);
      setConfirmModalVisible(false);
    }
  };
  
  const toggleMealDetails = (mealId: string | undefined) => {
    if (!mealId) return;
    setExpandedMealId(expandedMealId === mealId ? null : mealId);
  };
  
  // Calculate macro difference percentages - prevent NaN values
  const calculateMacroComparison = (original: number, alternative: number): MacroComparison => {
    const diff = alternative - original;
    // Prevent division by zero for percentage calculation
    const percentage = original === 0 ? 0 : (diff / original) * 100;
    return {
      value: alternative,
      diff,
      percentage: isNaN(percentage) ? 0 : percentage, // Guard against NaN
      isHigher: diff > 0
    };
  };
  
  // Determine if a nutrient difference should be shown as positive (green) or negative (red)
  const getMacroDiffColor = (macroType: 'protein' | 'carbs' | 'fats', isHigher: boolean): string => {
    if (macroType === 'protein') {
      return isHigher ? '#4CAF50' : '#F44336';  // Green if higher, red if lower
    } else if (macroType === 'fats') {
      return isHigher ? '#F44336' : '#4CAF50';  // Red if higher, green if lower
    } else {
      // For carbs, we're neutral
      return isHigher ? '#FF9800' : '#2196F3';  // Orange if higher, blue if lower
    }
  };
  
  const renderMacroComparison = (
    label: string, 
    comparison: MacroComparison, 
    unit: string,
    macroType?: 'protein' | 'carbs' | 'fats'
  ) => {
    // For calories, we use neutral colors
    const textColor = macroType 
      ? getMacroDiffColor(macroType, comparison.isHigher) 
      : comparison.isHigher ? '#FF9800' : '#2196F3';  // Orange if higher, blue if lower for calories
    
    return (
      <View style={styles.macroItem}>
        <Text style={styles.macroValue}>
          {comparison.value}{unit}
        </Text>
        <Text style={styles.macroLabel}>
          {label}
        </Text>
        <View style={styles.diffRow}>
          <Ionicons 
            name={comparison.isHigher ? 'arrow-up' : 'arrow-down'} 
            size={16} 
            color={textColor} 
          />
          <Text style={[styles.diffText, { color: textColor }]}>
            {Math.abs(comparison.diff).toFixed(0)}{unit} ({Math.abs(comparison.percentage).toFixed(0)}%)
          </Text>
        </View>
      </View>
    );
  };
  
  const renderMealCard = ({ item }: { item: Meal }) => {
    if (!item) return null;
    
    const isExpanded = expandedMealId === item._id;
    const calorieComparison = calculateMacroComparison(originalMeal.calories || 0, item.calories || 0);
    const proteinComparison = calculateMacroComparison(originalMeal.protein || 0, item.protein || 0);
    const carbsComparison = calculateMacroComparison(originalMeal.carbs || 0, item.carbs || 0);
    const fatsComparison = calculateMacroComparison(originalMeal.fats || 0, item.fats || 0);
    
    return (
      <View style={styles.mealCard}>
        <View style={styles.mealCardContent}>
          <View style={styles.mealHeader}>
            <Text style={styles.mealName}>{item.name || 'Unnamed Meal'}</Text>
            <TouchableOpacity onPress={() => toggleMealDetails(item._id)}>
              <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          {item.category && (
            <View style={[
              styles.categoryTag, 
              item.category === 'restaurant' ? styles.restaurantTag :
              item.category === 'fast-food' ? styles.fastFoodTag :
              item.category === 'takeout' ? styles.takeoutTag :
              styles.homeCookedTag
            ]}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          )}
          
          <View style={styles.macrosContainer}>
            {renderMacroComparison('Calories', calorieComparison, '')}
            {renderMacroComparison('Protein', proteinComparison, 'g', 'protein')}
            {renderMacroComparison('Carbs', carbsComparison, 'g', 'carbs')}
            {renderMacroComparison('Fats', fatsComparison, 'g', 'fats')}
          </View>
          
          {isExpanded && (
            <View style={styles.expandedDetails}>
              {item.notes && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>About this meal:</Text>
                  <Text style={styles.mealNotes}>{item.notes}</Text>
                </View>
              )}
              
              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Nutrition Facts:</Text>
                <View style={styles.nutritionFactsContainer}>
                  <View style={styles.nutritionFactItem}>
                    <Text style={styles.nutritionFactValue}>{item.calories || 0}</Text>
                    <Text style={styles.nutritionFactLabel}>Calories</Text>
                  </View>
                  <View style={styles.nutritionFactItem}>
                    <Text style={styles.nutritionFactValue}>{item.protein || 0}g</Text>
                    <Text style={styles.nutritionFactLabel}>Protein</Text>
                  </View>
                  <View style={styles.nutritionFactItem}>
                    <Text style={styles.nutritionFactValue}>{item.carbs || 0}g</Text>
                    <Text style={styles.nutritionFactLabel}>Carbs</Text>
                  </View>
                  <View style={styles.nutritionFactItem}>
                    <Text style={styles.nutritionFactValue}>{item.fats || 0}g</Text>
                    <Text style={styles.nutritionFactLabel}>Fats</Text>
                  </View>
                </View>
              </View>
              
              {item.category && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Meal Type:</Text>
                  <View style={[
                    styles.categoryTagLarge, 
                    item.category === 'restaurant' ? styles.restaurantTag :
                    item.category === 'fast-food' ? styles.fastFoodTag :
                    item.category === 'takeout' ? styles.takeoutTag :
                    styles.homeCookedTag
                  ]}>
                    <Text style={styles.categoryTextLarge}>{item.category}</Text>
                  </View>
                </View>
              )}
              
              {item.ingredients && item.ingredients.length > 0 && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Ingredients:</Text>
                  <View style={styles.ingredientsContainer}>
                    {item.ingredients.map((ingredient, idx) => (
                      <View key={`ing-${idx}`} style={styles.ingredientItem}>
                        <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                        <Text style={styles.detailItem}>
                          {ingredient}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              
              {/* Display structured ingredients if available */}
              {item.structuredIngredients && item.structuredIngredients.length > 0 && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Detailed Ingredients:</Text>
                  <View style={styles.ingredientsContainer}>
                    {item.structuredIngredients.map((ingredient, idx) => (
                      <View key={`struct-ing-${idx}`} style={styles.structuredIngredientItem}>
                        <Ionicons name="nutrition" size={16} color="#4CAF50" />
                        <Text style={styles.detailItem}>
                          {ingredient.name}: {ingredient.quantity}{ingredient.unit || 'g'} 
                          {ingredient.calories > 0 && ` (${ingredient.calories} cal)`}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              
              {item.instructions && item.instructions.length > 0 && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailTitle}>Instructions:</Text>
                  <View style={styles.instructionsContainer}>
                    {item.instructions.map((instruction, idx) => (
                      <View key={`ins-${idx}`} style={styles.instructionItem}>
                        <Text style={styles.instructionNumber}>{idx + 1}</Text>
                        <Text style={styles.detailItem}>
                          {instruction}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => handleMealSelect(item)}
        >
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  if (loading && !swapSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FF0000" />
          <Text style={styles.loadingText}>{selectedMeal ? "Swapping meal..." : "Finding alternative meals..."}</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (swapSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
          <Text style={styles.successText}>Meal swapped successfully!</Text>
          <Text style={styles.successSubText}>Returning to your meal plan...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Swap Meal</Text>
        <View style={styles.headerRight} /> {/* Empty view for balanced layout */}
      </View>
      
      <View style={styles.originalMealContainer}>
        <Text style={styles.sectionTitle}>Current Meal</Text>
        <View style={styles.originalMealCard}>
          <Text style={styles.originalMealName}>{originalMeal.name}</Text>
          <View style={styles.macrosRow}>
            <Text style={styles.macrosText}>Calories: {originalMeal.calories || 0}</Text>
            <Text style={styles.macrosText}>Protein: {originalMeal.protein || 0}g</Text>
            <Text style={styles.macrosText}>Carbs: {originalMeal.carbs || 0}g</Text>
            <Text style={styles.macrosText}>Fats: {originalMeal.fats || 0}g</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.alternativesContainer}>
        <Text style={styles.sectionTitle}>Alternative Meals</Text>
        <Text style={styles.sectionSubtitle}>
          Select a meal with similar nutritional profile
        </Text>
        
        {swapError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{swapError}</Text>
          </View>
        )}
        
        {alternativeMeals.length > 0 ? (
          <FlatList
            data={alternativeMeals}
            renderItem={renderMealCard}
            keyExtractor={(item, index) => `meal-${index}-${item._id || index}`}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No alternative meals found</Text>
          </View>
        )}
      </View>
      
      {/* Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirm Meal Swap</Text>
            <Text style={styles.modalText}>
              Would you like to replace "{originalMeal.name}" with "{selectedMeal?.name}"?
            </Text>
            
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmSwap}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 32, // Same size as back button for balanced layout
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  successText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  successSubText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  originalMealContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  originalMealCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  originalMealName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  macrosRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  macrosText: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
    marginBottom: 4,
  },
  alternativesContainer: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  mealCardContent: {
    padding: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 10,
  },
  restaurantTag: {
    backgroundColor: '#E3F2FD',
  },
  fastFoodTag: {
    backgroundColor: '#FFF8E1',
  },
  takeoutTag: {
    backgroundColor: '#F3E5F5',
  },
  homeCookedTag: {
    backgroundColor: '#E8F5E9',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  macrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  macroItem: {
    width: '48%',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  diffRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diffText: {
    fontSize: 12,
    marginLeft: 2,
  },
  expandedDetails: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  detailItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    flex: 1,
  },
  mealNotes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
    lineHeight: 20,
  },
  nutritionFactsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  nutritionFactItem: {
    alignItems: 'center',
  },
  nutritionFactValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  nutritionFactLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  categoryTagLarge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 4,
  },
  categoryTextLarge: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  ingredientsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  structuredIngredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 4,
    borderLeftWidth: 2,
    borderLeftColor: '#4CAF50',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    backgroundColor: '#FF0000',
    borderRadius: 12,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#FF0000',
    padding: 12,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: '#FF0000',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  }
});

export default MealSwapScreen; 