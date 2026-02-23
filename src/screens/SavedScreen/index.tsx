// src/screens/SavedScreen/index.tsx

import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../styles/colors';
import { styles } from './styles';
import { useSavedScreen } from './container';
import { SavedDocument } from '../../api/types';

const SavedScreen: React.FC = () => {
    const { documents, handleDelete, handleCopy } = useSavedScreen();

    const getLanguageName = (code: string) => {
        const langs: { [key: string]: string } = {
            'en-IN': 'English',
            'hi-IN': 'Hindi',
            'ta-IN': 'Tamil',
            'te-IN': 'Telugu',
            'bn-IN': 'Bengali',
        };
        return langs[code] || 'Unknown';
    };

    const renderDocument = ({ item }: { item: SavedDocument }) => (
        <View style={[styles.docCard, { borderColor: COLORS.border }]}>
            <View style={styles.docHeader}>
                <View style={[styles.docIcon, { backgroundColor: COLORS.primaryDark }]}>
                    <Icon name="file-document-outline" size={22} color={COLORS.primary} />
                </View>
                <View style={styles.docInfo}>
                    <Text style={styles.docTitle}>{item.title}</Text>
                    <Text style={styles.docSubtitle}>
                        English -> {getLanguageName(item.language)} 
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                >
                    <Icon name="trash-can-outline" size={20} color={COLORS.danger} />
                </TouchableOpacity>
            </View>

            <Text style={styles.docPreview} numberOfLines={2}>
                {item.translatedText || item.extractedText}
            </Text>

            <View style={styles.docFooter}>
                <Text style={styles.docDate}>
                    {new Date(item.date).toLocaleDateString()}
                </Text>
                <TouchableOpacity
                    style={[styles.copyButton, { borderColor: COLORS.border }]}
                    onPress={() => handleCopy(item.translatedText || item.extractedText)}
                >
                    <Icon name="content-copy" size={14} color={COLORS.primary} />
                    <Text style={[styles.copyButtonText, { color: COLORS.primary }]}>Copy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
            {/* Screen Title */}
            <View style={styles.screenHeader}>
                <Text style={styles.title}>Saved</Text>
                <Text style={styles.subtitle}>{documents.length} saved documents</Text>
            </View>

            {/* Documents List */}
            {documents.length === 0 ? (
                <View style={styles.emptyState}>
                    <Icon name="inbox-multiple-outline" size={64} color={COLORS.textSecondary} style={{ marginBottom: 16 }} />
                    <Text style={styles.emptyText}>No saved documents yet</Text>
                </View>
            ) : (
                <FlatList
                    data={documents}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                    contentContainerStyle={styles.listContainer}
                    renderItem={renderDocument}
                />
            )}
        </View>
    );
};

export default SavedScreen;