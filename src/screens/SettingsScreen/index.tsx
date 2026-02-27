// src/screens/SettingsScreen/index.tsx

import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../styles/colors';
import { styles } from './styles';
import { useSettingsScreen } from './container';

const SettingsScreen: React.FC = () => {
    const {
        apiKey,
        showKey,
        prefs,
        loading,
        setApiKey,
        setShowKey,
        setPrefs,
        handleSaveApiKey,
        handleVerify,
        handleSavePreferences,
        handleClearData,
    } = useSettingsScreen();

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
            <ScrollView contentContainerStyle={styles.scrollContent} >
                {/* Screen Title */}
                <View style={styles.screenHeader}>
                    <Text style={styles.title}>Settings</Text>
                </View>

                {/* API Configuration */}
                <View style={[styles.card, { borderColor: COLORS.border }]}>
                    <View style={styles.cardHeader}>
                        <Icon name="shield-lock-outline" size={22} color={COLORS.primary} style={{ marginRight: 10 }} />
                        <Text style={styles.cardTitle}>API Configuration</Text>
                    </View>

                    <Text style={styles.label}>API Key</Text>
                    <View style={[styles.inputWrapper, { borderColor: COLORS.border, backgroundColor: COLORS.bg }]}>
                        <TextInput
                            style={[styles.input, { color: COLORS.text }]}
                            placeholder="Enter your API key"
                            placeholderTextColor={COLORS.textSecondary}
                            value={apiKey}
                            onChangeText={setApiKey}
                            secureTextEntry={!showKey}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowKey(!showKey)}
                        >
                            <Icon name={showKey ? 'eye-off-outline' : 'eye-outline'} size={22} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: COLORS.primary, flex: 1 }]}
                            onPress={handleSaveApiKey}
                        >
                            <Icon name="content-save-outline" size={18} color={COLORS.bg} style={{ marginRight: 6 }} />
                            <Text style={[styles.buttonText, { color: COLORS.bg }]}>Save</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            style={[styles.button, { borderColor: COLORS.primary, borderWidth: 1.5, flex: 1 }]}
                            onPress={handleVerify}
                            disabled={loading}
                        >
                            <Icon name="check-circle-outline" size={18} color={COLORS.primary} style={{ marginRight: 6 }} />
                            <Text style={[styles.buttonText, { color: COLORS.primary }]}>Verify</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>

                {/* Preferences */}
                <View style={[styles.card, { borderColor: COLORS.border }]}>
                    <View style={styles.cardHeader}>
                        <Icon name="tune-variant" size={22} color={COLORS.primary} style={{ marginRight: 10 }} />
                        <Text style={styles.cardTitle}>Preferences</Text>
                    </View>

                    <Text style={styles.label}>Default Language</Text>
                    <View
                        style={[styles.selectButton, { borderColor: COLORS.border, backgroundColor: COLORS.bg }]}
                    >
                        <Text style={styles.selectButtonText}>{prefs.defaultLanguage}</Text>
                        {/* <Icon name="chevron-down" size={20} color={COLORS.primary} /> */}
                    </View>

                    <View style={styles.toggleRow}>
                        <Text style={styles.label}>Save History</Text>
                        <TouchableOpacity
                            style={[
                                styles.toggle,
                                { backgroundColor: prefs.saveHistory ? COLORS.primary : COLORS.border },
                            ]}
                            onPress={() => setPrefs({ ...prefs, saveHistory: !prefs.saveHistory })}
                        >
                            {prefs.saveHistory && <Icon name="check" size={14} color={COLORS.bg} />}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: COLORS.primary, marginTop: 16 }]}
                        onPress={handleSavePreferences}
                    >
                        <Icon name="content-save-outline" size={18} color={COLORS.bg} style={{ marginRight: 6 }} />
                        <Text style={[styles.buttonText, { color: COLORS.bg }]}>Save Preferences</Text>
                    </TouchableOpacity>
                </View>

                {/* About */}
                <View style={[styles.card, { borderColor: COLORS.border }]}>
                    <View style={styles.cardHeader}>
                        <Icon name="information-outline" size={22} color={COLORS.primary} style={{ marginRight: 10 }} />
                        <Text style={styles.cardTitle}>About</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Version</Text>
                        <Text style={styles.infoValue}>1.0.0</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>App Name</Text>
                        <Text style={styles.infoValue}>DocTranslate Pro</Text>
                    </View>
                </View>

                {/* Danger Zone */}
                <TouchableOpacity
                    style={[
                        styles.dangerButton,
                        { backgroundColor: COLORS.danger + '20', borderColor: COLORS.danger },
                    ]}
                    onPress={handleClearData}
                >
                    <Icon name="trash-can-outline" size={20} color={COLORS.danger} style={{ marginRight: 8 }} />
                    <Text style={[styles.buttonText, { color: COLORS.danger }]}>Clear All Data</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default SettingsScreen;