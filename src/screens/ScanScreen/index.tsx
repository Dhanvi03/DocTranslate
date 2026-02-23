// src/screens/ScanScreen/index.tsx

import React, { useEffect, useEffectEvent, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../styles/colors';
import { styles } from './styles';
import { useScanScreen } from './container';
import { saveDocument } from '../../services/storage';

interface ScanScreenProps {
    navigation: any;
}

const ScanScreen: React.FC<ScanScreenProps> = ({ navigation }) => {
    const {
        image,
        extractedText,
        translatedText,
        loading,
        selectedLanguage,
        showLanguageDropdown,
        languages,
        pickImage,
        handleTranslate,
        handleSave,
        setImage,
        setSelectedLanguage,
        setShowLanguageDropdown,
    } = useScanScreen(() => navigation.navigate('Chat'));

    const handleSaveDocument = async () => {
        const doc = await handleSave();
        if (doc) {
            await saveDocument(doc);
            Alert.alert('Document saved!');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Screen Title */}
                <View style={styles.screenHeader}>
                    <Text style={styles.title}>Scanner</Text>
                    <Icon name="shimmer" size={22} color={COLORS.shimmer} />
                </View>

                {/* Image Upload Box */}
                {!image ? (
                    <View style={[styles.uploadBox, { borderColor: COLORS.border }]}>
                        <View style={styles.uploadButtonGroup}>
                            <View style={styles.uploadIconContainer}>
                                <Icon name="scan-helper" size={36} color={COLORS.primary} />
                            </View>
                            <Text style={styles.uploadTitle}>Capture or Upload</Text>
                            <Text style={styles.uploadSubtitle}>Take a photo or select an image</Text>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.uploadButton, { backgroundColor: COLORS.primary }]}
                                    onPress={() => pickImage('camera')}
                                >
                                    <Icon name="camera" size={18} color={COLORS.bg} style={{ marginRight: 6 }} />
                                    <Text style={[styles.buttonText, { color: COLORS.bg }]}>Camera</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.uploadButton, { backgroundColor: COLORS.primary }]}
                                    onPress={() => pickImage('gallery')}
                                >
                                    <Icon name="image" size={18} color={COLORS.bg} style={{ marginRight: 6 }} />
                                    <Text style={[styles.buttonText, { color: COLORS.bg }]}>Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.imagePreview}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <TouchableOpacity
                            style={styles.changeButton}
                            onPress={() => setImage(null)}
                        >
                            <Text style={styles.changeButtonText}>Change Image</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Extracted Text */}
                {extractedText ? (
                    <View style={[styles.card, { borderColor: COLORS.border }]}>
                        <Text style={styles.cardTitle}>Extracted Text</Text>
                        <Text style={styles.cardText}>{extractedText}</Text>
                    </View>
                ) : null}

                {/* Language Selection & Translate */}
                {extractedText && (
                    <View style={[styles.card, { borderColor: COLORS.border }]}>
                        <Text style={styles.cardTitle}>Translate To</Text>

                        <TouchableOpacity
                            style={[styles.languageButton, { borderColor: COLORS.border }]}
                            onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        >
                            <Text style={styles.languageText}>{languages[selectedLanguage as keyof typeof languages]}</Text>
                            <Icon name="chevron-down" size={20} color={COLORS.primary} />
                        </TouchableOpacity>

                        {showLanguageDropdown && (
                            <View style={[styles.dropdown, { backgroundColor: COLORS.bgSecondary }]}>
                                {Object.entries(languages).map(([code, name]) => (
                                    <TouchableOpacity
                                        key={code}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedLanguage(code);
                                            setShowLanguageDropdown(false);
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>{name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
                            onPress={handleTranslate}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={COLORS.bg} />
                            ) : (
                                <>
                                    <Icon name="translate" size={20} color={COLORS.bg} style={{ marginRight: 8 }} />
                                    <Text style={[styles.buttonText, { color: COLORS.bg }]}>Translate</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                {/* Translated Text */}
                {translatedText ? (
                    <View style={[styles.card, { borderColor: COLORS.primary }]}>
                        <Text style={styles.cardTitle}>Translation</Text>
                        <Text style={styles.cardText}>{translatedText}</Text>

                        <View style={styles.actionRow}>
                            <TouchableOpacity
                                style={[styles.smallButton, { backgroundColor: COLORS.primary }]}
                                onPress={() => navigation.navigate('Chat')}
                            >
                                <Icon name="chat" size={18} color={COLORS.bg} style={{ marginRight: 6 }} />
                                <Text style={[styles.smallButtonText, { color: COLORS.bg }]}>Ask AI</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.smallButton, { borderColor: COLORS.primary, borderWidth: 1 }]}
                                onPress={handleSaveDocument}
                            >
                                <Icon name="content-save" size={18} color={COLORS.primary} style={{ marginRight: 6 }} />
                                <Text style={[styles.smallButtonText, { color: COLORS.primary }]}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
            </ScrollView>
        </View>
    );
};

export default ScanScreen;