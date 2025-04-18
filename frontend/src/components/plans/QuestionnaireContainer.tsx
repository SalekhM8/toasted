import React, { useState, ReactNode } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QuestionnaireContainerProps {
  steps: string[];
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isLastStep: boolean;
  canAdvance: boolean;
  children: ReactNode;
}

const QuestionnaireContainer: React.FC<QuestionnaireContainerProps> = ({
  steps,
  currentStep,
  onNext,
  onPrevious,
  onComplete,
  isLastStep,
  canAdvance,
  children
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onPrevious}
          disabled={currentStep === 0}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={currentStep === 0 ? "#dddddd" : "#000000"} 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personalize Your Plan</Text>
      </View>
      
      <View style={styles.progressContainer}>
        {steps.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.progressStep,
              index <= currentStep ? styles.activeStep : styles.inactiveStep
            ]}
          />
        ))}
      </View>
      
      <ScrollView style={styles.content}>
        {children}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, canAdvance ? styles.activeButton : styles.disabledButton]}
          onPress={isLastStep ? onComplete : onNext}
          disabled={!canAdvance}
        >
          <Text style={styles.buttonText}>
            {isLastStep ? 'Generate My Plan' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  progressStep: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeStep: {
    backgroundColor: '#FF0000',
  },
  inactiveStep: {
    backgroundColor: '#DDDDDD',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FF0000',
  },
  disabledButton: {
    backgroundColor: '#DDDDDD',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default QuestionnaireContainer; 