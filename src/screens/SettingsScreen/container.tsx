// src/screens/SettingsScreen/container.tsx

import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import SarvamAPI from '../../api/sarvamAPI';
import {
  saveApiKey,
  getApiKey,
  getPreferences,
  savePreferences,
  clearAllData,
} from '../../services/storage';
import { AppPreferences } from '../../api/types';

export const useSettingsScreen = () => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [prefs, setPrefs] = useState<AppPreferences>({
    defaultLanguage: 'English',
    saveHistory: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const key = await getApiKey();
    if (key) setApiKey(key);
    const savedPrefs = await getPreferences();
    setPrefs(savedPrefs);
  };

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      Alert.alert('Error', 'Please enter API key');
      return;
    }
    await saveApiKey(apiKey);
    Alert.alert('Success', 'API key saved!');
  };

  const handleVerify = async () => {
    if (!apiKey.trim()) {
      Alert.alert('Error', 'Please enter API key');
      return;
    }
    setLoading(true);
    try {
      const isValid = await SarvamAPI.verifyApiKey(apiKey);
      if (isValid) {
        Alert.alert('Success', 'API key is valid!');
      } else {
        Alert.alert('Error', 'API key is invalid');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify API key');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    await savePreferences(prefs);
    Alert.alert('Success', 'Preferences saved!');
  };

  const handleClearData = () => {
    Alert.alert('Clear Data', 'This will delete all saved documents and history. Continue?', [
      { text: 'Cancel' },
      {
        text: 'Clear',
        onPress: async () => {
          await clearAllData();
          Alert.alert('Success', 'All data cleared');
        },
        style: 'destructive',
      },
    ]);
  };

  return {
    apiKey,
    showKey,
    prefs,
    loading,
    setApiKey,
    setShowKey,
    setPrefs,
    handleSaveApiKey,
    handleVerify,
    handleSavePreferences,
    handleClearData,
  };
};