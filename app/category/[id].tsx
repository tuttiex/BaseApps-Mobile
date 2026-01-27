import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '@/src/services/api';
import { Dapp, Category } from '@/src/types';
import { DappList } from '@/src/components/DappList';
import { colors, spacing, typography } from '@/src/constants/theme';
import { useFavorites } from '@/src/context/FavoritesContext';

export default function CategoryScreen() {
    const { id } = useLocalSearchParams<{ id: string }>(); // Using 'id' as slug or category name
    const router = useRouter();
    const [dapps, setDapps] = useState<Dapp[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchCategoryData = async () => {
            // In our app structure, d.category is a name string (e.g. "DeFi").
            // The param might be a slug or the name itself.
            // Let's assume we pass the category name for simplicity or we decode it.
            // If we passed 'DeFi', id is 'DeFi'.
            const catName = decodeURIComponent(id || '');
            setCategoryName(catName);

            if (!catName) return;

            try {
                setLoading(true);
                const data = await api.getDappsByCategory(catName);
                setDapps(data);
            } catch (error) {
                console.error('Error fetching category:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [id]);

    const handleDappPress = (dapp: Dapp) => {
        router.push({
            pathname: '/dapp/[id]',
            params: { id: dapp.id }
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            {/* Header already handled by stack usually, but we can add title if hidden */}
            {/* We rely on _layout Stack options, but we can't set them dynamically easily without Stack.Screen */}
            <View style={styles.header}>
                <Text style={styles.title}>{categoryName}</Text>
                <Text style={styles.subtitle}>{dapps.length} dApps</Text>
            </View>

            <DappList
                dapps={dapps}
                loading={loading}
                onPressDapp={handleDappPress}
            />
        </SafeAreaView>
    );
}

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
        fontSize: 24,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.caption,
        fontSize: 14,
    }
});
