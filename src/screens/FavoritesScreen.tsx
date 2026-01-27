import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
// We'll import persistence logic in Phase 7
// import { useFavorites } from '../context/FavoritesContext';
import { Dapp } from '../types';
import { DappList } from '../components/DappList';
import { colors, spacing, typography } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const FavoritesScreen = () => {
    const router = useRouter();
    const [favorites, setFavorites] = useState<Dapp[]>([]); // Placeholder for real favorites
    const [loading, setLoading] = useState(false);

    // Placeholder logic for Phase 6
    useEffect(() => {
        // In Phase 7 this will load from AsyncStorage/Context
        setFavorites([]);
    }, []);

    const handleDappPress = (dapp: Dapp) => {
        router.push({
            pathname: '/dapp/[id]',
            params: { id: dapp.id }
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Favorites</Text>
            </View>

            {favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={64} color={colors.textSecondary} style={{ opacity: 0.5, marginBottom: 16 }} />
                    <Text style={styles.emptyTitle}>No Favorites Yet</Text>
                    <Text style={styles.emptyText}>
                        Tap the heart icon on any dApp to save it here for quick access.
                    </Text>
                </View>
            ) : (
                <DappList
                    dapps={favorites}
                    loading={loading}
                    onPressDapp={handleDappPress}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        ...typography.h1,
        marginBottom: spacing.xs,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    emptyTitle: {
        ...typography.h2,
        marginBottom: spacing.sm,
    },
    emptyText: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
});
