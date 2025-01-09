import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PlanDetailModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: () => void;
  plan: any; // We'll use the existing plan structure
  type: 'diet' | 'workout';
  isSelected: boolean;
}

const getPlanDescription = (planId: string, type: 'diet' | 'workout') => {
  const descriptions = {
    diet: {
      dp_1500: {
        description: "An aggressive caloric deficit designed for maximum fat loss while preserving muscle mass. Perfect for those looking to cut weight quickly.",
        features: [
          "High protein meal plans to preserve muscle",
          "Strategic carb timing around workouts",
          "5 meals per day for hunger control",
          "Weekly diet adjustments based on progress",
          "Supplement recommendations included"
        ]
      },
      dp_2000: {
        description: "A moderate approach to fat loss, allowing for steady progress while maintaining energy levels and performance.",
        features: [
          "Balanced macro distribution",
          "Flexible meal timing options",
          "Regular cheat meal allowances",
          "Gradual calorie adjustments",
          "Focus on sustainable habits"
        ]
      },
      dp_2500: {
        description: "Designed to maintain current weight while improving body composition and performance.",
        features: [
          "Optimal nutrient timing",
          "Performance-focused nutrition",
          "Body recomposition approach",
          "Flexible food choices",
          "Maintenance calorie education"
        ]
      },
      dp_3000: {
        description: "A structured approach to gaining lean muscle mass while minimizing fat gain.",
        features: [
          "Progressive calorie increases",
          "High-quality protein sources",
          "Strategic carb loading",
          "Recovery-focused nutrition",
          "Muscle gain monitoring"
        ]
      },
      dp_3500: {
        description: "Maximum muscle gain focus with emphasis on strength and size increases.",
        features: [
          "Aggressive calorie surplus",
          "Multiple protein feedings",
          "Mass-gaining supplement guide",
          "High-volume eating strategies",
          "Rapid recovery nutrition"
        ]
      }
    },
    workout: {
      wp_1day: {
        description: "Perfect for beginners or those with limited time. Focus on fundamental movements and athletic development.",
        features: [
          "Full-body workout each session",
          "Basic movement mastery",
          "Progressive overload system",
          "Mobility work included",
          "45-60 minute sessions"
        ]
      },
      wp_2day: {
        description: "Split training focusing on power development and strength gains.",
        features: [
          "Upper/Lower body split",
          "Compound lift focus",
          "Power development protocols",
          "Recovery optimization",
          "60-75 minute sessions"
        ]
      },
      wp_3day: {
        description: "Comprehensive program balancing strength, power, and conditioning.",
        features: [
          "Push/Pull/Legs split",
          "Athletic performance focus",
          "Periodized progression",
          "Conditioning integration",
          "60-90 minute sessions"
        ]
      },
      wp_4day_gym: {
        description: "Advanced training split for maximal strength and muscle gains in a gym setting.",
        features: [
          "Upper/Lower/Push/Pull split",
          "Complex programming",
          "Strength progression system",
          "Recovery protocols",
          "75-90 minute sessions"
        ]
      },
      wp_4day_bw: {
        description: "Advanced calisthenics program focusing on bodyweight mastery and functional strength.",
        features: [
          "Skill progression focus",
          "Bodyweight strength development",
          "Mobility enhancement",
          "No equipment needed",
          "60-75 minute sessions"
        ]
      }
    }
  };

  return descriptions[type][planId];
};

const PlanDetailModal = ({ visible, onClose, onSelect, plan, type, isSelected }: PlanDetailModalProps) => {
  const planDetails = getPlanDescription(plan.id, type);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FF0000" />
          </TouchableOpacity>

          <ScrollView style={styles.scrollContent}>
            <Text style={styles.title}>{plan.name}</Text>
            
            {type === 'diet' && (
              <Text style={styles.calories}>Target: {plan.calories} calories/day</Text>
            )}
            {type === 'workout' && (
              <Text style={styles.frequency}>Frequency: {plan.frequency.replace('day', ' Day/Week')}</Text>
            )}

            <Text style={styles.description}>{planDetails.description}</Text>

            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Key Features:</Text>
              {planDetails.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#FF0000" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={[styles.selectButton, isSelected && styles.selectedButton]} 
            onPress={onSelect}
          >
            <Text style={styles.selectButtonText}>
              {isSelected ? 'Deselect Plan' : 'Select Plan'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  scrollContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  calories: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  frequency: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 20,
  },
  featuresContainer: {
    marginTop: 10,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  selectButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  selectedButton: {
    backgroundColor: '#666',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlanDetailModal;