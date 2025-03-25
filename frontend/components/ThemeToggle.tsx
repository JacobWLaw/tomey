import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useThemedStyles } from "../theme/useThemedStyles";

export default function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme();

  const styles = useThemedStyles((theme) => ({
    button: {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      width: 35,
      height: 35,
      bottom: theme.spacing.sm,
      right: theme.spacing.sm
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
    }
  }));

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: isDark ? '#4895ef' : '#0066cc' }
      ]} 
      onPress={toggleTheme}
    >
      <Text style={styles.text}>
        {isDark ? '☀️' : '🌙'}
      </Text>
    </TouchableOpacity>
  );
}

