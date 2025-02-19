import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  Home: undefined;
  Schedule: undefined;
  Tracker: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Register: undefined;
  PlanSelection: undefined;
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
};