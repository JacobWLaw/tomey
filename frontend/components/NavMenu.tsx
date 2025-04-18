import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Platform, Dimensions, useWindowDimensions } from "react-native";
import { useThemedStyles } from "../theme/useThemedStyles";
import { useTheme } from "../theme/ThemeContext";
import { router } from "expo-router";
import ThemeToggleButton from "./ThemeToggle";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const { width } = useWindowDimensions()
  const isLargeScreen = width >= 900;

  // start the animation offscreen to the left
  const slideAnim = useRef(new Animated.Value(-325)).current;
  
  useEffect(() => {
    if (isLargeScreen) {
      setOpen(true); // open on large screens
    } else {
      setOpen(false); // close on small screens
    }
  }, [isLargeScreen]);

  // update the animation when the open state changes or when changing the open state
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: open || isLargeScreen ? 0 : -325,
      duration: 200, // time the animation takes
      useNativeDriver: Platform.OS !== 'web', // native driver for better performance
    }).start();
  }, [open]);
    
  const styles = useThemedStyles((theme) => ({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: 300,
      backgroundColor: theme.colors.card,
      padding: theme.spacing.md,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      zIndex: 10
    },
    fixedContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: 300,
      backgroundColor: theme.colors.card,
      padding: theme.spacing.md,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      zIndex: 10,
      transform: [{ translateX: 0 }]
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
      zIndex: 5,
      ...(Platform.OS === 'web' ? { cursor: 'default' } as any : {})
    },
    toggleButton: {
      position: "absolute",
      zIndex: 15,
      top: theme.spacing.sm,
      left: theme.spacing.sm,
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.sm,
      borderRadius: 5,
      width: 35,
      height: 35,
      justifyContent: "center"
    },
    toggleButtonText: {
      textAlign: "center",
      color: theme.colors.text,
      fontSize: theme.fontSize.medium,
    },
    // Add styles for the header row
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    closeButton: {
      backgroundColor: theme.colors.primary,
      padding: 5,
      borderRadius: 5,
    },
    closeButtonText: {
      color: theme.colors.text,
      fontSize: theme.fontSize.medium,
    },
    contentTouchArea: {
      position: "absolute",
      top: 0,
      left: open ? 250 : 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      backgroundColor: "transparent", // Ensures click is captured
      ...(Platform.OS === 'web' ? { cursor: 'default' } as any : {})
    },
    mainContent: {
      marginLeft: isLargeScreen ? 300 : 0, // Add margin for content when menu is fixed
    }
  }));

  const webStyles = Platform.OS === 'web' ? {
    defaultCursor: {
      cursor: 'default'
    }
  } : {};

  const handleNavigation = (path: string) => {
    router.push(path);
    if (!isLargeScreen) {
      setOpen(false);
    }
  };

  return (
    <>
      {open && !isLargeScreen && (
        <TouchableOpacity
          style={[styles.overlay, Platform.OS === 'web' && webStyles.defaultCursor]}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        />
      )}
      
      <Animated.View 
        style={[
          isLargeScreen ? styles.fixedContainer : styles.container, 
          !isLargeScreen && { transform: [{ translateX: slideAnim }] }
        ]}
      >
        {/* Navigation menu items */}
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

      
      {!isLargeScreen && !open && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setOpen(!open)}
        >
          <Text style={styles.toggleButtonText}>☰</Text>
        </TouchableOpacity>
      )}
      
      {open && !isLargeScreen && (
        <TouchableOpacity
          style={styles.contentTouchArea}
          activeOpacity={1}
        />
      )}
    </>
  );
}