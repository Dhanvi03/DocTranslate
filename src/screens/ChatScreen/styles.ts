// src/screens/ChatScreen/styles.ts

import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const styles = StyleSheet.create({
    screenHeader: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subtitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    messagesContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexGrow: 1,
    },
    messageBubble: {
        marginVertical: 6,
        maxWidth: '88%',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 14,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.primary,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.bgSecondary,
        borderColor: COLORS.border,
        borderWidth: 1,
    },
    aiIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 6,
    },
    aiLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.primary,
    },
    icon: {
        marginTop: 2,
    },
    messageText: {
        color: COLORS.text,
        fontSize: 14,
        lineHeight: 20,
    },
    inputContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        alignItems: 'flex-end',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        maxHeight: 100,
        fontSize: 14,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});