// src/screens/ChatScreen/index.tsx

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../styles/colors';
import { styles } from './styles';
import { useChatScreen } from './container';
import { ChatMessage } from '../../api/types';

const ChatScreen: React.FC = () => {
    const { messages, inputText, loading, setInputText, sendMessage } = useChatScreen();

    const renderMessage = ({ item }: { item: ChatMessage }) => (
        <View style={[styles.messageBubble, item.type === 'user' ? styles.userBubble : styles.aiBubble]}>
            {item.type === 'ai' && (
                <View style={styles.aiIconWrapper}>
                    <Icon name="shimmer" size={14} color={COLORS.shimmer} />
                    <Text style={styles.aiLabel}>AI Assistant</Text>
                </View>
            )}
            <Text style={[styles.messageText, item.type === 'user' && { color: COLORS.bg }]}>{item.text}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
            {/* Screen Title */}
            <View style={styles.screenHeader}>
                <View>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>Chat</Text>
                        <Icon name="robot-outline" size={22} color={COLORS.primary} style={{ marginLeft: 8 }} />
                    </View>
                    <Text style={styles.subtitle}>Ask questions about your document</Text>
                </View>
            </View>

            {/* Messages */}
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                scrollEnabled={true}
                contentContainerStyle={styles.messagesContainer}
                renderItem={renderMessage}
            />

            {/* Input */}
            <View style={[styles.inputContainer, { backgroundColor: COLORS.bg }]}>
                <TextInput
                    style={[styles.input, { borderColor: COLORS.border, color: COLORS.text, backgroundColor: COLORS.bgSecondary }]}
                    placeholder="Ask about your document..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                    editable={!loading}
                />
                <TouchableOpacity
                    style={[styles.sendButton, { backgroundColor: COLORS.primary }]}
                    onPress={sendMessage}
                    disabled={loading || !inputText.trim()}
                >
                    {loading ? (
                        <ActivityIndicator color={COLORS.bg} size={20} />
                    ) : (
                        <Icon name="send" size={20} color={COLORS.bg} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatScreen;