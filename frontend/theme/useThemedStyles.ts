import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { AppTheme } from './theme';

// Type for style creator functions
export type StyleCreator<T extends StyleSheet.NamedStyles<T>> = (theme: AppTheme) => T;

export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(styleCreator: StyleCreator<T>) {
  const { theme } = useTheme();
  return StyleSheet.create(styleCreator(theme));
}