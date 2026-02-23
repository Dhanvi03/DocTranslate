// src/components/AppHeader.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../styles/colors';

const AppHeader: React.FC = () => {
    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.container}>
                {/* Avatar */}
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>D</Text>
                </View>

                {/* App Name */}
                <Text style={styles.appName}>DocTranslate Pro</Text>

                {/* Sparkle Icon */}
                <Icon name="shimmer" size={24} color={COLORS.shimmer} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.bg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 10,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: COLORS.bg,
        fontWeight: 'bold',
        fontSize: 16,
    },
    appName: {
        flex: 1,
        color: COLORS.primary,
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});

export default AppHeader;
