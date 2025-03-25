import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { Slot } from 'expo-router';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';
import NavMenu from '../components/NavMenu';
import ThemeToggleButton from '../components/ThemeToggle';

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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 60,
      backgroundColor: theme.colors.card,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingTop: theme.spacing.md, // Add padding for status bar
    },
    headerText: {
      fontSize: theme.fontSize.xlarge,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
      marginBottom: theme.spacing.md
    },
    mainContent: {
      flex: 1,
    },
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Tomey</Text>
          <ThemeToggleButton />
        </View>
        <View style={styles.mainContent}>
          <NavMenu />
          <Slot />
        </View>
      </View>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </SafeAreaView>
  );
};

export default function Layout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}