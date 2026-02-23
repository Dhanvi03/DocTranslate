// src/navigation/TabNavigator.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../styles/colors';
import ScanScreen from '../screens/ScanScreen';
import ChatScreen from '../screens/ChatScreen';
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AppHeader from '../components/AppHeader';

const Tab = createBottomTabNavigator();

interface CustomTabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();

    const tabs = [
        { name: 'Scan', label: 'Scan', icon: 'camera', iconFocused: 'camera' },
        { name: 'Chat', label: 'Chat', icon: 'chat-outline', iconFocused: 'chat' },
        { name: 'Saved', label: 'Saved', icon: 'book-open-outline', iconFocused: 'book-open' },
        { name: 'Settings', label: 'Settings', icon: 'cog-outline', iconFocused: 'cog' },
    ];

    return (
        <View
            style={[
                styles.tabBar,
                {
                    paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
                    height: 64 + (Platform.OS === 'ios' ? insets.bottom : 10),
                },
            ]}
        >
            {state.routes.map((route: any, index: number) => {
                const isFocused = state.index === index;
                const tab = tabs[index];

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={styles.tabItem}
                        activeOpacity={0.7}
                    >
                        {isFocused ? (
                            <View style={styles.activePill}>
                                <Icon
                                    name={tab.iconFocused}
                                    size={22}
                                    color={COLORS.primary}
                                />
                            </View>
                        ) : (
                            <Icon
                                name={tab.icon}
                                size={22}
                                color={COLORS.textSecondary}
                            />
                        )}
                        <Text
                            style={[
                                styles.tabLabel,
                                { color: isFocused ? COLORS.primary : COLORS.textSecondary },
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: COLORS.bgSecondary,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 8,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    activePill: {
        backgroundColor: '#0d2a2a',
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        paddingHorizontal: 16,
        paddingVertical: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontSize: 11,
        fontWeight: '500',
    },
});

const TabNavigator: React.FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <AppHeader />
            <Tab.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen name="Scan" component={ScanScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Saved" component={SavedScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </View>
    );
};

export default TabNavigator;