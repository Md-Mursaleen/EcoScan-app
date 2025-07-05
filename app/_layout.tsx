import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './navigation/AppNavigator';

LogBox.ignoreAllLogs();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config);

// TypeScript types across all Tamagui APIs
type Conf = typeof tamaguiConfig;
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
};

export default function RootLayout() {
  const [loaded] = useFonts({
    DomineRegular: require('../assets/fonts/Domine-Regular.ttf'),
    DomineMedium: require('../assets/fonts/Domine-Medium.ttf'),
    DomineBold: require('../assets/fonts/Domine-Bold.ttf'),
    DomineSemiBold: require('../assets/fonts/Domine-SemiBold.ttf'),
    PlusJakartaRegular: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    PlusJakartaMedium: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    PlusJakartaSemiBold: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    PlusJakartaBold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    PlusJakartaExtraBold: require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    PlusJakartaItalic: require('../assets/fonts/PlusJakartaSans-Italic.ttf'),
    PlusJakartaMediumItalic: require('../assets/fonts/PlusJakartaSans-MediumItalic.ttf'),
    PlusJakartaExtraBoldItalic: require('../assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf'),
    AileronBold: require('../assets/fonts/aileron.bold.otf'),
    AileronSemiBold: require('../assets/fonts/aileron.semibold.otf'),
    AileronRegular: require('../assets/fonts/Aileron-Regular.otf'),
    SacramentoRegular: require('../assets/fonts/Sacramento-Regular.ttf'),
    SpaceMonoRegular: require('../assets/fonts/SpaceMono-Regular.ttf'),
    BebasNeueRegular: require('../assets/fonts/BebasNeue-Regular.ttf'),
    LoraRegular: require('../assets/fonts/Lora-Regular.ttf'),
    LoraItalic: require('../assets/fonts/Lora-Italic.ttf'),
    LoraSemiBold: require('../assets/fonts/Lora-SemiBold.ttf'),
    LoraMedium: require('../assets/fonts/Lora-Medium.ttf'),
    LoraBold: require('../assets/fonts/Lora-Bold.ttf'),
    LoraMediumItalic: require('../assets/fonts/Lora-MediumItalic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
