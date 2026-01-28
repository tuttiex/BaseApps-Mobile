import '@/src/config/polyfills';

import { Stack } from 'expo-router';
import { colors } from '@/src/constants/theme';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { AppKitProvider } from '@reown/appkit-react-native';
import { appKit, wagmiConfig } from '@/src/config/web3';
import { FavoritesProvider } from '@/src/context/FavoritesContext';

// Initialize QueryClient
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Hide splash screen immediately since we removed custom fonts
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AppKitProvider instance={appKit}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </WagmiProvider>
    </AppKitProvider>
  );
}
