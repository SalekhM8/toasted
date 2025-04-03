import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Modal
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, FoodSearchScreenParams } from '../../types/navigation.types';
import { FoodItem, FoodCategory, Unit } from '../../types/food.types';
import { foodService } from '../../services/foodService';
import debounce from 'debounce';
import QuantitySelector from '../../components/meals/QuantitySelector';

type FoodSearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type FoodSearchScreenRouteProp = RouteProp<RootStackParamList, 'FoodSearch'>;

// Food categories with labels and icons
const FOOD_CATEGORIES: Array<{
  value: string;
  label: string;
  icon: string;
}> = [
  { value: 'all', label: 'All Foods', icon: 'restaurant-outline' },
  { value: 'fruits', label: 'Fruits', icon: 'nutrition-outline' },
  { value: 'vegetables', label: 'Vegetables', icon: 'leaf-outline' },
  { value: 'protein', label: 'Protein', icon: 'fitness-outline' },
  { value: 'grains', label: 'Grains', icon: 'sunny-outline' },
  { value: 'dairy', label: 'Dairy', icon: 'water-outline' },
  { value: 'snacks', label: 'Snacks', icon: 'fast-food-outline' },
  { value: 'beverages', label: 'Beverages', icon: 'cafe-outline' },
  { value: 'packaged-foods', label: 'Packaged', icon: 'cube-outline' },
  { value: 'desserts', label: 'Desserts', icon: 'ice-cream-outline' },
];

const FoodSearchScreen = () => {
  const navigation = useNavigation<FoodSearchScreenNavigationProp>();
  const route = useRoute<FoodSearchScreenRouteProp>();
  const { onSelect, initialCategory = 'all' } = route.params;
  
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState<number>(100);
  const [unit, setUnit] = useState<Unit>('g');
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  
  // Search functionality with debounce
  const debouncedSearch = useCallback(
    debounce((query: string, category: string, page: number) => {
      searchFoodItems(query, category, page);
    }, 300),
    []
  );
  
  // Fetch food items based on search criteria
  const searchFoodItems = async (query: string, category: string, page: number) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await foodService.searchFoodItems(query, category, 20, page);
      
      if (page === 1) {
        setFoodItems(response.items);
      } else {
        setFoodItems(prev => [...prev, ...response.items]);
      }
      
      setTotalPages(response.pagination.pages);
    } catch (error) {
      console.error('Error searching food items:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial search on mount and when parameters change
  useEffect(() => {
    debouncedSearch(searchQuery, selectedCategory, 1);
  }, [searchQuery, selectedCategory]);
  
  // Handle pagination
  const handleLoadMore = () => {
    if (loading || page >= totalPages) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    searchFoodItems(searchQuery, selectedCategory, nextPage);
  };
  
  // Handle food item selection
  const handleSelectFood = (item: FoodItem) => {
    setSelectedFood(item);
    
    // Set default quantity and unit based on the food item
    if (item.commonServingSize && item.commonServingUnit) {
      setQuantity(item.commonServingSize);
      setUnit(item.commonServingUnit);
    } else {
      setQuantity(100);
      setUnit(item.baseUnit || 'g');
    }
    
    setQuantityModalVisible(true);
  };
  
  // Confirm selection with quantity
  const handleConfirmSelection = () => {
    if (!selectedFood) return;
    
    onSelect(selectedFood, quantity, unit);
    setQuantityModalVisible(false);
    navigation.goBack();
  };
  
  // Render food item in the list
  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity 
      style={styles.foodItem}
      onPress={() => handleSelectFood(item)}
    >
      <View style={styles.foodItemContent}>
        <View style={styles.foodItemDetails}>
          <Text style={styles.foodItemName}>{item.name}</Text>
          {item.brand && (
            <Text style={styles.foodItemBrand}>{item.brand}</Text>
          )}
          <Text style={styles.foodItemServing}>
            {item.baseQuantity}{item.baseUnit} serving
          </Text>
        </View>
        <View style={styles.foodItemNutrition}>
          <Text style={styles.caloriesText}>{item.calories} cal</Text>
          <View style={styles.macrosRow}>
            <Text style={styles.macroText}>P: {item.protein}g</Text>
            <Text style={styles.macroText}>C: {item.carbs}g</Text>
            <Text style={styles.macroText}>F: {item.fats}g</Text>
          </View>
        </View>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color="#CCC" 
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
  
  // Render category filter item
  const renderCategoryItem = ({ item }: { item: typeof FOOD_CATEGORIES[0] }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem,
        selectedCategory === item.value && styles.selectedCategory
      ]}
      onPress={() => {
        setSelectedCategory(item.value);
        setPage(1);
      }}
    >
      <Ionicons 
        name={item.icon as any} 
        size={22} 
        color={selectedCategory === item.value ? '#FF0000' : '#555'} 
      />
      <Text 
        style={[
          styles.categoryLabel,
          selectedCategory === item.value && styles.selectedCategoryLabel
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
  
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
        <Text style={styles.headerTitle}>Add Food</Text>
        <View style={{ width: 32 }} />
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food..."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setPage(1);
            }}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>
      </View>
      
      {/* Category filters */}
      <View style={styles.categoryListContainer}>
        <FlatList
          data={FOOD_CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>
      
      {/* Food Items List */}
      <FlatList
        data={foodItems}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator 
              size="small" 
              color="#FF0000" 
              style={styles.loadingIndicator} 
            />
          ) : null
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color="#CCC" />
              <Text style={styles.emptyStateText}>
                {searchQuery 
                  ? 'No food items found. Try a different search.'
                  : 'Search for food to add to your meal.'
                }
              </Text>
            </View>
          ) : null
        }
      />
      
      {/* Quantity Selection Modal */}
      <Modal
        visible={quantityModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setQuantityModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Quantity</Text>
              <TouchableOpacity 
                onPress={() => setQuantityModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            {selectedFood && (
              <View style={styles.selectedFoodInfo}>
                <Text style={styles.selectedFoodName}>{selectedFood.name}</Text>
                {selectedFood.brand && (
                  <Text style={styles.selectedFoodBrand}>{selectedFood.brand}</Text>
                )}
                
                <View style={styles.nutritionBox}>
                  <Text style={styles.nutritionBoxTitle}>
                    Nutrition per {selectedFood.baseQuantity}{selectedFood.baseUnit}
                  </Text>
                  <View style={styles.nutritionBoxContent}>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionValue}>{selectedFood.calories}</Text>
                      <Text style={styles.nutritionLabel}>calories</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionValue}>{selectedFood.protein}g</Text>
                      <Text style={styles.nutritionLabel}>protein</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionValue}>{selectedFood.carbs}g</Text>
                      <Text style={styles.nutritionLabel}>carbs</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionValue}>{selectedFood.fats}g</Text>
                      <Text style={styles.nutritionLabel}>fats</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            
            <QuantitySelector 
              quantity={quantity}
              setQuantity={setQuantity}
              unit={unit}
              setUnit={setUnit}
              availableUnits={[selectedFood?.baseUnit || 'g']}
            />
            
            {selectedFood && (
              <View style={styles.calculatedNutrition}>
                <Text style={styles.calculatedTitle}>
                  Nutrition for {quantity}{unit}:
                </Text>
                <View style={styles.calculatedValues}>
                  <Text style={styles.calculatedItem}>
                    {Math.round(selectedFood.calories * (quantity / selectedFood.baseQuantity))} calories
                  </Text>
                  <Text style={styles.calculatedItem}>
                    {(selectedFood.protein * (quantity / selectedFood.baseQuantity)).toFixed(1)}g protein
                  </Text>
                  <Text style={styles.calculatedItem}>
                    {(selectedFood.carbs * (quantity / selectedFood.baseQuantity)).toFixed(1)}g carbs
                  </Text>
                  <Text style={styles.calculatedItem}>
                    {(selectedFood.fats * (quantity / selectedFood.baseQuantity)).toFixed(1)}g fats
                  </Text>
                </View>
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleConfirmSelection}
            >
              <Text style={styles.addButtonText}>Add to Meal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
  searchBarContainer: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  categoryListContainer: {
    marginVertical: 10,
    paddingHorizontal: 16,
    height: 60,
  },
  categoryList: {
    paddingVertical: 5,
    paddingBottom: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 5,
  },
  selectedCategory: {
    backgroundColor: '#FFEBEE',
  },
  categoryLabel: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  selectedCategoryLabel: {
    color: '#FF0000',
    fontWeight: '500',
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  foodItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodItemDetails: {
    flex: 2,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  foodItemBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  foodItemServing: {
    fontSize: 12,
    color: '#999',
  },
  foodItemNutrition: {
    flex: 1,
    alignItems: 'flex-end',
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF0000',
    marginBottom: 4,
  },
  macrosRow: {
    flexDirection: 'row',
  },
  macroText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  chevron: {
    marginLeft: 8,
  },
  loadingIndicator: {
    margin: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 80,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  selectedFoodInfo: {
    marginBottom: 20,
  },
  selectedFoodName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedFoodBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  nutritionBox: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  nutritionBoxTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  nutritionBoxContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF0000',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
  },
  calculatedNutrition: {
    marginTop: 16,
    marginBottom: 24,
  },
  calculatedTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  calculatedValues: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calculatedItem: {
    fontSize: 14,
    color: '#333',
    marginRight: 16,
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FoodSearchScreen; 