import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
  StatusBar,
  Modal,
  TextInput,
  Animated,
  Alert,
  FlatList
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { planService } from '../../services/planService';
import { Ionicons } from '@expo/vector-icons';
import { 
  format, 
  addDays, 
  startOfWeek, 
  endOfWeek, 
  addWeeks,
  startOfMonth,
  endOfMonth,
  differenceInDays,
  parseISO,
  parse
} from 'date-fns';
import { Calendar } from 'react-native-calendars';
import { Swipeable } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

// Define the DatePreset type with all needed options
type DatePreset = 'current_week' | 'next_week' | 'two_weeks' | 'month' | 'custom';

// Unit conversion constants
const UNIT_CONVERSIONS: Record<string, number> = {
  // Weight conversions to kg
  'g': 0.001,      // grams to kg
  'kg': 1,         // kg to kg
  'oz': 0.0283495, // ounces to kg
  'lb': 0.453592,  // pounds to kg
  
  // Volume conversions to L
  'ml': 0.001,     // milliliters to L
  'l': 1,          // liters to L
  'cl': 0.01,      // centiliters to L
  'fl oz': 0.0295735, // fluid ounces to L
  'cup': 0.236588, // cups to L
  'pint': 0.568261, // pints to L
  'quart': 1.13652, // quarts to L
  'gallon': 4.54609, // gallons to L
  'tbsp': 0.015,   // tablespoons to L
  'tsp': 0.005,    // teaspoons to L
  'dash': 0.0005,  // dash to L
  'pinch': 0.0001, // pinch to L
  
  // Count (no conversion)
  'item': 1,
  'piece': 1,
  'slice': 1,
  'pack': 1,
  'can': 1,
  'bottle': 1,
  'clove': 1,     // Add clove as a count unit
  '': 1 // Default for empty unit
};

// Standard units for different measurement types
const STANDARD_UNITS = {
  WEIGHT: 'kg',
  VOLUME: 'l', 
  COUNT: 'item'
};

// Determine measurement category based on unit
const getMeasurementCategory = (unit: string): 'WEIGHT' | 'VOLUME' | 'COUNT' => {
  unit = unit?.toLowerCase() || '';
  
  if (['g', 'kg', 'oz', 'lb', 'gram', 'grams', 'kilogram', 'kilograms', 'pound', 'pounds', 'ounce', 'ounces'].includes(unit)) {
    return 'WEIGHT';
  }
  
  if (['ml', 'l', 'cl', 'fl oz', 'cup', 'pint', 'quart', 'gallon', 'milliliter', 'milliliters', 'liter', 'liters', 'fluid ounce', 'fluid ounces', 'tbsp', 'tablespoon', 'tablespoons', 'tsp', 'teaspoon', 'teaspoons', 'dash', 'pinch'].includes(unit)) {
    return 'VOLUME';
  }
  
  if (['item', 'piece', 'slice', 'pack', 'can', 'bottle', 'each', 'clove', 'cloves'].includes(unit)) {
    return 'COUNT';
  }
  
  return 'COUNT';
};

// Normalize unit strings to our standard format
const normalizeUnit = (unit: string | null): string => {
  if (!unit) return '';
  
  unit = unit.toLowerCase().trim();
  
  // Unit name mappings
  const unitMappings: Record<string, string> = {
    'gram': 'g',
    'grams': 'g',
    'kilogram': 'kg',
    'kilograms': 'kg',
    'ounce': 'oz',
    'ounces': 'oz',
    'pound': 'lb',
    'pounds': 'lb',
    'milliliter': 'ml',
    'milliliters': 'ml',
    'liter': 'l',
    'liters': 'l',
    'centiliter': 'cl',
    'centiliters': 'cl',
    'fluid ounce': 'fl oz',
    'fluid ounces': 'fl oz',
    'cups': 'cup',
    'pints': 'pint',
    'quarts': 'quart',
    'gallons': 'gallon',
    'pieces': 'piece',
    'slices': 'slice',
    'packs': 'pack',
    'cans': 'can',
    'bottles': 'bottle',
    'items': 'item',
    'each': 'item',
    'ea': 'item',
    'tablespoon': 'tbsp',
    'tablespoons': 'tbsp',
    'teaspoon': 'tsp',
    'teaspoons': 'tsp',
    'dashes': 'dash',
    'pinches': 'pinch',
    'clove': 'clove',
    'cloves': 'clove'
  };
  
  return unitMappings[unit] || unit;
};

// Convert quantity to standard unit
const convertToStandardUnit = (quantity: number, unit: string | null): { quantity: number, standardUnit: string } => {
  const normalizedUnit = normalizeUnit(unit);
  const category = getMeasurementCategory(normalizedUnit);
  const standardUnit = STANDARD_UNITS[category];
  
  // Get conversion factor or default to 1
  const conversionFactor = UNIT_CONVERSIONS[normalizedUnit] || 1;
  
  return {
    quantity: quantity * conversionFactor,
    standardUnit
  };
};

// Average UK prices for common ingredients (in £) - EXPANDED list
// Prices are per standard unit (kg for weight, L for volume, or per item)
const averagePrices: Record<string, { price: number, category: 'WEIGHT' | 'VOLUME' | 'COUNT', commonUnit: string }> = {
  // Fruits
  'apple': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'banana': { price: 1.00, category: 'COUNT', commonUnit: 'item' },
  'orange': { price: 3.00, category: 'COUNT', commonUnit: 'item' },
  'lemon': { price: 0.50, category: 'COUNT', commonUnit: 'item' },
  'lime': { price: 0.40, category: 'COUNT', commonUnit: 'item' },
  'strawberry': { price: 8.00, category: 'WEIGHT', commonUnit: 'kg' },
  'raspberry': { price: 12.00, category: 'WEIGHT', commonUnit: 'kg' },
  'blueberry': { price: 14.00, category: 'WEIGHT', commonUnit: 'kg' },
  'grape': { price: 4.00, category: 'WEIGHT', commonUnit: 'kg' },
  'pear': { price: 3.00, category: 'COUNT', commonUnit: 'item' },
  'peach': { price: 1.20, category: 'COUNT', commonUnit: 'item' },
  'plum': { price: 0.45, category: 'COUNT', commonUnit: 'item' },
  'pineapple': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'mango': { price: 1.80, category: 'COUNT', commonUnit: 'item' },
  'kiwi': { price: 0.50, category: 'COUNT', commonUnit: 'item' },
  'watermelon': { price: 4.00, category: 'COUNT', commonUnit: 'item' },
  'melon': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'cherry': { price: 7.00, category: 'WEIGHT', commonUnit: 'kg' },
  'avocado': { price: 1.20, category: 'COUNT', commonUnit: 'item' },
  
  // Vegetables
  'potato': { price: 0.25, category: 'COUNT', commonUnit: 'item' },
  'onion': { price: 0.30, category: 'COUNT', commonUnit: 'item' },
  'garlic': { price: 0.50, category: 'COUNT', commonUnit: 'item' },
  'carrot': { price: 0.80, category: 'WEIGHT', commonUnit: 'kg' },
  'pepper': { price: 1.00, category: 'COUNT', commonUnit: 'item' },
  'lettuce': { price: 0.90, category: 'COUNT', commonUnit: 'item' },
  'tomato': { price: 2.60, category: 'WEIGHT', commonUnit: 'kg' },
  'cucumber': { price: 0.70, category: 'COUNT', commonUnit: 'item' },
  'broccoli': { price: 1.60, category: 'COUNT', commonUnit: 'item' },
  'spinach': { price: 1.50, category: 'COUNT', commonUnit: 'item' },
  'mushroom': { price: 3.00, category: 'WEIGHT', commonUnit: 'kg' },
  'courgette': { price: 1.80, category: 'WEIGHT', commonUnit: 'kg' },
  'zucchini': { price: 1.80, category: 'WEIGHT', commonUnit: 'kg' },
  'eggplant': { price: 1.30, category: 'COUNT', commonUnit: 'item' },
  'aubergine': { price: 1.30, category: 'COUNT', commonUnit: 'item' },
  'celery': { price: 1.00, category: 'COUNT', commonUnit: 'item' },
  'corn': { price: 0.60, category: 'COUNT', commonUnit: 'item' },
  'green bean': { price: 4.00, category: 'WEIGHT', commonUnit: 'kg' },
  'asparagus': { price: 2.00, category: 'COUNT', commonUnit: 'item' },
  'cauliflower': { price: 1.30, category: 'COUNT', commonUnit: 'item' },
  'cabbage': { price: 0.90, category: 'COUNT', commonUnit: 'item' },
  'leek': { price: 2.50, category: 'WEIGHT', commonUnit: 'kg' },
  'spring onion': { price: 0.70, category: 'COUNT', commonUnit: 'item' },
  'scallion': { price: 0.70, category: 'COUNT', commonUnit: 'item' },
  
  // Meat & Seafood
  'chicken': { price: 6.00, category: 'WEIGHT', commonUnit: 'kg' },
  'chicken breast': { price: 9.00, category: 'WEIGHT', commonUnit: 'kg' },
  'chicken thigh': { price: 5.50, category: 'WEIGHT', commonUnit: 'kg' },
  'chicken wing': { price: 4.00, category: 'WEIGHT', commonUnit: 'kg' },
  'beef': { price: 9.00, category: 'WEIGHT', commonUnit: 'kg' },
  'beef mince': { price: 7.00, category: 'WEIGHT', commonUnit: 'kg' },
  'ground beef': { price: 7.00, category: 'WEIGHT', commonUnit: 'kg' },
  'steak': { price: 16.00, category: 'WEIGHT', commonUnit: 'kg' },
  'pork': { price: 7.00, category: 'WEIGHT', commonUnit: 'kg' },
  'pork chop': { price: 8.50, category: 'WEIGHT', commonUnit: 'kg' },
  'lamb': { price: 12.00, category: 'WEIGHT', commonUnit: 'kg' },
  'salmon': { price: 14.00, category: 'WEIGHT', commonUnit: 'kg' },
  'tuna': { price: 12.00, category: 'WEIGHT', commonUnit: 'kg' },
  'shrimp': { price: 15.00, category: 'WEIGHT', commonUnit: 'kg' },
  'prawn': { price: 15.00, category: 'WEIGHT', commonUnit: 'kg' },
  'cod': { price: 12.00, category: 'WEIGHT', commonUnit: 'kg' },
  'haddock': { price: 11.00, category: 'WEIGHT', commonUnit: 'kg' },
  'sausage': { price: 5.00, category: 'WEIGHT', commonUnit: 'kg' },
  'bacon': { price: 8.00, category: 'WEIGHT', commonUnit: 'kg' },
  'ham': { price: 10.00, category: 'WEIGHT', commonUnit: 'kg' },
  'turkey': { price: 7.00, category: 'WEIGHT', commonUnit: 'kg' },
  'duck': { price: 9.00, category: 'WEIGHT', commonUnit: 'kg' },
  'mince': { price: 7.00, category: 'WEIGHT', commonUnit: 'kg' },
  'ground meat': { price: 7.00, category: 'WEIGHT', commonUnit: 'kg' },
  
  // Dairy
  'milk': { price: 1.20, category: 'VOLUME', commonUnit: 'l' },
  'cheese': { price: 8.00, category: 'WEIGHT', commonUnit: 'kg' },
  'cheddar': { price: 9.00, category: 'WEIGHT', commonUnit: 'kg' },
  'mozzarella': { price: 7.50, category: 'WEIGHT', commonUnit: 'kg' },
  'parmesan': { price: 16.00, category: 'WEIGHT', commonUnit: 'kg' },
  'feta': { price: 10.00, category: 'WEIGHT', commonUnit: 'kg' },
  'butter': { price: 7.50, category: 'WEIGHT', commonUnit: 'kg' },
  'egg': { price: 0.25, category: 'COUNT', commonUnit: 'item' },
  'yogurt': { price: 1.50, category: 'COUNT', commonUnit: 'item' },
  'cream': { price: 2.00, category: 'VOLUME', commonUnit: 'l' },
  'ice cream': { price: 4.00, category: 'VOLUME', commonUnit: 'l' },
  'sour cream': { price: 2.50, category: 'VOLUME', commonUnit: 'l' },
  'cream cheese': { price: 6.00, category: 'WEIGHT', commonUnit: 'kg' },
  'cottage cheese': { price: 4.50, category: 'WEIGHT', commonUnit: 'kg' },
  
  // Pantry
  'rice': { price: 2.00, category: 'WEIGHT', commonUnit: 'kg' },
  'pasta': { price: 1.80, category: 'WEIGHT', commonUnit: 'kg' },
  'spaghetti': { price: 1.80, category: 'WEIGHT', commonUnit: 'kg' },
  'noodle': { price: 2.20, category: 'WEIGHT', commonUnit: 'kg' },
  'flour': { price: 1.00, category: 'WEIGHT', commonUnit: 'kg' },
  'sugar': { price: 1.00, category: 'WEIGHT', commonUnit: 'kg' },
  'salt': { price: 1.00, category: 'WEIGHT', commonUnit: 'kg' },
  'black pepper': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'oil': { price: 3.50, category: 'VOLUME', commonUnit: 'l' },
  'olive oil': { price: 8.00, category: 'VOLUME', commonUnit: 'l' },
  'vegetable oil': { price: 2.00, category: 'VOLUME', commonUnit: 'l' },
  'bread': { price: 1.10, category: 'COUNT', commonUnit: 'item' },
  'cereal': { price: 3.50, category: 'COUNT', commonUnit: 'item' },
  'beans': { price: 1.00, category: 'COUNT', commonUnit: 'item' },
  'tomato sauce': { price: 1.20, category: 'COUNT', commonUnit: 'item' },
  'pasta sauce': { price: 1.80, category: 'COUNT', commonUnit: 'item' },
  'ketchup': { price: 2.00, category: 'COUNT', commonUnit: 'item' },
  'mayonnaise': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'mustard': { price: 1.50, category: 'COUNT', commonUnit: 'item' },
  'jam': { price: 2.00, category: 'COUNT', commonUnit: 'item' },
  'honey': { price: 4.00, category: 'COUNT', commonUnit: 'item' },
  'peanut butter': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'chocolate': { price: 8.00, category: 'WEIGHT', commonUnit: 'kg' },
  'cookie': { price: 5.00, category: 'WEIGHT', commonUnit: 'kg' },
  'biscuit': { price: 5.00, category: 'WEIGHT', commonUnit: 'kg' },
  'cake': { price: 6.00, category: 'COUNT', commonUnit: 'item' },
  'spices': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'herb': { price: 1.50, category: 'COUNT', commonUnit: 'item' },
  'vinegar': { price: 2.50, category: 'VOLUME', commonUnit: 'l' },
  'soy sauce': { price: 3.50, category: 'VOLUME', commonUnit: 'l' },
  'broth': { price: 1.50, category: 'VOLUME', commonUnit: 'l' },
  'stock': { price: 1.50, category: 'VOLUME', commonUnit: 'l' },
  'curry': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'can': { price: 1.00, category: 'COUNT', commonUnit: 'item' },
  'canned': { price: 1.00, category: 'COUNT', commonUnit: 'item' },
  'frozen': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'juice': { price: 1.80, category: 'VOLUME', commonUnit: 'l' },
  'soda': { price: 1.50, category: 'VOLUME', commonUnit: 'l' },
  'water': { price: 0.80, category: 'VOLUME', commonUnit: 'l' },
  'coffee': { price: 5.00, category: 'COUNT', commonUnit: 'item' },
  'tea': { price: 3.00, category: 'COUNT', commonUnit: 'item' },
  'alcohol': { price: 15.00, category: 'VOLUME', commonUnit: 'l' },
  'wine': { price: 9.00, category: 'COUNT', commonUnit: 'item' },
  'beer': { price: 2.00, category: 'COUNT', commonUnit: 'item' },
  'snack': { price: 3.00, category: 'COUNT', commonUnit: 'item' },
  'chip': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'crisp': { price: 2.50, category: 'COUNT', commonUnit: 'item' },
  'nut': { price: 10.00, category: 'WEIGHT', commonUnit: 'kg' },
  'seed': { price: 8.00, category: 'WEIGHT', commonUnit: 'kg' },
  'dried fruit': { price: 8.00, category: 'WEIGHT', commonUnit: 'kg' },
};

// Improved helper function to estimate price based on ingredient
const estimatePrice = (ingredient: Ingredient): number => {
  const name = ingredient.name?.toLowerCase() || '';
  const quantity = ingredient.quantity !== null ? parseFloat(ingredient.quantity.toString()) : 1;
  const unit = ingredient.unit?.toLowerCase() || '';
  
  // Convert to standard unit for consistent calculation
  const { quantity: standardQuantity, standardUnit } = convertToStandardUnit(quantity, unit);
  
  // Check for special cases where we need custom pricing
  
  // Special case for garlic cloves - often over-priced
  if (name.includes('garlic') && name.includes('clove')) {
    // A whole garlic bulb has ~10-12 cloves and costs around £0.50
    // So each clove should cost about £0.05
    return Math.max(quantity * 0.05, 0.05);
  }
  
  // Special case for bell peppers (red, green, yellow)
  if ((name.includes('bell pepper') || name.includes('pepper')) && 
      (name.includes('red') || name.includes('green') || name.includes('yellow'))) {
    // Individual bell peppers should cost about £0.80 each
    if (standardUnit === STANDARD_UNITS.COUNT) {
      return quantity * 0.80;
    }
  }

  // Special handling for small count items that may be parts of larger items
  const smallCountItems = [
    { name: 'clove', parentItem: 'garlic', parentPrice: 0.50, itemsPerParent: 10 },
    { name: 'slice', parentItem: 'bread', parentPrice: 1.10, itemsPerParent: 20 },
    { name: 'leaf', parentItem: 'basil', parentPrice: 1.50, itemsPerParent: 20 },
    { name: 'sprig', parentItem: 'herb', parentPrice: 1.50, itemsPerParent: 15 }
  ];
  
  for (const item of smallCountItems) {
    if (name.includes(item.name) && (name.includes(item.parentItem) || 
        (item.name === 'clove' && name === 'clove'))) { // Special case for just "clove"
      const pricePerItem = item.parentPrice / item.itemsPerParent;
      return Math.max(quantity * pricePerItem, 0.05); // Minimum price of £0.05
    }
  }
  
  // Check for specific vegetables that should be priced individually
  const individualVegetables = [
    { name: 'pepper', price: 0.80 },
    { name: 'bell pepper', price: 0.80 },
    { name: 'onion', price: 0.30 },
    { name: 'garlic bulb', price: 0.50 },
    { name: 'carrot', price: 0.15 },
    { name: 'tomato', price: 0.25 },
  ];
  
  for (const veg of individualVegetables) {
    if (name.includes(veg.name) && standardUnit === STANDARD_UNITS.COUNT) {
      return Math.max(quantity * veg.price, 0.05);
    }
  }

  // For spices, herbs, and oils if the quantity is very small, use a more accurate price calculation
  const smallQuantityIngredients = [
    'oil', 'olive oil', 'vegetable oil', 'sesame oil', 'coconut oil',
    'vinegar', 'balsamic vinegar', 'apple cider vinegar',
    'honey', 'maple syrup', 'soy sauce', 'fish sauce', 'oyster sauce',
    'worcestershire sauce', 'hot sauce', 'sriracha', 'tabasco',
    'extract', 'vanilla extract', 'almond extract'
  ];
  
  // Check if this is a small quantity ingredient
  const isSmallQuantityIngredient = smallQuantityIngredients.some(item => 
    name.includes(item) || item.includes(name)
  );
  
  // For spices, herbs, and oils if the quantity is very small, use a more accurate price calculation
  if (((name.includes('spice') || name.includes('herb') || name.includes('seasoning') || 
       name.includes('salt') || name.includes('pepper') || isSmallQuantityIngredient) && 
       standardQuantity < 0.05) && 
      (standardUnit === STANDARD_UNITS.WEIGHT || standardUnit === STANDARD_UNITS.VOLUME)) {
    
    // For very small quantities, use a prorated minimum price
    // This prevents things like "1 tablespoon of olive oil" costing as much as "1 liter of olive oil"
    let basePrice = 0;
    
    // Look up the base price first
    if (averagePrices[name]) {
      basePrice = averagePrices[name].price;
    } else {
      // Try matching on parts of the name
      for (const key of Object.keys(averagePrices)) {
        if (name.includes(key) || key.includes(name)) {
          basePrice = averagePrices[key].price;
          break;
        }
      }
      // If still no match, use defaults
      if (basePrice === 0) {
        if (name.includes('oil')) basePrice = 8.00; // Default oil price
        else if (name.includes('spice') || name.includes('herb')) basePrice = 2.50; // Default spice price
        else basePrice = 1.00; // Default for unknown small quantity items
      }
    }
    
    // Calculate a reasonable price based on proportion
    // e.g., 1 tbsp (0.015L) of olive oil at £8/L = £0.12 instead of treating it as 1L
    const reasonablePrice = basePrice * standardQuantity;
    
    // Enforce a minimum price to prevent ridiculously small prices
    return Math.max(reasonablePrice, 0.10);
  }
  
  // Try to find exact match first
  if (averagePrices[name]) {
    const { price, category, commonUnit } = averagePrices[name];
    
    // If ingredient has a quantity but the price is per item (or vice versa), handle appropriately
    if (category === 'COUNT' && standardUnit !== STANDARD_UNITS.COUNT) {
      // Estimate number of items based on weight/volume, with improved logic
      let estimatedCount;
      
      // Better estimation logic based on ingredient type
      if (name.includes('onion')) {
        estimatedCount = Math.ceil(standardQuantity / 0.15); // ~150g per onion
      } else if (name.includes('potato')) {
        estimatedCount = Math.ceil(standardQuantity / 0.2); // ~200g per potato
      } else if (name.includes('garlic')) {
        estimatedCount = Math.ceil(standardQuantity / 0.05); // ~50g per garlic bulb
      } else {
        estimatedCount = Math.ceil(standardQuantity / 0.2); // Default: ~200g per item
      }
      
      return price * estimatedCount;
    }
    
    return price * standardQuantity;
  }
  
  // No exact match, so try to match parts of the name
  // First, clean the name by removing common qualifiers
  const cleanName = name.replace(/fresh|frozen|organic|free range|wild|farm|raw|cooked|whole|diced|sliced|chopped|minced|ground/g, '').trim();
  
  // Try to find partial matches using the cleaned name
  let bestMatch = '';
  let highestSimilarity = 0;
  
  for (const key of Object.keys(averagePrices)) {
    // Check if ingredient name contains the key or vice versa
    if (cleanName.includes(key) || key.includes(cleanName)) {
      // Calculate a similarity score based on length ratio
      const similarity = Math.min(key.length / cleanName.length, cleanName.length / key.length);
      
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = key;
      }
    }
  }
  
  // If found a partial match, use its price
  if (bestMatch && highestSimilarity > 0.5) {
    const { price, category, commonUnit } = averagePrices[bestMatch];
    
    // If category doesn't match the standard unit, convert appropriately
    if (category === 'COUNT' && standardUnit !== STANDARD_UNITS.COUNT) {
      // Similar to the exact match logic above
      const estimatedCount = Math.ceil(standardQuantity / 0.2);
      return price * estimatedCount;
    }
    
    return price * standardQuantity;
  }
  
  // Fallback to category-based estimation
  let defaultPrice = 5.0; // Default price per kg/L/item
  
  // Set default price based on ingredient type
  if (name.includes('meat') || name.includes('beef') || name.includes('chicken') || 
      name.includes('pork') || name.includes('fish') || name.includes('seafood')) {
    defaultPrice = 10.0; // Meat/fish is expensive
  } else if (name.includes('cheese') || name.includes('dairy')) {
    defaultPrice = 8.0; // Dairy products
  } else if (name.includes('fruit') || name.includes('vegetable') || name.includes('produce')) {
    defaultPrice = 3.0; // Produce
  } else if (name.includes('oil') || name.includes('vinegar')) {
    defaultPrice = 5.0; // Oils and vinegars
  } else if (name.includes('spice') || name.includes('herb') || name.includes('seasoning')) {
    defaultPrice = 2.0; // Spices and herbs
  }
  
  return defaultPrice * standardQuantity;
};

interface Ingredient {
  original: string;
  quantity: number | null;
  unit: string | null;
  name: string;
  category: string;
  displayText: string;
  displayQuantity?: string;
  displayUnit?: string;
  price?: number; // Estimated price
  id?: string; // Unique identifier
}

interface ShoppingListData {
  startDate: string;
  endDate: string;
  shoppingList: {
    [category: string]: Ingredient[];
  };
}

interface RemovedItem {
  ingredient: Ingredient;
  category: string;
  index: number;
  timestamp: number;
}

const ShoppingListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingListData | null>(null);
  const [originalShoppingList, setOriginalShoppingList] = useState<ShoppingListData | null>(null);
  const [removedItems, setRemovedItems] = useState<RemovedItem[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [showRemovedItems, setShowRemovedItems] = useState(false);
  
  // Reference to open swipeable
  const swipeableRef = useRef<Swipeable | null>(null);
  
  const today = new Date();
  const [startDate, setStartDate] = useState<Date>(startOfWeek(today));
  const [endDate, setEndDate] = useState<Date>(endOfWeek(today));
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<DatePreset>('current_week');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarSelectionMode, setCalendarSelectionMode] = useState<'start' | 'end'>('start');
  const [tempStartDate, setTempStartDate] = useState<Date>(startDate);
  const [tempEndDate, setTempEndDate] = useState<Date>(endDate);
  
  const navigation = useNavigation();
  
  // Reset shopping list state when navigating away and returning
  useFocusEffect(
    React.useCallback(() => {
      // When screen comes into focus
      return () => {
        // When screen goes out of focus (navigating away)
        resetList();
      };
    }, [])
  );
  
  // Function to reset the shopping list to original state
  const resetList = () => {
    if (originalShoppingList) {
      setShoppingList(JSON.parse(JSON.stringify(originalShoppingList)));
      setRemovedItems([]);
      calculateTotalCost(originalShoppingList);
    }
  };
  
  // Calculate total cost based on current shopping list
  const calculateTotalCost = (list: ShoppingListData) => {
    let cost = 0;
    Object.keys(list.shoppingList).forEach(category => {
      list.shoppingList[category].forEach(ingredient => {
        const estimatedPrice = ingredient.price || estimatePrice(ingredient);
        cost += estimatedPrice;
      });
    });
    setTotalCost(cost);
  };
  
  // Handle removing an item from the shopping list
  const handleRemoveItem = (category: string, index: number) => {
    if (!shoppingList) return;
    
    // Close any open swipeable
    if (swipeableRef.current) {
      swipeableRef.current.close();
      swipeableRef.current = null;
    }
    
    const updatedShoppingList = { ...shoppingList };
    const removedIngredient = { ...updatedShoppingList.shoppingList[category][index] };
    
    // Store the removed item for potential undo
    setRemovedItems(prev => [
      { 
        ingredient: removedIngredient, 
        category, 
        index, 
        timestamp: Date.now() 
      },
      ...prev
    ]);
    
    // Remove from current list
    updatedShoppingList.shoppingList[category] = [
      ...updatedShoppingList.shoppingList[category].slice(0, index),
      ...updatedShoppingList.shoppingList[category].slice(index + 1)
    ];
    
    setShoppingList(updatedShoppingList);
    
    // Update total cost
    const itemPrice = removedIngredient.price || estimatePrice(removedIngredient);
    setTotalCost(prev => prev - itemPrice);
    
    // Show toast message with undo option
    Toast.show({
      type: 'success',
      text1: 'Item removed',
      text2: 'Tap undo to restore it',
      position: 'bottom',
      visibilityTime: 3000,
    });
  };
  
  // Handle undoing the last item removal
  const handleUndo = () => {
    if (removedItems.length === 0 || !shoppingList) return;
    
    const lastRemoved = removedItems[0];
    const updatedRemovedItems = [...removedItems];
    updatedRemovedItems.shift();
    
    const updatedShoppingList = { ...shoppingList };
    
    // Ensure the category exists
    if (!updatedShoppingList.shoppingList[lastRemoved.category]) {
      updatedShoppingList.shoppingList[lastRemoved.category] = [];
    }
    
    // Insert the item back at its original position if possible, or at the end
    if (lastRemoved.index <= updatedShoppingList.shoppingList[lastRemoved.category].length) {
      updatedShoppingList.shoppingList[lastRemoved.category] = [
        ...updatedShoppingList.shoppingList[lastRemoved.category].slice(0, lastRemoved.index),
        lastRemoved.ingredient,
        ...updatedShoppingList.shoppingList[lastRemoved.category].slice(lastRemoved.index)
      ];
    } else {
      updatedShoppingList.shoppingList[lastRemoved.category].push(lastRemoved.ingredient);
    }
    
    setShoppingList(updatedShoppingList);
    setRemovedItems(updatedRemovedItems);
    
    // Update total cost
    const itemPrice = lastRemoved.ingredient.price || estimatePrice(lastRemoved.ingredient);
    setTotalCost(prev => prev + itemPrice);
  };
  
  // Define date presets
  const datePresets = {
    current_week: {
      startDate: startOfWeek(today),
      endDate: endOfWeek(today),
      label: 'Current Week'
    },
    next_week: {
      startDate: startOfWeek(addWeeks(today, 1)),
      endDate: endOfWeek(addWeeks(today, 1)),
      label: 'Next Week'
    },
    two_weeks: {
      startDate: startOfWeek(today),
      endDate: endOfWeek(addWeeks(today, 1)),
      label: '2 Weeks'
    },
    month: {
      startDate: startOfMonth(today),
      endDate: endOfMonth(today),
      label: 'This Month'
    },
    custom: {
      startDate,
      endDate,
      label: 'Custom Range'
    }
  };
  
  // Parse quantities and units from text descriptions
  const parseIngredientsFromText = (ingredient: Ingredient): Ingredient => {
    // If already has quantity and unit, no need to parse
    if (ingredient.quantity !== null && ingredient.unit) {
      return ingredient;
    }
    
    const original = ingredient.original || ingredient.displayText || '';
    const text = original.toLowerCase();
    
    // Regular expression to match common quantity patterns
    // Matches patterns like "2 kg", "0.5 cups", "1/2 pound", "250g", "3 large", etc.
    // Also now supports "tbsp", "tsp" and common cooking measurements
    const quantityRegex = /(\d+\/\d+|\d+\.\d+|\d+)\s*(g|kg|oz|lb|ml|l|cup|cups|tbsp|tsp|tablespoon|tablespoons|teaspoon|teaspoons|pound|pounds|ounce|ounces|pint|quart|gallon|dash|pinch)?/i;
    
    const match = text.match(quantityRegex);
    
    if (match) {
      let [, quantityStr, unit = ''] = match;
      let quantity: number;
      
      // Handle fractions like 1/2
      if (quantityStr.includes('/')) {
        const [numerator, denominator] = quantityStr.split('/');
        quantity = parseInt(numerator) / parseInt(denominator);
      } else {
        quantity = parseFloat(quantityStr);
      }
      
      // If unit is attached directly to the number (like "250g"), extract it
      if (!unit && text.match(/\d+(g|kg|oz|lb|ml|l|tbsp|tsp)/i)) {
        const unitMatch = text.match(/\d+(g|kg|oz|lb|ml|l|tbsp|tsp)/i);
        if (unitMatch && unitMatch[1]) {
          unit = unitMatch[1];
        }
      }
      
      // Check for common cooking measurement terms that might appear after the quantity
      if (!unit) {
        if (text.includes("tablespoon") || text.includes("tbsp")) unit = "tbsp";
        else if (text.includes("teaspoon") || text.includes("tsp")) unit = "tsp";
        else if (text.includes("dash")) unit = "dash";
        else if (text.includes("pinch")) unit = "pinch";
      }
      
      // Normalize the unit
      unit = normalizeUnit(unit);
      
      return {
        ...ingredient,
        quantity: quantity || ingredient.quantity || 1,
        unit: unit || ingredient.unit || '',
      };
    }
    
    // If no quantity detected but there's probably a countable item
    const countableTerms = ["small", "medium", "large", "whole", "piece", "slice", "can", "jar", "package", "pack"];
    for (const term of countableTerms) {
      if (text.includes(term)) {
        // If it contains terms like "2 large onions", extract the number
        const countMatch = text.match(/(\d+)\s+/);
        const quantity = countMatch ? parseInt(countMatch[1]) : 1;
        
        return {
          ...ingredient,
          quantity: quantity,
          unit: 'item'
        };
      }
    }
    
    // Default case - no clear quantity/unit found
    return {
      ...ingredient,
      quantity: ingredient.quantity || 1,
      unit: ingredient.unit || ''
    };
  };

  const fetchShoppingList = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await planService.getShoppingList({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      
      // Add unique IDs and price estimates to each ingredient
      const enhancedResponse = { ...response };
      
      // Keep track of total cost for logging/debugging
      let totalEstimatedCost = 0;
      
      // Define type for high price ingredients
      interface HighPriceIngredient {
        name: string;
        quantity: number | null;
        unit: string | null;
        price: number;
        standardUnit: string;
      }
      
      let highPriceIngredients: HighPriceIngredient[] = [];
      
      Object.keys(enhancedResponse.shoppingList).forEach(category => {
        enhancedResponse.shoppingList[category] = enhancedResponse.shoppingList[category].map((ingredient: Ingredient) => {
          // First parse quantities and units from text if not already provided
          const parsedIngredient = parseIngredientsFromText(ingredient);
          
          // Then estimate price based on the parsed information
          const price = estimatePrice(parsedIngredient);
          
          // Track high-price ingredients for debugging
          if (price > 10) {
            highPriceIngredients.push({
              name: parsedIngredient.name,
              quantity: parsedIngredient.quantity,
              unit: parsedIngredient.unit,
              price: price,
              standardUnit: convertToStandardUnit(parsedIngredient.quantity || 1, parsedIngredient.unit).standardUnit
            });
          }
          
          totalEstimatedCost += price;
          
          return {
            ...parsedIngredient,
            id: Math.random().toString(36).substring(2, 9), // Generate unique ID
            price,
            // Add a display string for the estimated quantity with unit for UI
            displayQuantity: parsedIngredient.quantity !== null 
              ? parsedIngredient.quantity.toString() 
              : '',
            displayUnit: parsedIngredient.unit || ''
          };
        });
      });
      
      // Log for debugging
      console.log(`Shopping list: Total estimated cost: £${totalEstimatedCost.toFixed(2)}`);
      if (highPriceIngredients.length > 0) {
        console.log('High price ingredients (>£10):', highPriceIngredients);
      }
      
      setShoppingList(enhancedResponse);
      // Keep original copy for reset functionality
      setOriginalShoppingList(JSON.parse(JSON.stringify(enhancedResponse)));
      // Reset removed items when fetching new list
      setRemovedItems([]);
      // Calculate initial total cost
      calculateTotalCost(enhancedResponse);
    } catch (error) {
      console.error('Error fetching shopping list:', error);
      setError('Failed to load shopping list. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchShoppingList();
  }, [startDate, endDate]);
  
  const applyDatePreset = (preset: DatePreset) => {
    if (preset === 'custom') {
      // Show calendar for custom range
      setSelectedPreset('custom');
      setTempStartDate(startDate);
      setTempEndDate(endDate);
      setCalendarVisible(true);
      setCalendarSelectionMode('start');
      return;
    }

    const { startDate: newStartDate, endDate: newEndDate } = datePresets[preset];
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setSelectedPreset(preset);
    setDateRangeModalVisible(false);
    // Reset list when changing date preset
    setRemovedItems([]);
  };

  const adjustDateRange = (adjustment: 'previousWeek' | 'nextWeek' | 'currentWeek') => {
    if (adjustment === 'previousWeek') {
      setStartDate(prevStart => addDays(prevStart, -7));
      setEndDate(prevEnd => addDays(prevEnd, -7));
      setSelectedPreset('custom');
    } else if (adjustment === 'nextWeek') {
      setStartDate(prevStart => addDays(prevStart, 7));
      setEndDate(prevEnd => addDays(prevEnd, 7));
      setSelectedPreset('custom');
    } else {
      // Reset to current week
      setStartDate(startOfWeek(today));
      setEndDate(endOfWeek(today));
      setSelectedPreset('current_week');
    }
  };
  
  // Handler for calendar date selection
  const handleCalendarDayPress = (day: any) => {
    const selectedDate = new Date(day.timestamp);
    
    if (calendarSelectionMode === 'start') {
      setTempStartDate(selectedDate);
      
      // If start date is after end date, also update end date
      if (differenceInDays(selectedDate, tempEndDate) > 0) {
        setTempEndDate(selectedDate);
      }
      
      setCalendarSelectionMode('end');
    } else {
      // Ensure end date isn't before start date
      if (differenceInDays(tempStartDate, selectedDate) <= 0) {
        setTempEndDate(selectedDate);
      } else {
        // If end date selected is before start date, swap them
        setTempEndDate(tempStartDate);
        setTempStartDate(selectedDate);
      }
      
      // After selecting both dates, prepare to apply
      setCalendarSelectionMode('start');
    }
  };
  
  // Apply custom date range
  const applyCustomDateRange = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setCalendarVisible(false);
    setDateRangeModalVisible(false);
  };
  
  // Cancel custom date range selection
  const cancelCustomDateRange = () => {
    setCalendarVisible(false);
    // If we were in custom mode and cancelled, revert to current week
    if (selectedPreset === 'custom') {
      setSelectedPreset('current_week');
      setStartDate(startOfWeek(today));
      setEndDate(endOfWeek(today));
    }
    setDateRangeModalVisible(false);
  };
  
  // Render swipeable ingredient item
  const renderIngredientItem = (ingredient: Ingredient, index: number, category: string) => {
    const rightSwipeActions = (progress: Animated.AnimatedInterpolation<number>) => {
      const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
        extrapolate: 'clamp'
      });
      
      return (
        <View style={styles.swipeableContainer}>
          <Animated.View style={[
            styles.rightSwipeAction,
            { transform: [{ translateX }] }
          ]}>
            <Text style={styles.swipeActionText}>Remove</Text>
          </Animated.View>
        </View>
      );
    };
    
    // Format the ingredient display text to include quantity
    const getDisplayText = (ingredient: Ingredient) => {
      // Use the displayText if it's already provided
      if (ingredient.displayText) {
        return ingredient.displayText;
      }
      
      // Format quantities nicely
      let displayQuantity = '';
      if (ingredient.quantity !== null) {
        // Format fractions nicely
        if (ingredient.quantity === 0.25) displayQuantity = '¼';
        else if (ingredient.quantity === 0.5) displayQuantity = '½';
        else if (ingredient.quantity === 0.75) displayQuantity = '¾';
        else if (ingredient.quantity === 0.33 || ingredient.quantity === 1/3) displayQuantity = '⅓';
        else if (ingredient.quantity === 0.67 || ingredient.quantity === 2/3) displayQuantity = '⅔';
        else displayQuantity = ingredient.quantity.toString();
        
        // For whole numbers, remove decimal point
        if (displayQuantity.includes('.') && displayQuantity.endsWith('.0')) {
          displayQuantity = displayQuantity.replace('.0', '');
        }
      }
      
      // Format unit nicely
      let displayUnit = ingredient.unit || '';
      
      // Use proper abbreviations or symbols for common units
      if (displayUnit === 'tbsp') displayUnit = 'Tbsp';
      else if (displayUnit === 'tsp') displayUnit = 'tsp';
      else if (displayUnit === 'g') displayUnit = 'g';
      else if (displayUnit === 'kg') displayUnit = 'kg';
      else if (displayUnit === 'ml') displayUnit = 'ml';
      else if (displayUnit === 'l') displayUnit = 'L';
      
      // Combine quantity, unit, and name
      if (displayQuantity && displayUnit) {
        return `${displayQuantity} ${displayUnit} ${ingredient.name}`;
      } else if (displayQuantity) {
        return `${displayQuantity} ${ingredient.name}`;
      }
      
      // Just use the name if no quantity/unit
      return ingredient.name;
    };
    
    return (
      <Swipeable
        ref={(ref: Swipeable | null) => {
          if (ref && ingredient.id) {
            swipeableRef.current = ref;
          }
        }}
        renderRightActions={rightSwipeActions}
        onSwipeableOpen={() => handleRemoveItem(category, index)}
      >
        <View style={styles.ingredientItem}>
          <View style={styles.ingredientTextContainer}>
            <Text style={styles.ingredientText}>
              {getDisplayText(ingredient)}
            </Text>
            
            {ingredient.displayQuantity && ingredient.displayUnit && (
              <Text style={styles.ingredientQuantity}>
                {ingredient.displayQuantity} {ingredient.displayUnit}
              </Text>
            )}
          </View>
          
          <Text style={styles.priceText}>
            £{ingredient.price?.toFixed(2) || estimatePrice(ingredient).toFixed(2)}
          </Text>
        </View>
      </Swipeable>
    );
  };

  const renderDateRangeModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={dateRangeModalVisible}
      onRequestClose={() => setDateRangeModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Date Range</Text>
            <TouchableOpacity 
              onPress={() => setDateRangeModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          {calendarVisible ? (
            <View style={styles.calendarContainer}>
              <Text style={styles.calendarTitle}>
                Select {calendarSelectionMode === 'start' ? 'Start' : 'End'} Date
              </Text>
              
              <Calendar
                onDayPress={handleCalendarDayPress}
                markingType="period"
                markedDates={{
                  [format(tempStartDate, 'yyyy-MM-dd')]: {
                    selected: true,
                    startingDay: true,
                    color: '#FF0000',
                    textColor: 'white'
                  },
                  [format(tempEndDate, 'yyyy-MM-dd')]: {
                    selected: true,
                    endingDay: true,
                    color: '#FF0000',
                    textColor: 'white'
                  }
                }}
                theme={{
                  selectedDayBackgroundColor: '#FF0000',
                  todayTextColor: '#FF0000',
                  arrowColor: '#FF0000',
                }}
              />
              
              <View style={styles.calendarDateRow}>
                <Text style={styles.calendarDateLabel}>From: {format(tempStartDate, 'MMM d, yyyy')}</Text>
                <Text style={styles.calendarDateLabel}>To: {format(tempEndDate, 'MMM d, yyyy')}</Text>
              </View>
              
              <View style={styles.calendarButtonRow}>
                <TouchableOpacity 
                  style={styles.calendarButton} 
                  onPress={cancelCustomDateRange}
                >
                  <Text style={styles.calendarButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.calendarButton, styles.calendarApplyButton]} 
                  onPress={applyCustomDateRange}
                >
                  <Text style={[styles.calendarButtonText, styles.calendarApplyButtonText]}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <ScrollView style={styles.modalScrollContent}>
              {Object.entries(datePresets).map(([key, range]) => (
                <TouchableOpacity 
                  key={key}
                  style={[
                    styles.presetOption,
                    selectedPreset === key ? styles.selectedPreset : null
                  ]} 
                  onPress={() => applyDatePreset(key as DatePreset)}
                >
                  <Text style={[
                    styles.presetText,
                    selectedPreset === key ? styles.selectedPresetText : null
                  ]}>
                    {range.label}
                  </Text>
                  {key !== 'custom' && (
                    <Text style={styles.presetDateRange}>
                      {format(range.startDate, 'MMM d')} - {format(range.endDate, 'MMM d, yyyy')}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
  
  const renderDateSelector = () => (
    <View style={styles.dateSelector}>
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => adjustDateRange('previousWeek')}
      >
        <Ionicons name="chevron-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.currentDateButton}
        onPress={() => setDateRangeModalVisible(true)}
      >
        <Text style={styles.dateRangeText}>
          {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
        </Text>
        <Ionicons name="calendar-outline" size={16} color="#333" style={styles.calendarIcon} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => adjustDateRange('nextWeek')}
      >
        <Ionicons name="chevron-forward" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const renderShoppingList = () => {
    if (!shoppingList || !shoppingList.shoppingList) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={60} color="#aaa" />
          <Text style={styles.emptyStateText}>No ingredients found for this period.</Text>
        </View>
      );
    }

    // Get categories and sort them by priority
    const categoryOrder = [
      'Produce',
      'Meat & Seafood',
      'Dairy',
      'Grains & Bakery',
      'Pantry & Spices',
      'Snacks & Others',
      'Other'
    ];
    
    const sortedCategories = Object.keys(shoppingList.shoppingList).sort(
      (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
    );
    
    if (sortedCategories.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={60} color="#aaa" />
          <Text style={styles.emptyStateText}>No ingredients found for this period.</Text>
        </View>
      );
    }

    // Check if any categories have items
    const hasAnyItems = sortedCategories.some(category => 
      shoppingList.shoppingList[category].length > 0
    );

    if (!hasAnyItems) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={60} color="#aaa" />
          <Text style={styles.emptyStateText}>
            {removedItems.length > 0 
              ? "All items have been removed. Use the undo button to restore items."
              : "No ingredients found for this period."}
          </Text>
          {removedItems.length > 0 && (
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={resetList}
            >
              <Text style={styles.resetButtonText}>Reset List</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return (
      <ScrollView style={styles.listContainer}>
        {/* Total cost display */}
        <View style={styles.costContainer}>
          <Text style={styles.costLabel}>Estimated Total:</Text>
          <Text style={styles.costAmount}>£{totalCost.toFixed(2)}</Text>
          <Text style={styles.costDisclaimer}>*Prices are approximate UK averages</Text>
        </View>
        
        {/* Undo and Reset buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, removedItems.length === 0 && styles.disabledButton]} 
            onPress={handleUndo}
            disabled={removedItems.length === 0}
          >
            <Ionicons name="arrow-undo" size={16} color={removedItems.length === 0 ? "#aaa" : "#fff"} />
            <Text style={[styles.actionButtonText, removedItems.length === 0 && styles.disabledButtonText]}>Undo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, removedItems.length === 0 && styles.disabledButton]} 
            onPress={resetList}
            disabled={removedItems.length === 0}
          >
            <Ionicons name="refresh" size={16} color={removedItems.length === 0 ? "#aaa" : "#fff"} />
            <Text style={[styles.actionButtonText, removedItems.length === 0 && styles.disabledButtonText]}>Reset</Text>
          </TouchableOpacity>
        </View>
        
        {sortedCategories.map(category => {
          // Skip categories with no items
          if (shoppingList.shoppingList[category].length === 0) return null;
          
          return (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              
              {shoppingList.shoppingList[category].map((ingredient, index) => (
                <View key={`${ingredient.id || ingredient.name}-${index}`}>
                  {renderIngredientItem(ingredient, index, category)}
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping List</Text>
        <View style={styles.rightPlaceholder} />
      </View>
      
      {renderDateSelector()}
      {renderDateRangeModal()}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF0000" />
          <Text style={styles.loadingText}>Generating your shopping list...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#FF0000" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchShoppingList}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        renderShoppingList()
      )}
      
      {/* Toast for undo functionality */}
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightPlaceholder: {
    width: 30,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dateButton: {
    padding: 5,
  },
  currentDateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  dateRangeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginRight: 5,
  },
  calendarIcon: {
    marginLeft: 4,
  },
  // Calendar styles
  calendarContainer: {
    padding: 20,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  calendarDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  calendarDateLabel: {
    fontSize: 14,
    color: '#555',
  },
  calendarButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  calendarButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  calendarApplyButton: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  calendarButtonText: {
    fontSize: 16,
    color: '#333',
  },
  calendarApplyButtonText: {
    color: 'white',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  modalScrollContent: {
    padding: 20,
  },
  presetOption: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  selectedPreset: {
    backgroundColor: '#ffeeee',
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  presetText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  selectedPresetText: {
    color: '#FF0000',
  },
  presetDateRange: {
    fontSize: 14,
    color: '#666',
  },
  // Swipeable and ingredient styles
  swipeableContainer: {
    width: 100,
    height: '100%',
  },
  rightSwipeAction: {
    flex: 1,
    backgroundColor: '#4CAF50', // Green
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeActionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  // Cost styles
  costContainer: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  costLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  costAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
    marginVertical: 5,
  },
  costDisclaimer: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 5,
  },
  // Action buttons (Undo/Reset)
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    width: '48%',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 5,
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  disabledButtonText: {
    color: '#aaa',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  // Rest of the styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
    paddingTop: 10,
  },
  categorySection: {
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  ingredientItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  ingredientText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  ingredientQuantity: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  priceText: {
    fontSize: 15,
    color: '#FF0000',
    fontWeight: '600',
    marginLeft: 10,
    minWidth: 50,
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default ShoppingListScreen; 