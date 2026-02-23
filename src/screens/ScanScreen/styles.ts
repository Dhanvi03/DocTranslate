// src/screens/ScanScreen/styles.ts

import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    screenHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    uploadBox: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 28,
        borderStyle: 'dashed',
        marginBottom: 16,
        backgroundColor: COLORS.bgSecondary,
    },
    uploadButtonGroup: {
        alignItems: 'center',
    },
    uploadIconContainer: {
        width: 72,
        height: 72,
        borderRadius: 16,
        backgroundColor: COLORS.bg,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    uploadTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 6,
    },
    uploadSubtitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },
    uploadButton: {
        paddingHorizontal: 22,
        paddingVertical: 11,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.text,
        fontWeight: '600',
        fontSize: 14,
    },
    imagePreview: {
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
    },
    changeButton: {
        marginTop: 8,
        paddingVertical: 8,
        alignItems: 'center',
    },
    changeButtonText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    card: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        backgroundColor: COLORS.bgSecondary,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cardText: {
        fontSize: 15,
        color: COLORS.text,
        lineHeight: 22,
    },
    languageButton: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12,
        backgroundColor: COLORS.bg,
    },
    languageText: {
        color: COLORS.text,
        fontWeight: '500',
        fontSize: 14,
    },
    dropdown: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    dropdownItem: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderBottomColor: COLORS.border,
        borderBottomWidth: 1,
    },
    dropdownText: {
        color: COLORS.text,
        fontSize: 14,
    },
    actionButton: {
        paddingVertical: 13,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 14,
    },
    smallButton: {
        flex: 1,
        paddingVertical: 11,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    smallButtonText: {
        fontSize: 13,
        fontWeight: '600',
    },
});