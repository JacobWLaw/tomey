import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AppTheme, lightTheme, darkTheme } from './theme';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeContextType = {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
};

interface ThemeProviderProps {
  children: React.ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  
  // checks system theme and themeMode
  const getActiveTheme = (): AppTheme => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return themeMode === 'dark' ? darkTheme : lightTheme;
  };
  
  const [theme, setActiveTheme] = useState<AppTheme>(getActiveTheme());
  
  // update the theme on change
  useEffect(() => {
    setActiveTheme(getActiveTheme());
  }, [systemColorScheme, themeMode]);
  
  const toggleTheme = () => {
    if(themeMode === 'system'){
      setThemeMode(systemColorScheme === 'dark' ? 'light' : 'dark')
    } else {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
    }
  };
  
  const setTheme = (mode: ThemeMode) => {
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