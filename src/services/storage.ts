import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkApiKey = async () => {
  try {
    const key = await AsyncStorage.getItem('SARVAM_API_KEY');
    if (!key) {
      console.warn('⚠️ API Key not set. Go to Settings to add it.');
    }
  } catch (error) {
    console.error('Storage error:', error);
  }
};

export const saveApiKey = async (key: string) => {
  try {
    await AsyncStorage.setItem('SARVAM_API_KEY', key);
    return true;
  } catch (error) {
    console.error('Error saving API key:', error);
    return false;
  }
};

export const getApiKey = async () => {
  try {
    return await AsyncStorage.getItem('SARVAM_API_KEY');
  } catch (error) {
    console.error('Error getting API key:', error);
    return null;
  }
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