import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  planType: 'workout_only' | 'diet_only' | 'bundle';
  amount: number;
  isUpgrade?: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  onClose,
  onSuccess,
  planType,
  amount,
  isUpgrade = false
}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      initializePayment();
    }
  }, [visible]);

  const initializePayment = async () => {
    try {
      setLoading(true);

      console.log('Starting payment initialization...');
      console.log('Plan Type:', planType);
      console.log('Amount:', amount);
      console.log('Is Upgrade:', isUpgrade);

      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('https://toasted.onrender.com/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          planType: isUpgrade ? 'bundle' : planType,
          amount: Math.round(amount * 100), // Convert to cents
          isUpgrade
        }),
      });

      console.log('Backend Response Status:', response.status);
      const data = await response.json();
      console.log('Backend Response Data:', data);

      if (!data.clientSecret) {
        throw new Error('No client secret received from the backend');
      }

      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: 'Toasted Fitness',
        returnURL: 'toastedfitness://stripe-redirect',
        defaultBillingDetails: {
          name: 'Default Name'
        }
      });

      if (initError) {
        console.error('Payment sheet init error:', initError);
        Alert.alert('Error', initError.message);
        onClose();
        return;
      }

      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        console.error('Payment sheet present error:', presentError);
        Alert.alert('Error', presentError.message);
        onClose();
        return;
      }

      Alert.alert('Success', 'Payment completed successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Payment processing error:', error);
      Alert.alert('Error', error.message || 'Something went wrong processing your payment. Please try again.');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return null;
};

export default PaymentModal;