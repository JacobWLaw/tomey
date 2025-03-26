import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, SafeAreaView, Text, useWindowDimensions } from 'react-native';
import { Slot } from 'expo-router';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';
import { useThemedStyles } from '../theme/useThemedStyles';
import NavMenu from '../components/NavMenu';
import ThemeToggleButton from '../components/ThemeToggle';

const AppContent = () => {
  const { theme, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 900;

  const styles = useThemedStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderWidth: 0,
    },
    content: {
      flex: 1,
      padding: 0,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 60,
      backgroundColor: theme.colors.card,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingTop: theme.spacing.md, // Add padding for status bar
    },
    headerText: {
      fontSize: theme.fontSize.xlarge,
      fontWeight: "bold",
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    mainContent: {
      flex: 1,
      flexDirection: "row", // Change to horizontal layout
    },
    navMenu: {
      width: isLargeScreen ? 300 : 0,
    },
    slotContent: {
      flex: 1,
      padding: theme.spacing.md,
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
          {isLargeScreen && (
            <View style={styles.navMenu}>
              <NavMenu />
          </View>
          )}
          <View style={styles.slotContent}>
            {!isLargeScreen ? <NavMenu /> : null}
            <Slot />
          </View>
        </View>
      </View>
      <StatusBar style={isDark ? "light" : "dark"} />
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
