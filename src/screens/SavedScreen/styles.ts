// src/screens/SavedScreen/styles.ts

import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const styles = StyleSheet.create({
    screenHeader: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
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
    listContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },
    docCard: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        backgroundColor: COLORS.bgSecondary,
    },
    docHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 12,
    },
    docIcon: {
        width: 42,
        height: 42,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    docInfo: {
        flex: 1,
    },
    docTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
    },
    docSubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    deleteButton: {
        padding: 6,
    },
    docPreview: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginBottom: 10,
        lineHeight: 18,
    },
    docDate: {
        color: COLORS.textSecondary,
        fontSize: 11,
    },
    docFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    copyButton: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    copyButtonText: {
        fontWeight: '600',
        fontSize: 12,
    },
});