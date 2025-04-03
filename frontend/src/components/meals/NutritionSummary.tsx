import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NutritionValue {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface NutritionSummaryProps {
  current: NutritionValue;
  original: NutritionValue;
  differences: NutritionValue;
}

const NutritionSummary: React.FC<NutritionSummaryProps> = ({
  current,
  original,
  differences
}) => {
  // Helper function to determine text color based on difference
  const getDifferenceColor = (value: number) => {
    if (value > 0) return '#2E7D32'; // Green for increase
    if (value < 0) return '#C62828'; // Red for decrease
    return '#757575'; // Gray for no change
  };

  // Helper function to format differences with +/- sign
  const formatDifference = (value: number) => {
    if (value > 0) return `+${value}`;
    return value.toString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Info</Text>
      
      {/* Headers */}
      <View style={styles.row}>
        <Text style={[styles.headerText, styles.nameCell]}>Nutrient</Text>
        <Text style={[styles.headerText, styles.valueCell]}>Original</Text>
        <Text style={[styles.headerText, styles.valueCell]}>Current</Text>
        <Text style={[styles.headerText, styles.valueCell]}>Diff</Text>
      </View>
      
      {/* Calories Row */}
      <View style={styles.row}>
        <Text style={[styles.cellText, styles.nameCell]}>Calories</Text>
        <Text style={[styles.cellText, styles.valueCell]}>{original.calories}</Text>
        <Text style={[styles.cellText, styles.valueCell]}>{current.calories}</Text>
        <Text 
          style={[
            styles.cellText, 
            styles.valueCell, 
            { color: getDifferenceColor(differences.calories) }
          ]}
        >
          {formatDifference(differences.calories)}
        </Text>
      </View>
      
      {/* Protein Row */}
      <View style={styles.row}>
        <Text style={[styles.cellText, styles.nameCell]}>Protein</Text>
        <Text style={[styles.cellText, styles.valueCell]}>{original.protein}g</Text>
        <Text style={[styles.cellText, styles.valueCell]}>{current.protein}g</Text>
        <Text 
          style={[
            styles.cellText, 
            styles.valueCell, 
            { color: getDifferenceColor(differences.protein) }
          ]}
        >
          {formatDifference(differences.protein)}g
        </Text>
      </View>
      
      {/* Carbs Row */}
      <View style={styles.row}>
        <Text style={[styles.cellText, styles.nameCell]}>Carbs</Text>
        <Text style={[styles.cellText, styles.valueCell]}>{original.carbs}g</Text>
        <Text style={[styles.cellText, styles.valueCell]}>{current.carbs}g</Text>
        <Text 
          style={[
            styles.cellText, 
            styles.valueCell, 
            { color: getDifferenceColor(differences.carbs) }
          ]}
        >
          {formatDifference(differences.carbs)}g
        </Text>
      </View>
      
      {/* Fats Row */}
      <View style={styles.row}>
        <Text style={[styles.cellText, styles.nameCell]}>Fats</Text>
        <Text style={[styles.cellText, styles.valueCell]}>{original.fats}g</Text>
        <Text style={[styles.cellText, styles.valueCell]}>{current.fats}g</Text>
        <Text 
          style={[
            styles.cellText, 
            styles.valueCell, 
            { color: getDifferenceColor(differences.fats) }
          ]}
        >
          {formatDifference(differences.fats)}g
        </Text>
      </View>
      
      {/* Summary Row */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          {differences.calories > 0 
            ? `This meal now has ${Math.abs(differences.calories)} more calories.` 
            : differences.calories < 0 
              ? `This meal now has ${Math.abs(differences.calories)} fewer calories.`
              : 'Total calories remain unchanged.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 8,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#555',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
  },
  nameCell: {
    flex: 1.5,
  },
  valueCell: {
    flex: 1,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 12,
    paddingTop: 8,
  },
  summaryText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
  },
});

export default NutritionSummary; 