import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppKitButton } from '@/src/config/web3';
import { colors, spacing, typography, borderRadius } from '@/src/constants/theme';
import { Text, Surface } from 'react-native-paper';
import { useAccount, useBalance } from 'wagmi';

export default function SettingsScreen() {
    const { address, isConnected } = useAccount();
    const { data: balance } = useBalance({
        address: address,
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Wallet Connection</Text>
                <Surface style={styles.accountCard} elevation={1}>
                    <Text style={styles.text}>
                        {isConnected
                            ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`
                            : 'Connect your wallet to access Web3 features.'}
                    </Text>
                    {isConnected && balance && (
                        <Text style={styles.balanceText}>
                            Balance: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                        </Text>
                    )}
                    <View style={styles.buttonContainer}>
                        <AppKitButton />
                    </View>
                </Surface>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About BaseApps</Text>
                <Text style={styles.text}>
                    BaseApps is a directory of the best dApps in the Base ecosystem.
                    Discover, explore, and connect with your favorite projects.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.md,
    },
    header: {
        marginBottom: spacing.xl,
    },
    title: {
        ...typography.h1,
        fontSize: 28,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...typography.h2,
        fontSize: 18,
        marginBottom: spacing.md,
        color: colors.primary,
    },
    accountCard: {
        padding: spacing.md,
        backgroundColor: colors.card,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    text: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    balanceText: {
        ...typography.body,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.md,
    },
    buttonContainer: {
        alignItems: 'center',
    },
});
