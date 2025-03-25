export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    error: string;
    success: string;
  }
  
  export interface ThemeSpacing {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  }
  
  export interface ThemeFontSizes {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    xxlarge: number;
  }
  
  export interface AppTheme {
    dark: boolean;
    colors: ThemeColors;
    spacing: ThemeSpacing;
    fontSize: ThemeFontSizes;
  }
  
  // Light theme
  export const lightTheme: AppTheme = {
    dark: false,
    colors: {
      primary: '#0066cc',
      secondary: '#4ecdc4',
      background: '#ffffff',
      card: '#f9f9f9',
      text: '#333333',
      border: '#e0e0e0',
      notification: '#ff9500',
      error: '#ff3b30',
      success: '#34c759',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    fontSize: {
      small: 12,
      medium: 16,
      large: 18,
      xlarge: 24,
      xxlarge: 32,
    },
  };
  
  // Dark theme
  export const darkTheme: AppTheme = {
    dark: true,
    colors: {
      primary: '#4895ef',
      secondary: '#4ecdc4',
      background: '#121212',
      card: '#1e1e1e',
      text: '#f2f2f2',
      border: '#3d3d3d',
      notification: '#ff9500',
      error: '#ff453a',
      success: '#32d74b',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    fontSize: {
      small: 12,
      medium: 16,
      large: 18,
      xlarge: 24,
      xxlarge: 32,
    },
  };