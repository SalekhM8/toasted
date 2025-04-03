import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Unit } from '../../types/food.types';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  availableUnits?: Unit[];
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
  unit,
  setUnit,
  availableUnits = ['g', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'piece', 'serving'],
  min = 1,
  max = 500
}) => {
  // Track the displayed quantity in the component's local state
  const [displayValue, setDisplayValue] = useState<string>(quantity.toString());
  
  // Add local quantity state that tracks slider position
  const [localQuantity, setLocalQuantity] = useState<number>(quantity);
  
  // Track if slider is actively being dragged
  const isDraggingRef = useRef(false);
  
  // Track last update to prevent unnecessary syncs
  const lastUpdateRef = useRef<number>(Date.now());
  
  // Format quantity based on unit type
  const formatQuantity = (value: number): number => {
    // Round to appropriate precision based on unit
    switch (unit) {
      case 'g':
      case 'ml':
      case 'piece':
      case 'serving':
        return Math.round(value);
      case 'oz':
      case 'cup':
      case 'tbsp':
      case 'tsp':
        // Round to 1 decimal place for these units
        return Math.round(value * 10) / 10;
      default:
        return Math.round(value);
    }
  };
  
  // Sync local state when parent quantity changes from external sources
  useEffect(() => {
    // Don't sync if currently dragging
    if (isDraggingRef.current) {
      console.log('Ignoring external update during drag');
      return;
    }
    
    // Only sync if there's a real difference (accounting for rounding)
    const formattedLocalQty = formatQuantity(localQuantity);
    const formattedPropQty = formatQuantity(quantity);
    
    if (formattedPropQty !== formattedLocalQty) {
      console.log(`QuantitySelector - External prop change: ${quantity} (local was ${localQuantity})`);
      
      // Update local values to match prop
      setLocalQuantity(quantity);
      setDisplayValue(quantity.toString());
      
      // Update timestamp
      lastUpdateRef.current = Date.now();
    }
  }, [quantity]);
  
  // Calculate appropriate step value based on unit
  const getStepValue = () => {
    switch (unit) {
      case 'g':
      case 'ml':
        return 5;
      case 'oz':
        return 0.1;
      case 'cup':
        return 0.1;
      case 'tbsp':
      case 'tsp':
        return 0.5;
      default:
        return 1;
    }
  };
  
  // Handle slider start - mark as dragging
  const handleSliderStart = () => {
    isDraggingRef.current = true;
    console.log('Slider drag started');
  };
  
  // Handle slider value changes - update local state only
  const handleSliderValueChange = (value: number) => {
    const formattedValue = formatQuantity(value);
    setLocalQuantity(formattedValue);
    setDisplayValue(formattedValue.toString());
  };
  
  // Only notify parent when sliding is complete
  const handleSliderComplete = (value: number) => {
    // Format value according to unit
    const formattedValue = formatQuantity(value);
    console.log(`Slider complete - final value: ${formattedValue}`);
    
    // Only update if value is different from current parent value
    if (formattedValue !== formatQuantity(quantity)) {
      // Update parent state with formatted value
      setQuantity(formattedValue);
    }
    
    // End dragging state 
    isDraggingRef.current = false;
    
    // Update timestamp
    lastUpdateRef.current = Date.now();
  };
  
  // Handle direct text input
  const handleTextInput = (text: string) => {
    // Always update the displayed text
    setDisplayValue(text);
    
    // Try to parse immediately to give instant feedback
    const numericValue = text.replace(/[^0-9.]/g, ''); // Remove non-numeric chars
    
    // Only attempt to parse and update if we have a potentially valid number
    if (numericValue !== text) {
      // User entered an invalid character, restore just the numeric part
      setDisplayValue(numericValue);
    }
  };
  
  // Handle when user completes text input (blur event)
  const handleTextInputComplete = () => {
    // First, clean the input (remove any non-numeric characters except decimal)
    const cleanedValue = displayValue.replace(/[^0-9.]/g, '');
    let parsedValue = parseFloat(cleanedValue);
    
    // If the value is invalid, reset to the local quantity
    if (isNaN(parsedValue)) {
      console.log('Invalid quantity entered, resetting to', localQuantity);
      setDisplayValue(localQuantity.toString());
      return;
    }
    
    // Apply min/max constraints
    if (parsedValue < min) {
      console.log(`Value ${parsedValue} below minimum ${min}, capping`);
      parsedValue = min;
    } else if (parsedValue > max) {
      console.log(`Value ${parsedValue} above maximum ${max}, capping`);
      parsedValue = max;
    }
    
    // Format the value according to unit type
    const formattedValue = formatQuantity(parsedValue);
    
    // Update display to show properly formatted value
    setDisplayValue(formattedValue.toString());
    
    // Update local state if different
    if (formattedValue !== localQuantity) {
      setLocalQuantity(formattedValue);
      
      // Only update parent if the value actually changed
      if (formattedValue !== formatQuantity(quantity)) {
        setQuantity(formattedValue);
      }
    }
  };
  
  // Custom validation for the input (check on every key press)
  const validateNumberInput = (text: string) => {
    // Don't allow more than one decimal point
    if ((text.match(/\./g) || []).length > 1) {
      return false;
    }
    
    // Don't allow leading zeros unless they're followed by a decimal point
    if (text.length > 1 && text[0] === '0' && text[1] !== '.') {
      return false;
    }
    
    // Check if text is a valid number or partial number (allows decimal point)
    return /^(\d*\.?\d*)$/.test(text);
  };
  
  return (
    <View style={styles.container}>
      {/* Slider for quantity adjustment */}
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Quantity</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            minimumValue={min}
            maximumValue={max}
            step={getStepValue()}
            value={localQuantity} // Use local state for position
            onSlidingStart={handleSliderStart}
            onValueChange={handleSliderValueChange}
            onSlidingComplete={handleSliderComplete}
            minimumTrackTintColor="#FF0000"
            maximumTrackTintColor="#DDDDDD"
            thumbTintColor="#FF0000"
          />
          <View style={styles.quantityContainer}>
            <TextInput
              style={styles.quantityInput}
              value={displayValue}
              onChangeText={handleTextInput}
              onBlur={handleTextInputComplete}
              keyboardType="numeric"
              selectTextOnFocus={true}
              maxLength={8} // Prevent extremely long inputs
            />
          </View>
        </View>
      </View>
      
      {/* Unit selector */}
      <View style={styles.unitContainer}>
        <Text style={styles.label}>Unit</Text>
        <View style={styles.unitButtons}>
          {availableUnits.map((unitOption) => (
            <TouchableOpacity
              key={unitOption}
              style={[
                styles.unitButton,
                unit === unitOption && styles.selectedUnitButton
              ]}
              onPress={() => setUnit(unitOption)}
            >
              <Text
                style={[
                  styles.unitButtonText,
                  unit === unitOption && styles.selectedUnitButtonText
                ]}
              >
                {unitOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50, // Fixed height for stability
  },
  slider: {
    flex: 1,
    height: 40,
  },
  quantityContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 16,
    minWidth: 70, // Increased width to prevent layout shifts
    alignItems: 'center', // Center text
  },
  quantityInput: {
    fontSize: 16,
    textAlign: 'center',
    minWidth: 50, // Ensure consistent width
    color: '#333',
  },
  unitContainer: {
    marginBottom: 10,
  },
  unitButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  unitButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedUnitButton: {
    backgroundColor: '#FF0000',
  },
  unitButtonText: {
    fontSize: 14,
    color: '#555',
  },
  selectedUnitButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default QuantitySelector; 