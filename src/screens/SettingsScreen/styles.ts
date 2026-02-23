// src/screens/SettingsScreen/styles.ts

import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    screenHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    card: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        backgroundColor: COLORS.bgSecondary,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },
    label: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 8,
        fontWeight: '500',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 14,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
    },
    eyeButton: {
        padding: 4,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    selectButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 14,
    },
    selectButtonText: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '500',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    toggle: {
        width: 48,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    infoLabel: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    infoValue: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '600',
    },
    dangerButton: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
});