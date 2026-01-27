# BaseApps Mobile

A native iOS and Android application for [BaseApps](https://baseapps-production.up.railway.app), the dApp discovery platform for the Base ecosystem. Built with React Native (Expo) and TypeScript.

## Features

- **Discover dApps**: Browse the full ecosystem of Base applications.
- **Search**: Fast, debounced search for dApps by name or category.
- **Filtering**: Filter dApps by categories like "DeFi", "GameFi", "Social", and more.
- **Dapp Details**: View detailed information, status, and chain data for each dApp.
- **Persistence**: Save your favorite dApps directly to your device (persisted via AsyncStorage).
- **Dark Mode**: Sleek, dark-themed UI matching the BaseApps web brand (`#0A0B0D`).

## Tech Stack

- **Framework**: React Native (Expo SDK 52+)
- **Routing**: Expo Router (File-based routing)
- **Language**: TypeScript
- **Styling**: React Native StyleSheet + Paper (Custom Theme)
- **State Management**: React Context + AsyncStorage
- **Networking**: Axios

## Project Structure

```
mobile/BaseApps/
├── app/                  # Screens & Routing
│   ├── (tabs)/           # Bottom Tab Navigator (Home, Search, Favorites)
│   ├── dapp/             # Dapp Detail Route
│   └── _layout.tsx       # Root Layout & Providers
├── src/
│   ├── components/       # Reusable UI Components
│   ├── constants/        # Theme & Config
│   ├── context/          # Global State (Favorites)
│   ├── screens/          # Screen Implementations
│   ├── services/         # API Service (api.ts)
│   ├── types/            # TypeScript Interfaces
│   └── utils/            # Utilities (Test helpers)
└── app.json              # Expo Configuration
```

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run the App**:
    ```bash
    npx expo start
    ```

3.  **Test on Device**:
    *   Download **Expo Go** on your iPhone or Android.
    *   Scan the QR code from the terminal.

## Key Design System

*   **Primary Color**: Base Blue (`#0052FF`)
*   **Background**: Dark (`#0A0B0D`)
*   **Text**: White (`#FFFFFF`) / Secondary (`#B4B6C1`)
