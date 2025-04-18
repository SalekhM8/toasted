import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HealthCondition {
  id: string;
  name: string;
  description: string;
  category: 'disease' | 'deficiency' | 'restriction';
}

interface HealthConditionsScreenProps {
  selectedConditions: string[];
  onConditionsChange: (conditions: string[]) => void;
}

const HealthConditionsScreen: React.FC<HealthConditionsScreenProps> = ({
  selectedConditions,
  onConditionsChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Comprehensive list of health conditions organized by category
  const healthConditions: HealthCondition[] = [
    // Diseases
    { 
      id: 'diabetes',
      name: 'Diabetes',
      description: 'Requires careful monitoring of carbohydrate intake and blood sugar levels',
      category: 'disease'
    },
    { 
      id: 'hypertension',
      name: 'Hypertension',
      description: 'Requires reduced sodium intake',
      category: 'disease'
    },
    { 
      id: 'heart_disease',
      name: 'Heart Disease',
      description: 'Requires heart-healthy diet low in saturated fats',
      category: 'disease'
    },
    { 
      id: 'arthritis',
      name: 'Arthritis',
      description: 'May benefit from anti-inflammatory foods',
      category: 'disease'
    },
    { 
      id: 'ibs',
      name: 'Irritable Bowel Syndrome',
      description: 'May require specific dietary restrictions (FODMAP, etc.)',
      category: 'disease'
    },
    { 
      id: 'gerd',
      name: 'GERD',
      description: 'Requires avoiding acidic and spicy foods',
      category: 'disease'
    },
    
    // Nutrient Deficiencies
    { 
      id: 'iron_deficiency',
      name: 'Iron Deficiency',
      description: 'Requires foods rich in iron and possibly vitamin C to improve absorption',
      category: 'deficiency'
    },
    { 
      id: 'vitamin_d_deficiency',
      name: 'Vitamin D Deficiency',
      description: 'Requires vitamin D-rich foods or supplementation',
      category: 'deficiency'
    },
    { 
      id: 'b12_deficiency',
      name: 'Vitamin B12 Deficiency',
      description: 'Common in vegans, requires B12-rich foods or supplementation',
      category: 'deficiency'
    },
    { 
      id: 'calcium_deficiency',
      name: 'Calcium Deficiency',
      description: 'Requires calcium-rich foods for bone health',
      category: 'deficiency'
    },
    { 
      id: 'zinc_deficiency',
      name: 'Zinc Deficiency',
      description: 'Requires zinc-rich foods for immune function',
      category: 'deficiency'
    },
    
    // Metabolic/Blood Conditions
    { 
      id: 'high_cholesterol',
      name: 'High Cholesterol',
      description: 'Requires diet low in saturated fats and high in fiber',
      category: 'disease'
    },
    { 
      id: 'high_triglycerides',
      name: 'High Triglycerides',
      description: 'Requires limited sugar and refined carbohydrates',
      category: 'disease'
    },
    
    // Food Restrictions/Allergies
    { 
      id: 'gluten_intolerance',
      name: 'Gluten Intolerance/Celiac',
      description: 'Requires strict avoidance of gluten-containing foods',
      category: 'restriction'
    },
    { 
      id: 'lactose_intolerance',
      name: 'Lactose Intolerance',
      description: 'Requires limited or no dairy products',
      category: 'restriction'
    },
    { 
      id: 'nut_allergy',
      name: 'Nut Allergy',
      description: 'Requires complete avoidance of nuts',
      category: 'restriction'
    },
    { 
      id: 'shellfish_allergy',
      name: 'Shellfish Allergy',
      description: 'Requires complete avoidance of shellfish',
      category: 'restriction'
    }
  ];
  
  // Filter conditions based on search term
  const filteredConditions = searchTerm.length > 0
    ? healthConditions.filter(condition => 
        condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        condition.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : healthConditions;
  
  // Group conditions by category for display
  const diseaseConditions = filteredConditions.filter(c => c.category === 'disease');
  const deficiencyConditions = filteredConditions.filter(c => c.category === 'deficiency');
  const restrictionConditions = filteredConditions.filter(c => c.category === 'restriction');
  
  const toggleCondition = (conditionId: string) => {
    if (selectedConditions.includes(conditionId)) {
      onConditionsChange(selectedConditions.filter(id => id !== conditionId));
    } else {
      onConditionsChange([...selectedConditions, conditionId]);
    }
  };
  
  // Render a category of health conditions
  const renderCategory = (title: string, conditions: HealthCondition[]) => {
    if (conditions.length === 0) return null;
    
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{title}</Text>
        {conditions.map(condition => (
          <TouchableOpacity
            key={condition.id}
            style={[
              styles.conditionItem,
              selectedConditions.includes(condition.id) && styles.selectedCondition
            ]}
            onPress={() => toggleCondition(condition.id)}
          >
            <View style={styles.conditionContent}>
              <Text style={styles.conditionName}>{condition.name}</Text>
              <Text style={styles.conditionDescription}>{condition.description}</Text>
            </View>
            <View style={styles.checkboxContainer}>
              {selectedConditions.includes(condition.id) ? (
                <Ionicons name="checkmark-circle" size={24} color="#FF0000" />
              ) : (
                <View style={styles.emptyCheckbox} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Conditions & Nutritional Needs</Text>
      <Text style={styles.subtitle}>
        Select any conditions or deficiencies that apply to you. This helps us create a meal plan that supports your specific health needs.
      </Text>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search health conditions..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#999"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={() => setSearchTerm('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.conditionsContainer}>
        {renderCategory('Medical Conditions', diseaseConditions)}
        {renderCategory('Nutritional Deficiencies', deficiencyConditions)}
        {renderCategory('Food Allergies & Restrictions', restrictionConditions)}
        
        {filteredConditions.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No conditions found for "{searchTerm}"</Text>
          </View>
        )}
      </View>
      
      {selectedConditions.length > 0 && (
        <View style={styles.selectedCount}>
          <Text style={styles.selectedCountText}>
            {selectedConditions.length} condition{selectedConditions.length !== 1 ? 's' : ''} selected
          </Text>
        </View>
      )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#000000',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  conditionsContainer: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000000',
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedCondition: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FFCCCC',
  },
  conditionContent: {
    flex: 1,
  },
  conditionName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    color: '#000000',
  },
  conditionDescription: {
    fontSize: 14,
    color: '#666666',
  },
  checkboxContainer: {
    marginLeft: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  selectedCount: {
    marginTop: 10,
    backgroundColor: '#FF0000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  selectedCountText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  }
});

export default HealthConditionsScreen; 