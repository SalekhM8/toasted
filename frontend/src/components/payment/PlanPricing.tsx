import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PlanPricingProps {
  onPlanSelect: (plan: any) => void;
}

const PlanPricing: React.FC<PlanPricingProps> = ({ onPlanSelect }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'workout_only',
      title: 'Training Plan',
      price: '£2.49',
      features: [
        'Customized workout schedules',
        'Exercise form guides',
        'Progress tracking',
        'Workout reminders'
      ],
      color: '#FFE8E8',
      borderColor: '#FFCDD2'
    },
    {
      id: 'diet_only',
      title: 'Diet Plan',
      price: '£2.99',
      features: [
        'Personalized meal plans',
        'Nutritional guidance',
        'Meal tracking',
        'Shopping lists'
      ],
      color: '#E8F5E9',
      borderColor: '#C8E6C9'
    },
    {
      id: 'bundle',
      title: 'Complete Bundle',
      price: '£4.99',
      features: [
        'All Training Plan features',
        'All Diet Plan features',
        'Advanced analytics',
        'Priority support'
      ],
      color: '#E3F2FD',
      borderColor: '#BBDEFB',
      recommended: true
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    onPlanSelect(plan);
  };

  return (
    <View style={styles.container}>
      {plans.map((plan) => (
        <TouchableOpacity
          key={plan.id}
          style={[
            styles.planCard,
            { backgroundColor: plan.color, borderColor: plan.borderColor },
            selectedPlan?.id === plan.id && styles.selectedCard
          ]}
          onPress={() => handlePlanSelect(plan)}
        >
          {plan.recommended && (
            <View style={styles.bestValueTag}>
              <Text style={styles.bestValueText}>Best Value</Text>
            </View>
          )}

          <Text style={styles.planTitle}>{plan.title}</Text>
          <Text style={styles.planPrice}>{plan.price}/month</Text>

          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={styles.bullet} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  planCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  selectedCard: {
    borderColor: '#FF0000',
    borderWidth: 2,
  },
  bestValueTag: {
    position: 'absolute',
    right: 16,
    top: -10,
    backgroundColor: '#FF0000',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bestValueText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF0000',
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default PlanPricing;