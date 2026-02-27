import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigator';
import AppHeader from './src/components/AppHeader';
import SplashScreen from './src/components/SplashScreen'; // 👈
import { COLORS } from './src/styles/colors';
import { checkApiKey } from './src/services/storage';


export default function App() {
  const [showSplash, setShowSplash] = useState(true); // 👈

  useEffect(() => {
    checkApiKey();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#1a1d29" />
        <AppHeader />
        <NavigationContainer>
          <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
            <TabNavigator />
          </View>
        </NavigationContainer>

        {/* Splash renders on top, self-removes after animation */}
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}