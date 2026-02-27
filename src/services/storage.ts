import AsyncStorage from '@react-native-async-storage/async-storage';
import { SARVAM_API_KEY } from '@env';

export const checkApiKey = async () => {
  if (!SARVAM_API_KEY || SARVAM_API_KEY === 'your_api_key_here') {
    console.warn('⚠️ API Key not set. Add it to .env file.');
  }
};

export const saveApiKey = async (_key: string) => {
  // No-op: API key is now managed via .env file
  return true;
};

export const getApiKey = async () => {
  return SARVAM_API_KEY || null;
};

export const saveDocument = async (doc: any) => {
  try {
    const docs = JSON.parse((await AsyncStorage.getItem('saved_documents')) || '[]');
    docs.push({ ...doc, id: Date.now().toString(), date: new Date().toISOString() });
    await AsyncStorage.setItem('saved_documents', JSON.stringify(docs));
    return true;
  } catch (error) {
    console.error('Error saving document:', error);
    return false;
  }
};

export const getSavedDocuments = async () => {
  try {
    const docs = await AsyncStorage.getItem('saved_documents');
    return docs ? JSON.parse(docs) : [];
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
};

export const deleteDocument = async (id: string) => {
  try {
    const docs = JSON.parse((await AsyncStorage.getItem('saved_documents')) || '[]');
    const filtered = docs.filter((d: any) => d.id !== id);
    await AsyncStorage.setItem('saved_documents', JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
};

export const savePreferences = async (prefs: any) => {
  try {
    await AsyncStorage.setItem('preferences', JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.error('Error saving preferences:', error);
    return false;
  }
};

export const getPreferences = async () => {
  try {
    const prefs = await AsyncStorage.getItem('preferences');
    return prefs ? JSON.parse(prefs) : { defaultLanguage: 'English', saveHistory: true };
  } catch (error) {
    console.error('Error getting preferences:', error);
    return { defaultLanguage: 'English', saveHistory: true };
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove(['saved_documents', 'preferences', 'chat_history']);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};