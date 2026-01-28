import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router';
import { colors, spacing, typography } from '@/src/constants/theme';
import { Text } from 'react-native-paper';

export default function PrivacyScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Privacy Policy' }} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Privacy Policy</Text>
                <Text style={styles.date}>Last updated: January 28, 2026</Text>

                <View style={styles.section}>
                    <Text style={styles.heading}>1. Introduction</Text>
                    <Text style={styles.text}>
                        Welcome to BaseApps. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our application
                        and tell you about your privacy rights and how the law protects you.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>2. Data We Collect</Text>
                    <Text style={styles.text}>
                        We do not collect any personal data such as names, emails, or phone numbers.
                        When you connect your wallet, we only see your public wallet address to enable Web3 features.
                        This data is stored locally on your device and is not transmitted to any centralized server for tracking purposes.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>3. Third-Party Services</Text>
                    <Text style={styles.text}>
                        Our app uses third-party services such as Reown (WalletConnect) and Alchemy/Infura (RPC Providers) to facilitate blockchain interactions.
                        These services may collect IP addresses and other metadata as per their own privacy policies.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>4. Contact Us</Text>
                    <Text style={styles.text}>
                        If you have any questions about this privacy policy, please contact us at support@baseapps.com.
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: spacing.md,
    },
    title: {
        ...typography.h1,
        marginBottom: spacing.xs,
    },
    date: {
        ...typography.caption,
        color: colors.textSecondary,
        marginBottom: spacing.xl,
    },
    section: {
        marginBottom: spacing.lg,
    },
    heading: {
        ...typography.h2,
        fontSize: 18,
        marginBottom: spacing.sm,
        color: colors.primary,
    },
    text: {
        ...typography.body,
        color: colors.text,
        lineHeight: 22,
    },
});
