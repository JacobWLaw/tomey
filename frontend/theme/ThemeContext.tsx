import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AppTheme, lightTheme, darkTheme } from './theme';

type ThemeContextType = {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');
  
  // Determine the active theme based on themeMode and system settings
  const getActiveTheme = (): AppTheme => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return themeMode === 'dark' ? darkTheme : lightTheme;
  };
  
  const [theme, setActiveTheme] = useState<AppTheme>(getActiveTheme());
  
  // Update theme when system theme changes or themeMode changes
  useEffect(() => {
    setActiveTheme(getActiveTheme());
  }, [systemColorScheme, themeMode]);
  
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  const setTheme = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
  };
  
  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        isDark: theme.dark, 
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};