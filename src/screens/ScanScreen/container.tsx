// src/screens/ScanScreen/container.tsx (FIXED)

import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import SarvamAPI from '../../api/sarvamAPI';
import { getApiKey } from '../../services/storage';
import RNFS from 'react-native-fs';

export const useScanScreen = (onAskAI: () => void) => {
    const [image, setImage] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const languages = {
        'en-IN': 'English',
        'hi-IN': 'Hindi',
        'ta-IN': 'Tamil',
        'te-IN': 'Telugu',
        'bn-IN': 'Bengali',
    };

    const requestPermissions = async (source: 'camera' | 'gallery'): Promise<boolean> => {
        try {
            let permission;
            if (Platform.OS === 'ios') {
                permission = source === 'camera'
                    ? PERMISSIONS.IOS.CAMERA
                    : PERMISSIONS.IOS.PHOTO_LIBRARY;
            } else {
                if (source === 'camera') {
                    permission = PERMISSIONS.ANDROID.CAMERA;
                } else {
                    // Android 13+ uses READ_MEDIA_IMAGES, older uses READ_EXTERNAL_STORAGE
                    permission = parseInt(Platform.Version as string, 10) >= 33
                        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
                }
            }

            const result = await request(permission);

            if (result === RESULTS.GRANTED) {
                return true;
            } else if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
                Alert.alert(
                    'Permission Required',
                    `Please allow access to your ${source} in settings to use this feature.`,
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Open Settings', onPress: () => openSettings() }
                    ]
                );
                return false;
            }
            return false;
        } catch (error) {
            console.error('Permission error:', error);
            return false;
        }
    };

    const pickImage = async (source: 'camera' | 'gallery') => {
        if (loading) {
            Alert.alert('Please wait', 'Task is currently processing.');
            return;
        }

        const hasPermission = await requestPermissions(source);
        if (!hasPermission) return;

        try {
            const options = {
                mediaType: 'photo' as const,
                cropping: true,
                compressImageQuality: 0.8,
            };

            const result = source === 'camera'
                ? await ImageCropPicker.openCamera(options)
                : await ImageCropPicker.openPicker(options);

            if (result.path) {
                setImage(result.path);
                setExtractedText('');
                setTranslatedText('');
                handleExtractText(result.path);
            }
        } catch (error: any) {
            if (error.code !== 'E_PICKER_CANCELLED') {
                Alert.alert('Error', 'Failed to pick image');
                console.error(error);
            }
        }
    };

    // Convert file path to base64
    const fileToBase64 = async (filePath: string): Promise<string> => {
        try {
            const base64 = await RNFS.readFile(filePath, 'base64');
            return base64;
        } catch (error) {
            console.error('Error converting file to base64:', error);
            throw error;
        }
    };

    const handleExtractText = async (filePath: string) => {
        try {
            setLoading(true);
            const apiKey = await getApiKey();
            if (!apiKey) {
                Alert.alert('Error', 'API Key not configured. Go to Settings.');
                return;
            }

            // Convert image file to base64
            const base64 = await fileToBase64(filePath);

            console.log('Image converted to base64, length:', base64.length);

            // Call API with base64 string
            const result = await SarvamAPI.documentIntelligence(apiKey, base64);

            console.log('Result:', result);

            if (result.extracted_text) {
                setExtractedText(result.extracted_text);
                setTranslatedText('');
            } else {
                Alert.alert('Error', result.error || 'Failed to extract text');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to extract text: ' + String(error));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleTranslate = async () => {
        try {
            setLoading(true);
            const apiKey = await getApiKey();
            if (!apiKey) {
                Alert.alert('Error', 'API Key not configured.');
                return;
            }

            const result = await SarvamAPI.translate(apiKey, extractedText, 'auto', selectedLanguage);
            if (result.translated_text) {
                setTranslatedText(result.translated_text);
            } else {
                Alert.alert('Error', result.error || 'Translation failed');
            }
        } catch (error) {
            Alert.alert('Error', 'Translation failed: ' + String(error));
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!extractedText) {
            Alert.alert('Error', 'No text to save');
            return;
        }
        return {
            title: 'Document-' + new Date().toLocaleDateString(),
            extractedText,
            translatedText,
            language: selectedLanguage,
            image,
        };
    };

    const handleChangeImage = () => {
        if (loading) {
            Alert.alert('Please wait', 'Text extraction is in progress.');
            return;
        }
        setImage(null);
        setExtractedText('');
        setTranslatedText('');
    };

    return {
        // State
        image,
        extractedText,
        translatedText,
        loading,
        selectedLanguage,
        showLanguageDropdown,
        languages,
        // Actions
        pickImage,
        handleTranslate,
        handleSave,
        setImage,
        handleChangeImage,
        setSelectedLanguage,
        setShowLanguageDropdown,
    };
};