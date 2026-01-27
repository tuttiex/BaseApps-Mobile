import { Stack } from 'expo-router';
import { colors } from '@/src/constants/theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { FavoritesProvider } from '@/src/context/FavoritesContext';

// ... existing code ...

export default function RootLayout() {
  // Hide splash screen immediately since we removed custom fonts
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <FavoritesProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="dapp/[id]"
          options={{
            title: 'Dapp Details',
            headerBackTitle: 'Back',
            presentation: 'card'
          }}
        />
        <Stack.Screen
          name="category/[id]"
          options={{
            title: 'Category',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </FavoritesProvider>
  );
}
