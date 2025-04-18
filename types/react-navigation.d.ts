declare module '@react-navigation/native' {
  import * as React from 'react';

  export function useNavigation<T = any>(): T;
}

declare module '@react-navigation/native-stack' {
  import * as React from 'react';
  
  export type NativeStackNavigationProp<T extends Record<string, object | undefined>> = {
    navigate<RouteName extends keyof T>(
      ...args: RouteName extends unknown
        ? [screen: RouteName] | [screen: RouteName, params: T[RouteName]]
        : never
    ): void;
  };
} 