import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface MealActionModalProps {
  visible: boolean;
  onClose: () => void;
  onModify?: () => void;
  onSwap: () => void;
  onEditIngredients: () => void;
  mealName: string;
}

const MealActionModal = ({ visible, onClose, onSwap, onEditIngredients, mealName }: MealActionModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            What would you like to do with this meal?
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={onEditIngredients}
          >
            <Text style={styles.buttonText}>Modify</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={onSwap}
          >
            <Text style={styles.buttonText}>Swap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 25,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#FF0000',
    borderRadius: 30,
    width: '80%',
    padding: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  }
});

export default MealActionModal; 