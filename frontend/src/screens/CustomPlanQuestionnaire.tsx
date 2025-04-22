import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation.types';
import { useAuth } from '../hooks/useAuth';
import { planService } from '../services/planService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Question types
interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: string[];
}

// Import the CustomPlanParams interface from the planService
interface CustomPlanParams {
  fitnessLevel: string;
  fitnessGoal: string;
  workoutFrequency: number;
  workoutDuration?: number;
  availableEquipment?: string[];
  focusAreas?: string[];
  healthIssues?: string[];
  timeAvailability?: string;
}

const CustomPlanQuestionnaire = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  // Simplified questionnaire with only essential questions
  const questions: Question[] = [
    {
      id: 'fitnessLevel',
      text: 'What is your current fitness level?',
      type: 'single',
      options: ['Beginner', 'Intermediate', 'Advanced']
    },
    {
      id: 'fitnessGoal',
      text: 'What is your primary fitness goal?',
      type: 'single',
      options: ['Weight Loss', 'Muscle Gain', 'General Fitness']
    },
    {
      id: 'workoutFrequency',
      text: 'How many days per week can you work out?',
      type: 'single',
      options: ['1-2 days', '3-4 days', '5+ days']
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // Handle single choice selection
  const handleSingleSelection = (option: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  // Handle multiple choice selection
  const handleMultipleSelection = (option: string) => {
    const currentSelections = answers[currentQuestion.id] || [];
    
    // Toggle selection
    if (currentSelections.includes(option)) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: currentSelections.filter((item: string) => item !== option)
      });
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.id]: [...currentSelections, option]
      });
    }
  };

  // Navigate to next question
  const handleNext = () => {
    // Validate answer exists for current question
    if (!answers[currentQuestion.id] || 
        (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)) {
      Alert.alert('Please Answer', 'Please select an option before continuing.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question, process answers
      handleSubmitQuestionnaire();
    }
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Process and transform the answers to fit the API
  const processAnswers = (): CustomPlanParams => {
    // Default values for all required fields
    const processedAnswers: CustomPlanParams = {
      fitnessLevel: 'beginner',
      fitnessGoal: 'general_fitness',
      workoutFrequency: 3, 
      workoutDuration: 30,
      availableEquipment: ['bodyweight'],
      focusAreas: ['fullBody']
    };
    
    try {
      // Map answers to backend expected format
      if (answers.fitnessLevel) {
        processedAnswers.fitnessLevel = answers.fitnessLevel.toLowerCase();
      }
      
      if (answers.fitnessGoal) {
        // Convert spaces to underscores and lowercase
        processedAnswers.fitnessGoal = answers.fitnessGoal.toLowerCase().replace(/ /g, '_');
      }
      
      if (answers.workoutFrequency) {
        // Extract number from string like "3-4 days"
        const frequencyParts = answers.workoutFrequency.split('-');
        let frequency = 3; // Default
        
        if (frequencyParts.length > 0) {
          // Try to parse a number from the first part
          const match = frequencyParts[0].match(/\d+/);
          if (match) {
            frequency = parseInt(match[0], 10);
          }
          
          // For "5+ days", use 5
          if (frequencyParts[0].includes('+')) {
            frequency = 5;
          }
        }
        
        processedAnswers.workoutFrequency = frequency;
      }
    } catch (error) {
      console.error('Error processing answers:', error);
      // Fall back to defaults if there's an error
    }
    
    console.log('Processed answers:', processedAnswers);
    return processedAnswers;
  };

  // Submit questionnaire answers
  const handleSubmitQuestionnaire = async () => {
    try {
      setLoading(true);
      
      // Process answers
      const processedAnswers = processAnswers();
      
      console.log('Submitting custom plan request with params:', processedAnswers);
      
      // Call API to generate custom plan
      await planService.generateCustomPlan(processedAnswers);
      
      // Navigate back to plan selection screen with custom plan selected
      navigation.navigate('PlanSelection', { customPlanCreated: true });
      
    } catch (error) {
      console.error('Error generating custom plan:', error);
      Alert.alert(
        'Error', 
        'There was a problem creating your custom plan. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          
          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.type === 'single' ? (
              // Single select options
              currentQuestion.options.map((option, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.optionButton,
                    answers[currentQuestion.id] === option && styles.selectedOptionButton
                  ]}
                  onPress={() => handleSingleSelection(option)}
                >
                  <Text 
                    style={[
                      styles.optionText,
                      answers[currentQuestion.id] === option && styles.selectedOptionText
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              // Multiple select options
              currentQuestion.options.map((option, index) => {
                const isSelected = (answers[currentQuestion.id] || []).includes(option);
                return (
                  <TouchableOpacity 
                    key={index}
                    style={[
                      styles.optionButton,
                      isSelected && styles.selectedOptionButton
                    ]}
                    onPress={() => handleMultipleSelection(option)}
                  >
                    <View style={styles.checkboxRow}>
                      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                        {isSelected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                      </View>
                      <Text 
                        style={[
                          styles.optionText,
                          isSelected && styles.selectedOptionText
                        ]}
                      >
                        {option}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>

        {/* Navigation buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[styles.navButton, styles.prevButton, currentQuestionIndex === 0 && styles.disabledButton]}
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={[styles.navButtonText, styles.nextButtonText]}>
                {currentQuestionIndex === questions.length - 1 ? 'Create Plan' : 'Next'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF0000',
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedOptionButton: {
    backgroundColor: '#FFE5E5',
    borderColor: '#FF0000',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingVertical: 20,
  },
  navButton: {
    padding: 15,
    borderRadius: 50,
    minWidth: 120,
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: '#F0F0F0',
  },
  nextButton: {
    backgroundColor: '#FF0000',
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  nextButtonText: {
    color: '#FFFFFF',
  }
});

export default CustomPlanQuestionnaire; 