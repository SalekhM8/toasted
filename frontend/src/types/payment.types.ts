export interface Plan {
    id: string;
    title: string;
    price: string;
    features: string[];
    color?: string;
    borderColor?: string;
    recommended?: boolean;
  }
  
  export type PlanType = 'workout_only' | 'diet_only' | 'bundle';
  
  export interface PaymentModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    planType: PlanType;
    amount: number;
  }
