import { createAppKit, defaultConfig, AppKitButton } from '@reown/appkit-react-native'
import { base, mainnet, arbitrum, optimism, polygon } from 'viem/chains'

// 1. Get projectId from https://cloud.reown.com
const projectId = 'b56e18d47c72ab683b10814fe9495694' // Public testing ID. Replace with yours!

// 2. Create config
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

const chains = [base, mainnet, arbitrum, optimism, polygon] as const

const wagmiConfig = defaultConfig({
    metadata,
    projectId,
})

// 3. Create modal
export const appKit = createAppKit({
    projectId,
    chains,
    config: wagmiConfig,
    enableAnalytics: true,
})

export { AppKitButton, wagmiConfig, chains };
