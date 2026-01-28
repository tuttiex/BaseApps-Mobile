import '@walletconnect/react-native-compat'
import { createAppKit, AppKitButton } from '@reown/appkit-react-native'
import { WagmiAdapter } from '@reown/appkit-wagmi-react-native'
import { base, mainnet, arbitrum, optimism, polygon } from 'viem/chains'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 1. Get projectId from https://cloud.reown.com
const projectId = 'b56e18d47c72ab683b10814fe9495694' // Public testing ID. Replace with yours!

// 2. Create metadata
const metadata = {
    name: 'BaseApps',
    description: 'The home of all things Base',
    url: 'https://baseapps.com',
    icons: ['https://avatars.githubusercontent.com/u/108554348?v=4'], // Placeholder icon
    redirect: {
        native: 'baseapps://',
        universal: 'baseapps.com'
    }
}

// 3. Define chains
const chains = [base, mainnet, arbitrum, optimism, polygon] as const

// Ensure networks is a non-empty array for WagmiAdapter
const networks = [...chains] as [any, ...any[]]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
})

// 5. Create storage implementation using AsyncStorage
const storage = {
    getItem: async (key: string) => {
        const value = await AsyncStorage.getItem(key);
        try {
            return value ? JSON.parse(value) : undefined;
        } catch {
            return value || undefined;
        }
    },
    setItem: async (key: string, value: any) => {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, stringValue);
    },
    removeItem: async (key: string) => {
        await AsyncStorage.removeItem(key);
    },
    getKeys: async () => {
        return (await AsyncStorage.getAllKeys()) as string[];
    },
    getEntries: async () => {
        const keys = await AsyncStorage.getAllKeys();
        const entries = await AsyncStorage.multiGet(keys);
        return entries.map(([key, value]) => {
            try {
                return [key, value ? JSON.parse(value) : undefined];
            } catch {
                return [key, value || undefined];
            }
        });
    }
}

// 6. Create modal
export const appKit = createAppKit({
    adapters: [wagmiAdapter],
    networks: networks as any,
    projectId,
    metadata,
    storage: storage as any,
    enableAnalytics: true,
})

export const wagmiConfig = wagmiAdapter.wagmiConfig;
export { AppKitButton, chains };
export { ConnectButton } from '@reown/appkit-react-native';
