/**
 * BaseApps Design System
 * Matches the dark mode branding of the web platform
 */

export const colors = {
    primary: '#0052FF', // Base Blue
    background: '#0A0B0D', // Main dark background
    backgroundSecondary: '#131418', // Slightly lighter background for cards/nav
    card: '#1A1B1F', // Card background
    text: '#FFFFFF', // Primary text
    textSecondary: '#B4B6C1', // Secondary text
    border: '#2B2D31', // Subtle border color
    success: '#00D68F',
    error: '#FF4242',
    warning: '#FFBF00',
    tint: '#0052FF',
    tabIconDefault: '#B4B6C1',
    tabIconSelected: '#0052FF',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const typography = {
    h1: {
        fontSize: 32,
        fontWeight: 'bold' as 'bold',
        color: colors.text,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold' as 'bold',
        color: colors.text,
    },
    h3: {
        fontSize: 20,
        fontWeight: '600' as '600',
        color: colors.text,
    },
    body: {
        fontSize: 16,
        color: colors.text,
    },
    bodySmall: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    caption: {
        fontSize: 12,
        color: colors.textSecondary,
    },
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
    round: 9999,
};

export const shadows = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 4,
    }
};

export default {
    light: {
        text: colors.text,
        background: colors.background,
        tint: colors.tint,
        tabIconDefault: colors.tabIconDefault,
        tabIconSelected: colors.tabIconSelected,
    },
    dark: {
        text: colors.text,
        background: colors.background,
        tint: colors.tint,
        tabIconDefault: colors.tabIconDefault,
        tabIconSelected: colors.tabIconSelected,
    },
};
