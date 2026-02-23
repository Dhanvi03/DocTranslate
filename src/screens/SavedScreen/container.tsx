// src/screens/SavedScreen/container.tsx

import { useState, useCallback } from 'react';
import { Alert, Clipboard } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getSavedDocuments, deleteDocument } from '../../services/storage';
import { SavedDocument } from '../../api/types';

export const useSavedScreen = () => {
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadDocuments();
    }, [])
  );

  const loadDocuments = async () => {
    setLoading(true);
    const docs = await getSavedDocuments();
    setDocuments(docs);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete', 'Remove this document?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteDocument(id);
          loadDocuments();
          Alert.alert('Success', 'Document deleted');
        },
        style: 'destructive',
      },
    ]);
  };

  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'Text copied to clipboard');
  };

  return {
    documents,
    loading,
    handleDelete,
    handleCopy,
  };
};