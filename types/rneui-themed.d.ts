declare module '@rneui/themed' {
  import * as React from 'react';
  import { ViewStyle, TextStyle, StyleProp } from 'react-native';

  export interface CheckBoxProps {
    title?: string;
    checked?: boolean;
    onPress?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    checkedColor?: string;
  }

  export class CheckBox extends React.Component<CheckBoxProps> {}

  export interface ButtonProps {
    title?: string;
    onPress?: () => void;
    buttonStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
  }

  export class Button extends React.Component<ButtonProps> {}

  export interface SliderProps {
    value?: number;
    onValueChange?: (value: number) => void;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
    thumbStyle?: StyleProp<ViewStyle>;
    thumbTintColor?: string;
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
  }

  export class Slider extends React.Component<SliderProps> {}

  export interface InputProps {
    label?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: string;
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
  }

  export class Input extends React.Component<InputProps> {}

  export interface DividerProps {
    style?: StyleProp<ViewStyle>;
  }

  export class Divider extends React.Component<DividerProps> {}

  export interface IconProps {
    name: string;
    type?: string;
    size?: number;
    color?: string;
  }

  export class Icon extends React.Component<IconProps> {}

  export interface SearchBarProps {
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    round?: boolean;
    lightTheme?: boolean;
  }

  export class SearchBar extends React.Component<SearchBarProps> {}
} 