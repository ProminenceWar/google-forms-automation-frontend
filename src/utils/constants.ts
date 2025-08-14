// Color palette: white, black, blue
export const Colors = {
  // Primary colors
  primary: '#007AFF', // Blue
  secondary: '#000000', // Black
  background: '#FFFFFF', // White
  
  // Text colors
  textPrimary: '#000000', // Black
  textSecondary: '#666666', // Gray
  textLight: '#FFFFFF', // White
  
  // Status colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  
  // UI colors
  border: '#E5E5E7',
  placeholder: '#999999',
  disabled: '#F2F2F7',
  shadow: '#00000029',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  heading: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 34,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 18,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://your-backend-url.com/api', // Replace with actual backend URL
  ENDPOINTS: {
    SUBMIT_FORM: '/forms/submit',
  },
  TIMEOUT: 10000, // 10 seconds
};