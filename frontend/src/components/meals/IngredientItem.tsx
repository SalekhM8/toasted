import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StructuredIngredient } from '../../types/food.types';

interface IngredientItemProps {
  ingredient: StructuredIngredient;
  index: number;
  onRemove: (index: number) => void;
}

const IngredientItem: React.FC<IngredientItemProps> = ({
  ingredient,
  index,
  onRemove
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format nutrition values to prevent display issues
  const formatNumber = (value: number | undefined | null): string => {
    if (value === undefined || value === null) return '0';
    
    // For small decimals, show 1 decimal place, otherwise round to whole number
    return value < 10 ? value.toFixed(1) : Math.round(value).toString();
  };
  
  // Sanitize nutrition values
  const safeNutrition = useMemo(() => {
    return {
      calories: formatNumber(ingredient.calories),
      protein: formatNumber(ingredient.protein),
      carbs: formatNumber(ingredient.carbs),
      fats: formatNumber(ingredient.fats)
    };
  }, [ingredient]);
  
  // Ensure the ingredient name is always valid
  const ingredientName = useMemo(() => {
    return ingredient.name && ingredient.name.trim() !== '' 
      ? ingredient.name 
      : `Ingredient ${index + 1}`;
  }, [ingredient.name, index]);
  
  // Format quantity and unit display
  const quantityDisplay = useMemo(() => {
    const qty = ingredient.quantity !== undefined && !isNaN(ingredient.quantity)
      ? ingredient.quantity
      : 0;
      
    const unit = ingredient.unit || 'serving';
    
    return `${qty}${unit}`;
  }, [ingredient.quantity, ingredient.unit]);
  
  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        <TouchableOpacity 
          style={styles.nameContainer}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.ingredientName}>{ingredientName}</Text>
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityBadgeText}>
              {quantityDisplay}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => onRemove(index)}
        >
          <Ionicons name="trash-outline" size={16} color="#FF0000" />
        </TouchableOpacity>
      </View>
      
      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.nutritionContainer}>
            <Text style={styles.nutritionTitle}>Nutrition:</Text>
            <View style={styles.nutritionValues}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{safeNutrition.calories}</Text>
                <Text style={styles.nutritionLabel}>calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{safeNutrition.protein}g</Text>
                <Text style={styles.nutritionLabel}>protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{safeNutrition.carbs}g</Text>
                <Text style={styles.nutritionLabel}>carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{safeNutrition.fats}g</Text>
                <Text style={styles.nutritionLabel}>fats</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  quantityBadge: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  quantityBadgeText: {
    fontSize: 12,
    color: '#555',
  },
  removeButton: {
    padding: 8,
  },
  expandedContent: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    paddingTop: 12,
  },
  nutritionContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 10,
  },
  nutritionTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  nutritionValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF0000',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#777',
  },
});

export default IngredientItem; 