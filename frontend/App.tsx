import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import BookList from './components/BookList';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { useThemedStyles } from './theme/useThemedStyles';
import NavMenu from './components/NavMenu';

// App content component that uses the theme
const AppContent = () => {
  const { theme, isDark } = useTheme();
  
  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: theme.spacing.md,
    },
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <NavMenu />
      </View>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </SafeAreaView>
  );
};

// Main App component with ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}