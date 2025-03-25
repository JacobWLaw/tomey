import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { useThemedStyles } from "../theme/useThemedStyles";
import { useTheme } from "../theme/ThemeContext";
import { router } from "expo-router";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const styles = useThemedStyles((theme) => ({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: 250,
      backgroundColor: theme.colors.card,
      padding: theme.spacing.md,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      transform: [{ translateX: open ? 0 : -250 }],
      zIndex: 1
    },
    menuItem: {
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    menuText: {
      color: theme.colors.text,
      fontSize: theme.fontSize.medium,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    toggleButton: {
      position: "absolute",
      zIndex: 2,
      top: theme.spacing.md,
      left: theme.spacing.md,
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.sm,
      borderRadius: 5,
    },
    toggleButtonText: {
      color: theme.colors.text,
      fontSize: theme.fontSize.medium,
    },
  }));

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setOpen(false)}
        />
      )}
      <Animated.View style={styles.container}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigation("/")}
        >
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigation("/books")}
        >
          <Text style={styles.menuText}>Books</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigation("/settings")}
        >
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.toggleButtonText}>{open ? "Close" : "Open"}</Text>
      </TouchableOpacity>
    </>
  );
}