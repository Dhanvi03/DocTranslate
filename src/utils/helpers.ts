// src/utils/helpers.ts

import { Alert } from 'react-native';

/**
 * Format date to readable format
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format time to readable format
 */
export const formatTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Show error alert
 */
export const showError = (title: string, message: string) => {
  Alert.alert(title, message, [{ text: 'OK', onPress: () => {} }]);
};

/**
 * Show success alert
 */
export const showSuccess = (title: string, message: string) => {
  Alert.alert(title, message, [{ text: 'OK', onPress: () => {} }]);
};

/**
 * Validate API key format
 */
export const isValidApiKey = (key: string): boolean => {
  return key.startsWith('sk-') && key.length > 20;
};

/**
 * Get language display name
 */
export const getLanguageName = (code: string): string => {
  const languages: { [key: string]: string } = {
    'auto': 'Auto-detect',
    'en-IN': 'English',
    'hi-IN': 'Hindi',
    'ta-IN': 'Tamil',
    'te-IN': 'Telugu',
    'bn-IN': 'Bengali',
    'gu-IN': 'Gujarati',
    'kn-IN': 'Kannada',
    'ml-IN': 'Malayalam',
    'mr-IN': 'Marathi',
    'pa-IN': 'Punjabi',
    'od-IN': 'Odia',
    'ur-IN': 'Urdu',
  };
  return languages[code] || 'Unknown';
};

/**
 * Debounce function for API calls
 */
// export const debounce = (func: Function, delay: number) => {
//   let timeoutId: NodeJS.Timeout;
//   return (...args: any[]) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func(...args), delay);
//   };
// };

/**
 * Log error with context
 */
export const logError = (context: string, error: any) => {
  console.error(`[${context}] Error:`, error);
};

/**
 * Check if text is empty or whitespace
 */
export const isEmpty = (text: string): boolean => {
  return !text || text.trim().length === 0;
};